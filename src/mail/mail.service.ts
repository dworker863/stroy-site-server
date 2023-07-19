import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  async create(createMailDto: CreateMailDto) {
    try {
      const { cart, cartSum, email } = createMailDto;

      const mailBody = `
    <h2>Новое сообщение от формы обратной связи</h2>
    ${cart.map(({ service, sum }) => {
      `<p><strong>Услуга:</strong> ${service}</p><br/><p><strong>Стоимость:</strong> ${sum}</p>`;
    })}
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Общая стоимость:</strong> ${cartSum}</p>
  `;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'dworker863@gmail.com',
          password: 'eahk fivk wpmz uswj',
        },
      } as SMTPTransport.Options);

      const mailOptions = {
        from: email,
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

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
