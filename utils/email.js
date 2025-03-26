import nodemailer from 'nodemailer'
import pug from 'pug'
import { htmlToText } from 'html-to-text';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = 'thefurnitureshop.io@gmail.com'
    }
    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    async send(template, subject) {
        const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        })

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,


        }

        await this.newTransport().sendMail(mailOptions)


    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to The Furniture shop Family')
    }
}


export default Email