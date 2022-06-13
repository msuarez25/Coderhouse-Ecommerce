import { fork } from 'child_process';
const funcRandom = fork('./src/utils/random.util.js');
import logger from '../utils/loggers.js';

export default class RandomController {
  constructor() {
    this.getRandom = this.getRandom.bind(this);
  }

  async getRandom(req, res) {
    let { cant } = req.query;
    if (cant === undefined) cant = 1e5;
    try {
      funcRandom.on('message', (resultado) => {
        res.status(200).json(resultado);
      });
      funcRandom.send(cant);
    } catch (error) {
      logger.log('error', error.message);
    }
  }
}
