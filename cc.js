#!/usr/bin/env node

const path = require('path');
const child_process = require('child_process');

const originalArgv = process.argv;

let argv = originalArgv;
argv = argv.filter(a => a !== '-m64');
argv.splice(2, 0, `--sysroot=${path.join(__dirname, '..', '..', '..', 'lumin')}`);
argv = argv.map(a => {
  if (/\/mnt\/c\//.test(a)) {
    if (/(?:clang|clang\+\+|gcc|g\+\+|\-ar|\-ld|\-ranlib)$/.test(a)) {
      a += '.exe';
    } else {
      a = a.replace(/\/mnt\/c\//, 'C:/').replace(/\//g, '\\');
    }
  }
  return a;
});

try {
  child_process.execFileSync(argv[1], argv.slice(2), {
    stdio: 'inherit',
    env: process.env,
  });
} catch(err) {
  process.exit(err.status);
}
