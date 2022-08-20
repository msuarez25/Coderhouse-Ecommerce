import '../../database/config/db.js';
import { MensajesModule } from '../../database/modules/mensajes.modules.js';
import { asMensajesDto } from '../dtos/mensajes.dto.js';

export default class MensajesService {
  constructor() {}

  async getMensajes(email) {
    return asMensajesDto(await MensajesModule.find({ email: email }));
  }

  async addMensajes(data, email) {
    if (data !== '') {
      data.timestamp = Date.now();
      data.email = email;
      data.tipo = 'usuario';
      console.log(data);
      return asMensajesDto(await MensajesModule.create(data));
    }
    return false;
  }
}
