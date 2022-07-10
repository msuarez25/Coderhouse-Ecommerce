export default class orderDto {
  constructor({ _id, user, productos, timestamp }) {
    this._id = _id;
    this.user = user;
    this.productos = productos || [];
    this.timestamp = timestamp || new Date();
  }
}

export function asOrdersDto(orders) {
  if (Array.isArray(orders)) return orders.map((p) => new orderDto(p));
  else return new orderDto(orders);
}
