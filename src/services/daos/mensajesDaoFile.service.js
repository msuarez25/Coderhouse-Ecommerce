import { asMensajesDto } from '../dtos/mensajes.dto.js';
import fs from 'fs';

export default class MensajesDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.mensajes = [];
  }

  #leerArchivo = async () => {
    const texto = await fs.promises.readFile(this.ruta, 'utf-8');
    this.mensajes = JSON.parse(texto);
  };

  #escribirArchivo = async () => {
    const texto = JSON.stringify(this.mensajes, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  };

  async getMensajes() {
    await this.#leerArchivo();
    return asMensajesDto(this.mensajes);
  }

  async addMensajes(data, email) {
    await this.#leerArchivo();
    if (data !== '') {
      data.timestamp = Date.now();
      data.email = email;
    }
    this.mensajes.push(data);
    await this.#escribirArchivo();
    return asMensajesDto(data);
  }
}
