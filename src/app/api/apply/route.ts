import nodemailer, { Transporter } from "nodemailer"
export async function POST(req: Request) {
    const data = await req.json()
    const html = `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
    
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:25px;">
      
      <h2 style="color:#212121; margin-bottom:10px;">
        💰 Financing Application
      </h2>
      
      <p style="color:#555; font-size:14px;">
        A new financing request has been submitted.
      </p>

      <hr style="margin:20px 0;" />

      <!-- PERSONAL INFO -->
      <div style="margin-bottom:20px;">
        <h3 style="color:#0f52ba; margin-bottom:10px;">
          🪪 Personal Information
        </h3>

        <table style="width:100%; font-size:14px; color:#333;">
          <tr>
            <td style="padding:5px 0;"><strong>First Name:</strong></td>
            <td>${data.firstName}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>Last Name:</strong></td>
            <td>${data.lastName}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>Email:</strong></td>
            <td>
              <a href="mailto:${data.email}" style="color:#0f52ba; text-decoration:none;">
                ${data.email}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>Phone:</strong></td>
            <td>
              <a href="tel:${data.phone}" style="color:#0f52ba; text-decoration:none;">
                ${data.phone}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>Marital Status:</strong></td>
            <td>${data.maritalStatus}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>Date of Birth:</strong></td>
            <td>${new Date(data.dob).toLocaleDateString()}</td>
          </tr>
        </table>
      </div>

      <hr style="margin:20px 0;" />

      <!-- ADDRESS -->
      <div style="margin-bottom:20px;">
        <h3 style="color:#0f52ba; margin-bottom:10px;">
          📍 Address Details
        </h3>

        <table style="width:100%; font-size:14px; color:#333;">
          <tr>
            <td style="padding:5px 0;"><strong>Address:</strong></td>
            <td>${data.address}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>City:</strong></td>
            <td>${data.city}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>Province:</strong></td>
            <td>${data.province}</td>
          </tr>
          <tr>
            <td style="padding:5px 0;"><strong>Postal Code:</strong></td>
            <td>${data.postcode}</td>
          </tr>
        </table>
      </div>

      <hr style="margin:20px 0;" />

      <!-- FOOTER -->
      <p style="font-size:12px; color:#888; text-align:center;">
        Trusted Wheels • Financing Application System
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
            subject: "Apply Form Submission",
            html
        })

        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false }, { status: 500 })
    }
}