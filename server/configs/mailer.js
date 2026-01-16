import nodemailer from "nodemailer";

// Function to send OTP email (LOGIC SAME)
export const sendOtpEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Hospital Event Organizers" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🏥 OTP Verification for Hospital Event Access",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1565c0, #42a5f5); padding: 20px; text-align: center; color: #fff;">
            <h1 style="margin: 0; font-size: 22px;">Hospital Event Organizers</h1>
            <p style="margin: 5px 0 0; font-size: 14px;">Secure Event Verification</p>
          </div>

          <!-- Body -->
          <div style="padding: 25px; text-align: center;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Hello 👋,<br/> 
              Use the OTP below to verify your access for hospital events.  
              This OTP is valid for <b>5 minutes</b>.
            </p>
            
            <div style="margin: 20px auto; display: inline-block; background: #e3f2fd; padding: 15px 30px; border: 2px dashed #1565c0; border-radius: 8px;">
              <span style="font-size: 28px; font-weight: bold; color: #1565c0; letter-spacing: 3px;">
                ${otp}
              </span>
            </div>

            <p style="font-size: 14px; color: #666; margin-top: 25px;">
              If you did not request this verification, please ignore this email
              or contact the hospital administration team.
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f5f7fa; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            © ${new Date().getFullYear()} Hospital Event Organizers • All Rights Reserved
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw error;
  }
};
