import { diskStorage } from 'multer';
import { extname } from 'path';
import { Subscription_type } from 'src/core/types/movies.types';
import { v4 as uuidv4 } from 'uuid';

export const storagePoster = diskStorage({
  destination: './uploads/posters',
  filename: (req, file, cb) => {
    const fileName = uuidv4() + extname(file.originalname);
    cb(null, fileName);
  },
});

export const storageFile = diskStorage({
  destination: './uploads/files',
  filename(req, file, callback) {
    const newName = uuidv4() + extname(file.originalname);
    callback(null, newName);
  },
});
export const swaggerOptions = {
  schema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      release_year: { type: 'integer' },
      duration_minutes: { type: 'number' },
      subscription_type: {
        type: 'string',
        enum: [...Object.values(Subscription_type)],
      },
      category_ids: {
        type: 'array',
        items: { type: 'string' },
      },
      poster: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
