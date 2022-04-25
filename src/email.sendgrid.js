require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailConformation = (customerName, orderNuro) => {
    return ``;
};

const getmessage = (emailParams) => {
    return {
        to: emailParams.toEmail,
        from: 'jgrisales85281@umanizales.edu.co',
        subject: 'Confirmación compra UM',
        html: sendEmailConformation(
            emailParams.customerName,
            emailParams.orderNuro
        ),
    };
};

async function setOrder(emailParams) {
    try {
        await sgMail.send(getmessage(emailParams));
        return { message: 'Correo enviado' };
    } catch (error) {
        const message = 'No se pudo enviar ek email';
        console.log(error, message);
        if (error.response) console.error(error.response.body);
        return { message };
    }
}

module.exports = {setOrder};
