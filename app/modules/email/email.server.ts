import { Resend } from "resend";

export type SendEmailOptions = {
	to: string | string[];
	subject: string;
	html: string;
	text?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(options: SendEmailOptions) {
	console.log("Sending email");
	const { error } = await resend.emails.send({
		from: "<onboarding@resend.dev>",
		to: options.to,
		subject: options.subject,
		html: options.html,
	});

	if (error) {
		console.error("Unable to send email: ", error);
	}
}

type AuthEmailOptions = {
	email: string;
	code: string;
	magicLink?: string | null;
};

export const sendAuthEmail = async ({
	email,
	code,
	magicLink,
}: AuthEmailOptions) => {
	const subject = "Your verification code for Remix Auth TOTP";
	const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      <body style="max-width: 50%; margin: 0 auto; text-align: center;">
        <h1>Code: ${code}</h1>
        ${
					magicLink &&
					`<p style="font-size: 16px;">
            Alternatively, you can click the Magic Link URL.
            <br />
            <a href="${magicLink}">${magicLink}</a>
          </p>`
				}
      </body>
    </html>
  `;

	await sendEmail({
		to: email,
		subject,
		html,
	});
};
