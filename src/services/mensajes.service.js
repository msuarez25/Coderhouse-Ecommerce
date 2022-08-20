import '../database/config/db.js';
import { MensajesModule } from '../database/modules/mensajes.modules.js';

export default class MensajesService {
  constructor() {}

  async getMensajes() {
    return await MensajesModule.find();
  }

  async addMensajes(data) {
    if (data !== '') {
      data.timestamp = Date.now();
      return await MensajesModule.create(data);
    }
    return false;
  }
}
