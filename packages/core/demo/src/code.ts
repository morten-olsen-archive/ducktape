import { Clients } from './index';

const run = async ({ github }: Clients) => {
  github.hooks.on('status', async (a) => {
    const client = await github.getClient(
      a.payload.repository.owner.login,
      a.payload.repository.name,
    );
    const pulls = await client.pulls.list({
      owner: a.payload.repository.owner.login,
      repo: a.payload.repository.name,
    });
  });
};

export default run;