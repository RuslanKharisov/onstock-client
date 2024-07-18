import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.RESEND_CONFIRM_URL}?token=${token}`

  await resend.emails.send({
    from: "Промышленный склад OnStock <onboarding@resend.dev>",
    to: email,
    subject: "Подтвердите вашу почту",
    html: `<p> Click <a href="${confirmLink}"> here </a> to confirm </p>`,
    // react: EmailTemplate({ firstName: "John" }),
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${process.env.RESEND_RESET_PASS_LINK}?token=${token}`

  await resend.emails.send({
    from: "Промышленный склад OnStock <onboarding@resend.dev>",
    to: email,
    subject: "Сброс пароля",
    html: `<p> Click <a href="${resetPasswordLink}"> here </a> to reset password </p>`,
    // react: EmailTemplate({ firstName: "John" }),
  })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Промышленный склад. Проверочный код. OnStock <onboarding@resend.dev>",
    to: email,
    subject: "2FA Code",
    html: `<p> Your 2FA code: ${token} </p>`,
  })
}
