import nodemailer, { Transporter } from "nodemailer"
export async function POST(req: Request) {
    const data = await req.json()
    const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color:#212121;">📩 New Form Submission</h2>

    <div style="margin-top:20px; margin-bottom:5px;">
        <h3>🪪 Personal Information</h3>
        <p><strong>First Name:</strong> ${data.firstName}</p>
        <p><strong>Last Name:</strong> ${data.lastName}</p>
        <p style="color:#0f52ba"><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Marital Status:</strong> ${data.maritalStatus}</p>
        <p><strong>Date of Birth:</strong> ${data.dob}</p>
    </div>

    <hr style="margin:20px 0;" />

    <div style="margin-top:20px; margin-bottom:5px;">
        <h3>📍 Address</h3>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>Province:</strong> ${data.province}</p>
        <p><strong>Post Code:</strong> ${data.postcode}</p>
    </div>
  </div>
`

    const transporter: Transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // app password
        },
    })

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Form Submission",
            html
        })

        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false }, { status: 500 })
    }
}