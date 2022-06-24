const url = window.location.href;
const lastSegment = url.split('/').pop();
const title = lastSegment.toUpperCase();
document.write(`
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>eCommerce - ${title}</title>
<link rel="stylesheet" href="../assets/css/style.css" />
`);
