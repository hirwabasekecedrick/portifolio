import { RequestHandler } from "express";
import { z } from "zod";

// Email validation schema
const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Simple email service (in production, use services like SendGrid, Mailgun, etc.)
const sendEmailToOwner = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  // In production, replace this with actual email service
  console.log('📧 New contact form submission:');
  console.log('From:', data.name, `<${data.email}>`);
  console.log('Subject:', data.subject);
  console.log('Message:', data.message);
  console.log('---');
  
  // For now, we'll simulate sending email
  // In production, integrate with:
  // - SendGrid: https://sendgrid.com/
  // - Mailgun: https://www.mailgun.com/
  // - Nodemailer with SMTP: https://nodemailer.com/
  
  return true; // Simulate successful send
};

export const sendContactEmail: RequestHandler = async (req, res) => {
  try {
    const { name, email, subject, message } = emailSchema.parse(req.body);

    // Send email
    const success = await sendEmailToOwner({
      name,
      email,
      subject,
      message,
    });

    if (success) {
      res.json({ 
        success: true,
        message: "Your message has been sent successfully! I'll get back to you soon."
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: "Failed to send email. Please try again later."
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false,
        error: error.errors[0].message 
      });
    }
    
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false,
      error: "Internal server error"
    });
  }
};

// Get contact form configuration
export const getContactConfig: RequestHandler = async (req, res) => {
  res.json({
    ownerEmail: "hirwabasekecedrick@gmail.com",
    ownerName: "Hirwa Baseke Cedrick",
    responseTime: "24 hours",
    availableForWork: true,
  });
};
