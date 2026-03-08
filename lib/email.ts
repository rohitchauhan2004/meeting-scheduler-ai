import nodemailer from "nodemailer"

export async function sendEmail(email:string, link:string, date:string, time:string){

  // Create test account automatically
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })

  const info = await transporter.sendMail({
    from: '"Meeting Scheduler" <scheduler@test.com>',
    to: email,
    subject: "Meeting confirmed",
    html: `
      <h2>Your meeting is confirmed</h2>
      <p>Date: ${date}</p>
      <p>Time: ${time}</p>
      <p>Meeting link:</p>
      <a href="${link}">${link}</a>
    `
  })

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info))
}