import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerConnectionService {
  private readonly email = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'fayzillofn30@gmail.com',
      pass: 'hwhphlkacfqynuve',
    },
  });

  async sendRegisterVerify(email: string, url: string) {
    const result = await this.email.sendMail({
      to: email,
      from: "Auth Service : '<fayzillofn30@gmail.com>'",
      subject: 'Hello your verify button 😁😁😁💹💹💹"',
      html: `
              <h1> Register verifiy url  </h1> <a href="${url}">Sign •  👀</a>
      `,
    });
    return result;
  }

  async sendResedPasswordVerify(email: string,code : string) {
    const result = await this.email.sendMail({
      to: email,
      from: "Auth Service : '<fayzillofn30@gmail.com>'",
      subject: 'Auth Service : "<fayzillofn30@gmail.com>"',
      text: 'Salom : code > 123456',
      html: `
              <h1> Reset password verifiy code 🧐🧐🧐 </h1>
              <p> Code : ${code} </p>
      `,
    });
    return result;
  }
}
