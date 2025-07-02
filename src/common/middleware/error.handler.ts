import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from "jsonwebtoken";

@Catch()
export class ErrorHandler implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        // Sequelize + Postgres error handling
        if (
            exception &&
            typeof exception === "object" &&
            "name" in exception &&
            (exception as any).name === "SequelizeDatabaseError"
        ) {
            const err: any = exception;
            let message = "Database error";
            if (err.parent && err.parent.code === "23505") {
                message = "Duplicate entry";
            } else if (err.parent && err.parent.code === "23503") {
                message = "Foreign key violation";
            }
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message,
                error: err.parent?.detail || err.message,
            });
        }

        // JWT error handling
        if (
            exception instanceof JsonWebTokenError ||
            exception instanceof TokenExpiredError ||
            exception instanceof NotBeforeError
        ) {
            let message = "Invalid token";
            if (exception instanceof TokenExpiredError) {
                message = "Token expired";
            } else if (exception instanceof NotBeforeError) {
                message = "Token not active";
            }
            return response.status(HttpStatus.UNAUTHORIZED).json({
                statusCode: HttpStatus.UNAUTHORIZED,
                message,
                error: exception.message,
            });
        }

        // NestJS HTTP exceptions
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            return response.status(status).json(
                typeof exceptionResponse === "string"
                    ? { statusCode: status, message: exceptionResponse }
                    : exceptionResponse
            );
        }

        // ValidationError (class-validator)
        if (exception && typeof exception === 'object' && 'message' in exception && Array.isArray((exception as any).message)) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Validation error',
                errors: (exception as any).message,
            });
        }

        // TypeError, ReferenceError, SyntaxError, RangeError
        if (exception instanceof TypeError || exception instanceof ReferenceError || exception instanceof SyntaxError || exception instanceof RangeError) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: exception.name,
                error: exception.message,
            });
        }

        // AxiosError (external HTTP requests)
        if (exception && typeof exception === 'object' && 'isAxiosError' in exception) {
            const err: any = exception;
            return response.status(err.response?.status || 500).json({
                statusCode: err.response?.status || 500,
                message: err.message,
                error: err.response?.data || err.toString(),
            });
        }

        // Fallback for other errors
        console.error('An error occurred:', exception);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
            error: (exception as any)?.message || exception,
        });
    }
}
