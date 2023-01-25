#! /usr/bin/env node

import { readFile } from 'fs/promises';
import bundle from '@asyncapi/bundler';
import { Command } from "commander";
import path from "path";

const program = new Command();
program
  .version("0.6.1")
  .description("A CLI for leveraging @asyncapi/bundler")
  .argument('<input>', 'Asyncapi to bundle')
  .action(async (input: string): Promise<void> => {
    try {
      const file_path = path.resolve(process.cwd(), input);
      process.chdir(path.dirname(file_path));

      const document = await bundle([await readFile(path.basename(file_path), 'utf-8')], {
        referenceIntoComponents: true,
      });

      console.dir(document.json(), { depth: null });
    } catch(e) {
      console.error(e);
    }
  });


program.parseAsync();