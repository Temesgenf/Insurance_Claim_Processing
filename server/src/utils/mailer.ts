import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';

interface SendVerificationEmailParams {
  email: string;
  name: string;
  verificationCode: string;
}

interface SendPasswordResetEmailParams {
  email: string;
  name: string;
  resetLink: string;
}
interface SubscribeToNewsLetterParams {
  email: string;
}
export const sendVerificationEmail = async ({
  email,
  name,
  verificationCode,
}: SendVerificationEmailParams): Promise<void> => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error('Brevo API key is missing in environment variables');
  }

  const brevoApi = new TransactionalEmailsApi();
  brevoApi.setApiKey(0, process.env.BREVO_API_KEY);

  const sendSmtpEmail: SendSmtpEmail = {
    sender: {
      email: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      name: 'ClaimPro',
    },
    to: [{ email, name }],
    subject: 'Verify Your ClaimPro Email Address',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #f7fafc; 
            margin: 0; 
            padding: 0; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); 
          }
          .header { 
            background: linear-gradient(135deg, #2563eb, #1e40af); 
            padding: 30px; 
            text-align: center; 
          }
          .logo { 
            color: white; 
            font-size: 24px; 
            font-weight: bold; 
          }
          .content { 
            padding: 30px; 
            text-align: center; 
          }
          .code-box {
            display: inline-block;
            background: #f1f5f9;
            color: #1e293b;
            font-size: 32px;
            letter-spacing: 8px;
            padding: 16px 32px;
            border-radius: 8px;
            margin: 24px 0;
            font-weight: bold;
            border: 1px solid #2563eb;
          }
          .footer {
            background: #f1f5f9;
            color: #64748b;
            padding: 16px 30px;
            text-align: center;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="logo">ClaimPro</span>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Hi ${name},</p>
            <p>Thank you for registering with ClaimPro! Please use the following verification code to verify your email address:</p>
            <div class="code-box">${verificationCode}</div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you did not create an account, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ClaimPro. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await brevoApi.sendTransacEmail(sendSmtpEmail);
};

export const sendPasswordResetEmail = async ({
  email,
  name,
  resetLink,
}: SendPasswordResetEmailParams): Promise<void> => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error('Brevo API key is missing in environment variables');
  }
console.log("email in sendPasswordResetEmail", email)
  const brevoApi = new TransactionalEmailsApi();
  brevoApi.setApiKey(0, process.env.BREVO_API_KEY);

  const sendSmtpEmail: SendSmtpEmail = {
    sender: {
      email: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      name: 'ClaimPro',
    },
    to: [{ email, name }],
    subject: 'Reset Your ClaimPro Password',
    htmlContent: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          background-color: #f7fafc; 
          margin: 0; 
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 8px; 
          overflow: hidden; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); 
        }
        .header { 
          background: linear-gradient(135deg, #2563eb, #1e40af); 
          padding: 30px; 
          text-align: center; 
        }
        .logo { 
          color: white; 
          font-size: 24px; 
          font-weight: bold; 
        }
        .content { 
          padding: 30px; 
          color: #4a5568; 
          line-height: 1.6; 
        }
        .reset-btn {
          display: inline-block;
          padding: 14px 32px;
          background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          border-radius: 6px;
          text-decoration: none;
          margin: 24px 0;
          box-shadow: 0 2px 8px rgba(37,99,235,0.12);
          transition: background 0.2s;
        }
        .reset-btn:hover {
          background: linear-gradient(90deg, #1e40af 0%, #2563eb 100%);
        }
        .footer { 
          padding: 20px; 
          text-align: center; 
          font-size: 12px; 
          color: #718096; 
          background: #f7fafc; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">ClaimPro</div>
        </div>
        <div class="content">
          <h2 style="color: #2d3748;">Hello${name ? ", " + name : ""}!</h2>
          <p>We received a request to reset your ClaimPro account password.</p>
          <p>Click the button below to set a new password. This link will expire in <strong>1 hour</strong>.</p>
          <div style="text-align: center;">
            <a href="${resetLink}" class="reset-btn">Reset Password</a>
          </div>
          <p>If you did not request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} ClaimPro Insurance. All rights reserved.</p>
          <p>
            <a href="https://claimpro.com/privacy" style="color: #718096; text-decoration: none;">Privacy Policy</a> | 
            <a href="https://claimpro.com/terms" style="color: #718096; text-decoration: none;">Terms of Service</a>
          </p>
        </div>
      </div>
    </body>
    </html>
    `,
    textContent: `Hello${name ? ", " + name : ""},\n\nWe received a request to reset your ClaimPro account password.\n\nClick the link below to set a new password (valid for 1 hour):\n${resetLink}\n\nIf you did not request this, you can safely ignore this email.\n\n© ${new Date().getFullYear()} ClaimPro Insurance. All rights reserved.`
  };

  try {
    await brevoApi.sendTransacEmail(sendSmtpEmail);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email. Please try again later.');
  }
};
export const subscribeToNewsLetter = async ({
  email
}:SubscribeToNewsLetterParams): Promise<void> => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error('Brevo API key is missing in environment variables');
  }

  const brevoApi = new TransactionalEmailsApi();
  brevoApi.setApiKey(0, process.env.BREVO_API_KEY);
  const sendSmtpEmail: SendSmtpEmail = {
    sender: {
      email: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      name: 'ClaimPro',
    },
    to: [{ email }],
    subject: 'Welcome to ClaimPro Newsletter! 🎉',
    htmlContent: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ClaimPro Newsletter</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #FF8C24 0%, #FF6B24 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 30px;
          }
          .welcome-text {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 20px;
          }
          .email-highlight {
            color: #FF8C24;
            font-weight: 600;
          }
          .benefits {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
          }
          .benefits h3 {
            color: #1f2937;
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 20px;
          }
          .benefit-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            color: #4b5563;
          }
          .benefit-icon {
            color: #FF8C24;
            margin-right: 10px;
            font-weight: bold;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #FF8C24 0%, #FF6B24 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s ease;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            background-color: #1f2937;
            color: #9ca3af;
            padding: 30px;
            text-align: center;
            font-size: 14px;
          }
          .footer a {
            color: #FF8C24;
            text-decoration: none;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #9ca3af;
            text-decoration: none;
            font-size: 18px;
          }
          @media only screen and (max-width: 600px) {
            .container {
              margin: 10px;
              border-radius: 8px;
            }
            .header, .content, .footer {
              padding: 25px 20px;
            }
            .header h1 {
              font-size: 24px;
            }
            .benefits {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to ClaimPro!</h1>
            <p>Thank you for joining our newsletter community</p>
          </div>
          
          <div class="content">
            <p class="welcome-text">
              Hi <span class="email-highlight">${email}</span>,
            </p>
            
            <p>
              Welcome aboard! We're thrilled to have you as part of the ClaimPro family. You've just taken the first step towards staying informed about the latest developments in claims management and industry insights.
            </p>
            
            <div class="benefits">
              <h3>What you can expect:</h3>
              <div class="benefit-item">
                <span class="benefit-icon">📧</span>
                <span>Weekly industry insights and best practices</span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">🚀</span>
                <span>Exclusive product updates and new features</span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">💡</span>
                <span>Expert tips for optimizing your claims process</span>
              </div>
              <div class="benefit-item">
                <span class="benefit-icon">🎁</span>
                <span>Special offers and early access to resources</span>
              </div>
            </div>
            
            <p>
              We respect your inbox and promise to deliver only valuable, relevant content. You can update your preferences or unsubscribe at any time.
            </p>
            
            <div style="text-align: center;">
              <a href="#" class="cta-button">Explore ClaimPro</a>
            </div>
            
            <p style="margin-top: 30px; color: #6b7280;">
              Have questions? We're here to help! Simply reply to this email and our team will get back to you shortly.
            </p>
          </div>
          
          <div class="footer">
            <div class="social-links">
              <a href="#">📘 Facebook</a>
              <a href="#">🐦 Twitter</a>
              <a href="#">💼 LinkedIn</a>
            </div>
            
            <p>
              © 2025 ClaimPro. All rights reserved.<br>
              <a href="#">Privacy Policy</a> | <a href="#">Unsubscribe</a> | <a href="#">Contact Us</a>
            </p>
            
            <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
              This email was sent to ${email}. If you no longer wish to receive these emails, you can unsubscribe at any time.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await brevoApi.sendTransacEmail(sendSmtpEmail);
}


