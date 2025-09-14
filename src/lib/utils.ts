import nodemailer from "nodemailer";

// Type dependencies
import type { MailConfig, SiteConfig } from "./types";
import type { MailOptions } from "nodemailer/lib/sendmail-transport";

/**
 * Send the mail using SMTP
 * @param content HTML string defining the content of the email
 * @param mailConfig Mail config
 */
export async function sendMail(mailConfig: MailConfig, content: string) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "25", 10);
    const username = process.env.SMTP_USERNAME;
    const password = process.env.SMTP_PASSWORD;

    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false,
        auth: {
            user: username,
            pass: password,
        }
    });

    const transporterOptions: MailOptions = {
        to: mailConfig.to,
        from: mailConfig.from,
        subject: mailConfig.subject,
        html: content,
    };

    if (mailConfig.hasOwnProperty("attachments")) {
        // This means that the user has also uploaded attachments, because the mailConfig has thus been modified

        transporterOptions.attachments = mailConfig.attachments?.map(attachment => {
            return {
                filename: attachment.filename,
                content: attachment.content,
                contentType: attachment.contentType,
            }
        });
    }

    return new Promise<void>((resolve, reject) => {
        transporter.sendMail(transporterOptions, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}

/**
 * Generate mail configuration object from the given site configuration
 * @param config Site configuration
 * @returns Mail configuration object
 */
export function getMailConfig(config: SiteConfig): MailConfig {
    const toEmail = config.contact.notification_email || config.contact.email;
    const fromEmail = process.env.SMTP_FROM_EMAIL

    if (!toEmail) throw new Error("To email not defined in the config");
    if (!fromEmail) throw new Error("From email not defined in the environment")

    return {
        to: toEmail,
        from: fromEmail,
        subject: "New Report Received on Cyber Helpdesk",
    }
}