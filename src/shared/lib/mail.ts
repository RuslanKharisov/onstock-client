import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerifificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.RESEND_CONFIRM_URL}?token=${token}`

  await resend.emails.send({
    from: "Промышленный склад OnStock <onboarding@resend.dev>",
    to: email,
    subject: "Hello world",
    html: `<p> Click <a href="${confirmLink}"> here </a> to confirm </p>`,
    // react: EmailTemplate({ firstName: "John" }),
  })
}
