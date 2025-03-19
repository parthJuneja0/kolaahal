import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req) {
    const { email, name, otp } = await req.json();

    // Create a transporter object using Gmail's SMTP server
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Intellia Society" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Welcome to the MIET Alumni Network!',
        html: `
           <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <p> Respected ${name}, </p>
    <p> Your OTP ${otp} for the registration of Kolaahal. </p>
 </p>

  

    <p>Warn Regards,<br>
        Team Intellia</p>
    <img src="https://intelliamiet.in/images/miet_logo.png" alt="" style="width: 80px; height: 70px">
</body>

</html>
            `,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, message: 'Error sending email!' });
    }
}
