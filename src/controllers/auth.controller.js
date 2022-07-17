import path from 'path';
import sendMailGmail from '../services/mailer.service.js';
import logger from '../utils/loggers.js';

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

export function getSignup(req, res) {
  res.sendFile(path.resolve() + '/src/public/views/signup.html');
}

export function postSignup(req, res) {
  const user = req.user;

  const htmlBody = `
    <h1>Un nuevo usuario se ha registrado</h1>
    <ul>
    <li>Usuario: ${user.userName}</li>
    <li>Nombre: ${user.firstName}</li>
    <li>Apellido: ${user.lastName}</li>
    <li>Email: ${user.email}</li>
    <li>Telefóno: ${user['country-code']} ${user.phone}</li>
    <li>Dirección: ${user.address}</li>
    <li>Edad: ${user.age}</li>
    <li>Fecha de Registro: ${new Date(user.createdAt)}</li>
    </ul>
  `;
  sendMailGmail('Nuevo Registro', htmlBody);

  res.json({
    isLoggedIn: true,
    user: {
      userName: user.firstName,
      userImg: user.foto,
      userId: userId,
    },
  });
}

export function failSignup(req, res) {
  logger.log('error', {
    ruta: req.url,
    metodo: req.method,
    error: 'Error en el registro',
  });
  res.render('signup-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

export function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.json({
      isLoggedIn: true,
      usuario: user.userName,
      nombre: user.firstName,
      apellido: user.lastName,
      email: user.email,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
}
export function postLogin(req, res) {
  const user = req.user;
  const userId = user._id.toString();

  res.json({
    isLoggedIn: true,
    user: {
      userName: user.firstName,
      userImg: user.foto,
      userId: userId,
    },
  });
}

export function failLogin(req, res) {
  logger.log('error', {
    ruta: req.url,
    metodo: req.method,
    error: 'Error en el login',
  });

  res.json({ error: 'login-error' });
}

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

export function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ logout: true });
  });
}
