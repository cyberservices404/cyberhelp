import { NextRequest, NextResponse } from 'next/server';

// Internal dependencies
import { getSiteConfig } from '@/lib/config';
import { getMailConfig, sendMail } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const content = `<h2>New Contact Form Submission</h2>
        
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        
        <h3>Message:</h3>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><small>This message was submitted through the CyberHelp Desk contact form at ${new Date().toLocaleString()}.</small></p>
      `;

    // Configure settings for sending mail
    const siteConfig = getSiteConfig()
    const mailConfig = getMailConfig(siteConfig);

    await sendMail(mailConfig, content);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully. We will get back to you within 24 hours.'
    });
  } catch (error) {
    console.error('Error sending contact form:', error);

    // Provide more specific error messages based on Mailgun errors
    let errorMessage = 'Failed to send message';
    if (error instanceof Error) {
      if (error.message.includes('Unauthorized') || error.message.includes('API key')) {
        errorMessage = 'Email service authentication failed.';
      } else if (error.message.includes('domain')) {
        errorMessage = 'Email service configuration issue. Please contact us directly.';
      }
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
