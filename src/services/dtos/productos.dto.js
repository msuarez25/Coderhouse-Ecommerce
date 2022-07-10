export default class productoDto {
  constructor({ _id, nombre, code, precio, foto, timestamp, stock, amount }) {
    this._id = _id;
    this.nombre = nombre;
    this.code = code || 0;
    this.precio = precio || 0;
    this.foto = foto || '';
    this.timestamp = timestamp;
    this.stock = stock || 0;
    this.amount = amount || 0;
  }
}

export function asProductosDto(productos) {
  if (Array.isArray(productos)) return productos.map((p) => new productoDto(p));
  else return new productoDto(productos);
}
