import InfoService from '../services/info.service.js';
import logger from '../utils/loggers.js';
import cluster from 'cluster';
import os from 'os';
import morgan from 'morgan';

const nCpus = os.cpus().length;
export default class InfoController {
  constructor() {
    this.infoService = new InfoService();

    this.getInfo = this.getInfo.bind(this);
  }

  async getInfo(req, res) {
    try {
      logger.log('info', {
        ruta: req._parsedOriginalUrl.path,
        metodo: req.method,
      });

      const info = await this.infoService.getInfo();

      // console.log(info);

      res.status(200).render('info', { info: info });
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
