const logger = (req, res, next) => {
  console.log(req.headers.myauthorization);
  if (
    req.headers.myauthorization !== '' &&
    req.headers.myauthorization !== null &&
    req.headers.myauthorization !== undefined
  ) {
    next();
  } else {
    res.status(401).json({
      error: 401,
      descripcion: 'Necesitas permisos de administrador para esta url',
    });
  }
};
export default logger;
