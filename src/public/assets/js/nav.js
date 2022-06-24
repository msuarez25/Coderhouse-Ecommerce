function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}
const userIsLogin = getCookie('logged');
let btnLog = `<a class="nav-link btn btn-primary btn-login text-white" href="/login">Login</a>`;
let addProductosBtn = '';

if (userIsLogin) {
  btnLog = `<a class="nav-link btn btn-danger btn-logout" href="/logout">Logout</a>`;
  addProductosBtn = `<li><a class="dropdown-item" href="/agregar">Agregar Productos</a></li>`;
}

document.write(`
<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">eCommerce</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Inicio</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Productos
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="/productos">Ver Productos</a>
                </li>
                ${addProductosBtn}
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/carrito">Carrito</a>
            </li>
            <li class="nav-item ms-auto">
                ${btnLog}
            </li>
          </ul>
        </div>
      </div>
    </nav>
`);
