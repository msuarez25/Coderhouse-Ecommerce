export default class carDto {
  constructor({ _id, user, productos, timestamp }) {
    this._id = _id;
    this.user = user;
    this.productos = productos;
    this.timestamp = timestamp;
  }
}

export function asCarsDto(cars) {
  if (Array.isArray(cars)) return cars.map((p) => new carDto(p));
  else return new carDto(cars);
}
