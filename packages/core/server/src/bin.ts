import commander from 'commander';
import Config from "./Config";
import Client from "./Client";
import setup from './setup';

const handle = (fn: (...args: any[]) => Promise<void>) => (...args: any[]) => {
  fn(...args)
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

const createBin = async <T extends {[name: string]: Client}>(config: Config<T>, run: (clients: T) => Promise<void>) => {
  const { getClients, getServer } = setup(config);
  await config.configStore.load();

  const start = async () => {
    const server = await getServer();
    await server.start();
    const clients = await getClients();
    await run(clients);
  }

  const createConfig = async () => {
    const server = await getServer();
    await server.createConfig();
  }

  const startCmd = commander.command('start');
  startCmd.action(handle(start));

  const createConfigCmd = commander.command('create-config');
  createConfigCmd.action(handle(createConfig));

  commander.parse(process.argv);
}

export default createBin;