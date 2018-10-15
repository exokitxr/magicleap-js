#!/usr/bin/env node

const path = require('path');
const child_process = require('child_process');

const originalArgv = process.argv;

let argv = originalArgv;
// argv = argv.filter(a => a !== '-m64');
// argv.splice(2, 0, `--sysroot=${path.join(__dirname, '..', '..', '..', 'lumin')}`);
argv = argv.map(a => {
  if (/\/mnt\/[a-z]\//.test(a)) {
    if (/(?:clang|clang\+\+|gcc|g\+\+|\-ar|\-ld|\-nm|\-strings|\-ranlib)$/.test(a)) {
      a += '.exe';
    } else {
      a = a.replace(/\/mnt\/([a-z])\//, '$1:/').replace(/\//g, '\\');
    }
  }
  /* if (a === '-lrt') {
    a = '-lclang_rt.ubsan_standalone-aarch64-android';
  } */
  return a;
});
/* (() => {
  const index = argv.indexOf('-lclang_rt.ubsan_standalone-aarch64-android');
  if (index !== -1) {
    argv = argv.splice(index, 0, '-llog');
  }
})(); */

try {
  child_process.execFileSync(argv[1], argv.slice(2), {
    stdio: 'inherit',
    env: process.env,
  });
} catch(err) {
  process.exit(err.status);
}
