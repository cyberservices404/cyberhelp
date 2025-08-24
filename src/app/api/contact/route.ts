import { NextRequest, NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { getSiteConfig } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const config = getSiteConfig();
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.MAILERSEND_API_TOKEN) {
      console.error('MAILERSEND_API_TOKEN is not set');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Validate from email
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
    if (!fromEmail || fromEmail === '' || fromEmail === 'noreply@yourdomain.com') {
      console.error('MAILERSEND_FROM_EMAIL is not set or using placeholder');
      return NextResponse.json(
        { success: false, message: 'Email service not properly configured' },
        { status: 500 }
      );
    }

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_TOKEN,
    });

    const sentFrom = new Sender(
      fromEmail,
      process.env.MAILERSEND_FROM_NAME || 'CyberHelp Desk'
    );

    // For trial accounts, only send to admin email
    const adminEmail = process.env.ADMIN_EMAIL || config.contact.notification_email || config.contact.email;
    const recipients = [new Recipient(adminEmail, 'Admin')];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Contact Form Submission - ${formData.subject}`)
      .setHtml(`
        <h2>New Contact Form Submission</h2>
        
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>This message was submitted through the CyberHelp Desk contact form at ${new Date().toLocaleString()}.</small></p>
      `)
      .setText(`
        New Contact Form Submission
        
        Contact Details:
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone || 'Not provided'}
        Subject: ${formData.subject}
        
        Message:
        ${formData.message}
        
        This message was submitted through the CyberHelp Desk contact form at ${new Date().toLocaleString()}.
      `);

    await mailerSend.email.send(emailParams);

    // Note: For trial accounts, we can't send confirmation emails to users
    // Only send notification to admin
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully. We will get back to you within 24 hours.' 
    });
  } catch (error) {
    console.error('Error sending contact form:', error);
    
    // Provide more specific error messages based on MailerSend errors
    let errorMessage = 'Failed to send message';
    if (error instanceof Error) {
      if (error.message.includes('Trial accounts can only send emails to the administrator')) {
        errorMessage = 'Message received. Due to trial account limitations, we will respond directly to your email.';
      } else if (error.message.includes('domain must be verified')) {
        errorMessage = 'Email service configuration issue. Please contact us directly.';
      }
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
