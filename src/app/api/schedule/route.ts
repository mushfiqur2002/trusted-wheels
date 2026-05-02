import nodemailer, { Transporter } from "nodemailer"
export async function POST(req: Request) {
    const data = await req.json()
    const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background:#f9f9f9;">
    
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
      
      <h2 style="color:#212121; margin-bottom:10px;">
        🚗 Test Drive Booking
      </h2>

      <p style="color:#555;">You received a new booking request.</p>

      <hr style="margin:20px 0;" />

      <table style="width:100%; font-size:14px; color:#333;">
        <tr>
          <td><strong>Name:</strong></td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${data.email}</td>
        </tr>
        <tr>
          <td><strong>Phone:</strong></td>
          <td>${data.phone}</td>
        </tr>
        <tr>
          <td><strong>Booking Type:</strong></td>
          <td>${data.type}</td>
        </tr>
        <tr>
          <td><strong>Date & Time:</strong></td>
          <td>${new Date(data.date).toLocaleString()}</td>
        </tr>
      </table>

      <hr style="margin:20px 0;" />

      <p style="margin-top:30px; font-size:12px; color:#888;">
        Trusted Wheels • Test Drive Booking System
      </p>

    </div>
  </div>
`;

    const transporter: Transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER,
            pass: process.env.NEXT_PUBLIC_APP_PASS,
        },
    })

    try {
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL_USER,
            to: process.env.NEXT_PUBLIC_EMAIL_USER,
            subject: "Schedule A Test Drive Form Submission",
            html
        })

        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false }, { status: 500 })
    }
}