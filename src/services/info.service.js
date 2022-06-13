import minimist from 'minimist';
import os from 'os';
const numCPUs = os.cpus().length;
export default class InfoService {
  constructor() {}

  async getInfo() {
    const args = minimist(process.argv);
    const info = {
      nprocessors: numCPUs,
      args: args,
      path: process.execPath,
      os: process.platform,
      pid: process.pid,
      nodev: process.version,
      projectFolder: process.cwd(),
      rss: process.memoryUsage(),
    };
    return info;
  }
}
