import fs from 'fs-extra';
import path from 'path';

class ConfigStore {
  private _location: string;
  private _configs: {[name: string]: any} = {};

  constructor(location: string = path.join(process.cwd(), 'config.json')) {
    this._location = location;
  }

  async load() {
    if (!fs.existsSync(this._location)) return;

    const file = await fs.readFile(this._location, 'utf-8');
    this._configs = JSON.parse(file);
  }

  get(name: string) {
    return this._configs[name];
  }

  set(name: string, value: any) {
    this._configs[name] = value;
  }

  async save() {
    const dir = path.dirname(this._location);
    await fs.mkdirp(dir);
    await fs.writeFile(this._location, JSON.stringify(this._configs, null, '  '), 'utf-8');
  }
}

export default ConfigStore;