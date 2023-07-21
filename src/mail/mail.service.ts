import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  async create(createMailDto: CreateMailDto) {
    try {
      const { cart, cartSum, phoneNumber } = createMailDto;

      const services = cart.map(
        ({ service, sum }) =>
          `<p><strong>Услуга:</strong> ${service}</p><p><strong>Стоимость:</strong> ${sum}</p><br/>`,
      );

      const mailBody = `
      <h2>Новое сообщение от формы обратной связи</h2>
      <p><strong>Телефон:</strong> ${phoneNumber}</p>
      ${services.join('')}
      <p><strong>Общая стоимость:</strong> ${cartSum}</p>
      `;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dworker863@gmail.com',
          pass: 'mdhlvxxkhrwygvqt',
        },
      } as SMTPTransport.Options);

      const mailOptions = {
        from: 'tjun863@gmail.com',
        to: 'dworker863@gmail.com',
        subject: 'Новая заявка',
        html: mailBody,
      };

      await transporter.sendMail(mailOptions);
    } catch (e) {
      throw new HttpException(
        'Ошибка при отправке письма',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
