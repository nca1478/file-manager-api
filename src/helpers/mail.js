// Dependencies
import nodemailer from "nodemailer";

const forgotPass = (email, token) => {
    const subject = "Recuperar tu contraseña";
    const urlClient = process.env.URL_CLIENT;
    const urlRedirect = `${urlClient}/recover_pass.html?token=${token}`;
    const templateHTML = `
		<h1>Instrucciones para restablecer la contraseña</h1>
        <p>
            Recibimos una solicitud para restablecer la contraseña. Este enlace es válido durante las próximas 24 horas. &nbsp;
            <a href="${urlRedirect}">Recuperar contraseña</a>
        </p>        		
	`;
    return sendMailInfo(email, subject, templateHTML);
};

const passChanged = (email) => {
    const subject = "Contraseña cambiada exitosamente";
    const urlClient = process.env.URL_CLIENT;
    const templateHTML = `
		<h1>Contraseña cambiada exitosamente</h1>
        <p>
            Ahora puedes iniciar sesión en la aplicación. <a href="${urlClient}">Ir a la Aplicación</a>            
        </p>        		
	`;
    return sendMailInfo(email, subject, templateHTML);
};

const sendMailInfo = async (to, subject, templateHTML) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const info = await transporter.sendMail({
        from: `FilesManager App <${process.env.EMAIL_AUTH_USER}>`,
        to,
        subject,
        html: templateHTML,
    });

    return info;
};

module.exports = {
    forgotPass,
    passChanged,
};
