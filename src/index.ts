#! /usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import bundle from '@asyncapi/bundler';
import figlet from 'figlet';
import { Command } from "commander";
import path from "path";

console.log(figlet.textSync("AsyncAPI Bundler"));

const program = new Command();
program
  .version("0.3.0")
  .description("A CLI for leveraging @asyncapi/bundler")
  .argument('<input>', 'Asyncapi to bundle')
  .argument('<output>', 'Bundled asyncapi file')
  .action(async (input: string, output: string): Promise<void> => {
    try {
      const document = await bundle([readFileSync(path.resolve(__dirname, input), 'utf-8')], {
        referenceIntoComponents: true,
      });

      writeFileSync(path.resolve(__dirname, output), document.yml());
    } catch(e) {
      console.error(e);
    }
  });


program.parseAsync();