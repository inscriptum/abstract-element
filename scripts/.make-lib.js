"use strict";

const fs = require('fs-extra');
const path = require('path');

const PATHS = {
  lib: './lib'
};



let pkg = require('../package.json');

delete pkg.devDependencies;
pkg.private = false;
pkg.scripts = { 'prepublishOnly': 'cd .. && npm run build' }


fs.writeJsonSync(path.join(PATHS.lib, 'package.json'), pkg, { spaces: 2 });

fs.copySync('README.md', path.join(PATHS.lib, 'README.md'));
fs.copySync('LICENSE', path.join(PATHS.lib, 'LICENSE'));
