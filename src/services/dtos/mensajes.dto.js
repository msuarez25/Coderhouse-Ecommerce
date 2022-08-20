export default class mensajesDto {
  constructor({ _id, email, tipo, mensaje, timestamp }) {
    this._id = _id;
    this.email = email;
    this.tipo = tipo || 'usuario';
    this.mensaje = mensaje || '';
    this.timestamp = timestamp;
  }
}

export function asMensajesDto(mensajes) {
  if (Array.isArray(mensajes)) return mensajes.map((p) => new mensajesDto(p));
  else return new mensajesDto(mensajes);
}
