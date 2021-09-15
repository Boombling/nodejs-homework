const sgMail = require("@sendgrid/mail");
const InternalServerError = require("http-errors");


const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
// const mail = {
//     to: "mindertan@gmail.com",
//     from: "Filys@i.ua",
    //     subject: "registration",
    //     html: "Congratulations, you have successfully registered"
// };

// sgMail.send(mail)
//     .then(() => console.log("Verification email sent"))
//     .catch(error => console.log(error.message));

const sendMail = async (data) => {
    try {
        const mail = { ...data, from: "Filys@i.ua" };
        await sgMail.send(mail);
        return true
    }
    catch (error) {
        throw new InternalServerError(error.massege);
    }
};

module.exports = sendMail;