import nodemailer, { Transporter } from "nodemailer"
export async function POST(req: Request) {
    const data = await req.json()

    const transporter: Transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // app password
        },
    })

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Form Submission",
        text: JSON.stringify(data, null, 2),
    })

    return Response.json({ success: true })
}