import { NextRequest, NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from 'mailersend';
import { getSiteConfig } from '@/lib/config';
import type { ReportFormRequestBody as RequestBody } from '@/lib/types'; 

export async function POST(request: NextRequest) {
  try {
    const config = getSiteConfig();
    const formData = await request.json() as RequestBody;

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.incidentType || !formData.description) {
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
    if (!fromEmail || fromEmail === '') {
      console.error('MAILERSEND_FROM_EMAIL is not set');
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
    const adminEmail = config.contact.notification_email;
    const recipients = [new Recipient(adminEmail, 'Admin')];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`New Cyber Crime Report - ${formData.firstName} ${formData.lastName}`)
      .setHtml(`
        <h2>New Cyber Crime Report Submission</h2>
        
        <h3>Personal Information:</h3>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        
        <h3>Incident Details:</h3>
        <p><strong>Type:</strong> ${formData.incidentType}</p>
        <p><strong>Date:</strong> ${formData.incidentDate}</p>
        <p><strong>Description:</strong></p>
        <p>${formData.description.replace(/\n/g, '<br>')}</p>
        
        <h3>Additional Information:</h3>
        <p><strong>Documents Uploaded:</strong> ${formData.documents?.length || 0} files</p>
        
        <hr>
        <p><small>This report was submitted through the CyberHelp Desk website at ${new Date().toLocaleString()}.</small></p>
      `)
      .setText(`
        New Cyber Crime Report Submission
        
        Personal Information:
        Name: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        
        Incident Details:
        Type: ${formData.incidentType}
        Date: ${formData.incidentDate}
        Description: ${formData.description}
        
        Additional Information:
        Documents Uploaded: ${formData.documents?.length || 0} files
        
        This report was submitted through the CyberHelp Desk website at ${new Date().toLocaleString()}.
      `);

    if (formData.documents !== null)
      emailParams.setAttachments(formData.documents.map(record => new Attachment(record.content, record.filename)))

    await mailerSend.email.send(emailParams);

    // Note: For trial accounts, we can't send confirmation emails to users
    // Only send notification to admin

    return NextResponse.json({ 
      success: true, 
      message: 'Report submitted successfully. We will review it and contact you within 24-48 hours.' 
    });
  } catch (error) {
    console.error('Error submitting report:', error);
    
    // Provide more specific error messages based on MailerSend errors
    let errorMessage = 'Failed to submit report';
    if (error instanceof Error) {
      if (error.message.includes('Trial accounts can only send emails to the administrator')) {
        errorMessage = 'Report received. Due to trial account limitations, we will respond directly to your email.';
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
