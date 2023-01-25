#! /usr/bin/env node

import { readFileSync } from 'fs';
import bundle from '@asyncapi/bundler';
import { Command } from "commander";
import path from "path";

const program = new Command();
program
  .version("0.4.0")
  .description("A CLI for leveraging @asyncapi/bundler")
  .argument('<input>', 'Asyncapi to bundle')
  .action(async (input: string): Promise<void> => {
    try {
      const file_path = path.resolve(__dirname, input);
      process.chdir(path.dirname(file_path));

      const document = await bundle([readFileSync(path.basename(file_path), 'utf-8')], {
        referenceIntoComponents: true,
      });

      console.dir(document.json(), { depth: null });
    } catch(e) {
      console.error(e);
    }
  });


program.parseAsync();