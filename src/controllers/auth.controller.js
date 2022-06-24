import path from 'path';

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

export function getSignup(req, res) {
  res.sendFile(path.resolve() + '/src/public/views/signup.html');
}

export function postSignup(req, res) {
  const user = req.user;
  console.log(user);
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
  console.log(user);
  res
    .clearCookie('logged')
    .cookie('logged', true, { maxAge: 600000, signed: true })
    .sendFile(path.resolve() + '/src/public/views/index.html');
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
      .sendFile(path.resolve() + '/src/public/views/login.html');
  });
}
