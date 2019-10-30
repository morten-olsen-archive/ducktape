# Ducktape

A platform for sticking different platforms together

### Currently supported platforms:

* Github `@morten-olsen/ducktape-integration-github`
* Cron `@morten-olsen/ducktape-integration-cron`

## Quick start

Create a new npm project and install `@morten-olsen/ducktape-server` as well as any integrations you want, for instance `@morten-olsen/ducktape-integration-github`

The easiest way to create a server is to use the provided `createBin` function to create a cli application

```typescript
#!/usr/bin/env node

import { createBin } from '@morten-olsen/ducktape-server';
import Github from '@morten-olsen/ducktape-integration-github';

createBin({
  url: 'localhost:3000',
  port: 3000,
  clients: {
    github: new Github(),
  },
}, async ({ github }) => {
  // do stuff with integrations here
  github.hooks.on('pullrequest', async () => {
    const client = await github.getClient('morten-olsen', 'ducktape');
    client....
  })
})
  .catch(console.error);
```

The cli will have two actions:

* **start** which starts the provided function
* **create-config** which will guide you through configuring the integrations and create a `config.json` with the configuration result

For a project example look at `packages/core/demo`

## Bundling

To bundle your new server into a single JS file you can use `@morten-olsen/ducktape-bundler` to run `ducktape-bundler bundle your/file.ts` which will create a `bundle/bundle.js` file