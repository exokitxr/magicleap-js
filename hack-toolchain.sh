#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const MLSDK = process.env['MLSDK'] || '/mnt/c/Users/avaer/MagicLeap/mlsdk/v0.16.0';

const binDir = path.join(__dirname, 'tools', 'toolchains', 'bin');
const hacks = [
  {
    dst: path.join(binDir, 'clang'),
    src: 'cc.js',
  },
  {
    dst: path.join(binDir, 'clang++'),
    src: 'cc.js',
  },
  {
    path: path.join(binDir, 'aarch64-linux-android-gcc'),
    src: 'cc.js',
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-g++'),
    src: 'cc.js',
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-ld'),
    src: 'cc.js',
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-ar'),
    src: 'ar.js',
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-ranlib'),
    src: 'ar.js',
  },
];

if (process.argv[2] !== '-u') {
  hacks.forEach(hack => {
    const {dst, src} = hack;
    fs.copyFileSync(src, dst);
  });
} else {
  hacks.forEach(hack => {
    const {dst} = hack;
    fs.unlinkSync(dst);
  });
}
