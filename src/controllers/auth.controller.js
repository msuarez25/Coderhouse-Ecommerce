import path from 'path';
import sendMailGmail from '../services/mailer.service.js';
import { ObjectId } from 'mongodb';
/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

export function getSignup(req, res) {
  res.sendFile(path.resolve() + '/src/public/views/signup.html');
}

export function postSignup(req, res) {
  const user = req.user;
  // console.log(user);
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
  res.sendFile(path.resolve() + '/src/public/views/login.html');
}

export function failSignup(req, res) {
  console.log('Error en el registro');
  res.render('signup-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

export function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log('Usuario logueado!');
    res.render('login-ok', {
      usuario: user.userName,
      nombre: user.firstName,
      apellido: user.lastName,
      email: user.email,
    });
  } else {
    console.log('Usuario no loggeado!');
    res.sendFile(path.resolve() + '/src/public/views/login.html');
  }
}
export function postLogin(req, res) {
  const user = req.user;
  // console.log('ID: ', user._id.toString());
  const userId = user._id.toString();

  res
    .clearCookie('logged')
    .cookie('logged', true, { maxAge: 1800000, signed: true })
    .clearCookie('userId')
    .cookie('userId', userId, { maxAge: 1800000 })
    .clearCookie('userName')
    .cookie('userName', user.firstName, { maxAge: 1800000 })
    .clearCookie('userImg')
    .cookie('userImg', user.foto, { maxAge: 1800000 })
    .sendFile(path.resolve() + '/src/public/views/productos.html');
}

export function failLogin(req, res) {
  console.log('Error en el login');
  res.render('login-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

export function logout(req, res) {
  console.log('logout');
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res
      .clearCookie('logged')
      .clearCookie('userId')
      .clearCookie('userName')
      .clearCookie('userImg')
      .clearCookie('userCarId')
      .sendFile(path.resolve() + '/src/public/views/login.html');
  });
}
