#!/usr/bin/env node
import path from 'path';
import fs from 'fs-extra';
import commander from 'commander';

const ncc = require('@zeit/ncc');

const run = async (location: string) => {
  const { code, assets } = await ncc(location, {
    quiet: true,
  });

  return {
    code,
    assets,
  }
};

const bundleCmd = commander.command('bundle [inputFile]');
bundleCmd.option('-o outputdir', 'output directory');

bundleCmd.action(async (input: string) => {
  try {
    const outputLocation = path.join(process.cwd(), 'bundle');
    const inputLocation = path.resolve(input);
    const { code } = await run(inputLocation);
    await fs.mkdirp(outputLocation);
    const outputFile = path.join(outputLocation, 'bundle.js');
    await fs.writeFileSync(outputFile, code, 'utf-8');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})

commander.parse(process.argv);