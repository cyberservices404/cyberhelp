import { NextRequest, NextResponse } from 'next/server';

// Internal dependencies
import { getSiteConfig } from '@/lib/config';
import { getMailConfig, sendMail } from '@/lib/utils';

// Type definitions
import type { ReportFormRequestBody as RequestBody } from '@/lib/types';


export async function POST(request: NextRequest) {
  try {
    const formData = await request.json() as RequestBody;

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.incidentType || !formData.description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 500 }
      );
    }

    // Validate environment variables
    if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const content = `
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
    `;

    // Configure settings for sending mail
    const siteConfig = getSiteConfig()
    const mailConfig = getMailConfig(siteConfig);

    // Handle attachments
    if (formData.documents && formData.documents.length > 0) {
      mailConfig.attachments = [];

      formData.documents.forEach(document => {
        mailConfig.attachments?.push({
          filename: document.filename,
          content: Buffer.from(document.content, 'base64'),
          contentType: document.contentType || undefined,
        })
      })
    }

    await sendMail(mailConfig, content);

    return NextResponse.json({
      success: true,
      message: 'Report submitted successfully. We will review it and contact you within 24-48 hours.'
    });
  } catch (error) {
    console.error('Error submitting report:', error);

    let errorMessage = 'Failed to submit report';

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}