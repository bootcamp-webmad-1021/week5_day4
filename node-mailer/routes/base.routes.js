const router = require("express").Router();
// 3. Instrucciones: Allá dónde vayamos a enviar correos requerimos el 
// transporter (nodemailer.config)
const transporter = require("../config/nodemailer.config")



router.get("/", (req, res, next) => {
  res.render("index");
});


//1. Instrucciones: (opcional) Montar un endpoint que reciba de un form
//    los datos para el correo.
router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;

  //4. Instrucciones: con el método sendMail enviamos el correo.
  transporter.sendMail({
    from: '"Ironhacker Mail" <webdev.oct.1021@gmail.com>',
    to: `${email}`,
    subject: `${subject}`,
    text: `${message}`,
    html: `<b>${message}</b>`
  })
    .then(info => res.render('message', { email, subject, message }))
    .catch(error => res.render('message', { errorMessage: "El correo no ha podido ser enviado" }))




});


module.exports = router;
