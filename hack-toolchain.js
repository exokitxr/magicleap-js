#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const MLSDK = process.env['MLSDK'] || '/mnt/c/Users/avaer/MagicLeap/mlsdk/v0.18.0';

const binDir = path.join(MLSDK, 'tools', 'toolchains', 'bin');
const ccJs = path.join(__dirname, 'cc.js');
const arJs = path.join(__dirname, 'ar.js');
const hacks = [
  {
    dst: path.join(binDir, 'clang'),
    src: ccJs,
  },
  {
    dst: path.join(binDir, 'clang++'),
    src: ccJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-gcc'),
    src: ccJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-g++'),
    src: ccJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-ld'),
    src: ccJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-nm'),
    src: arJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-as'),
    src: arJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-strings'),
    src: arJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-ar'),
    src: arJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-ranlib'),
    src: arJs,
  },
  {
    dst: path.join(binDir, 'aarch64-linux-android-objcopy'),
    src: arJs,
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
    try {
      fs.unlinkSync(dst);
    } catch(err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  });
}
