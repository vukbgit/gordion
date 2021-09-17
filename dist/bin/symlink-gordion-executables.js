#!/usr/bin/env node
"use strict";

var path = _interopRequireWildcard(require("path"));

var _commander = require("commander");

var _filehound = _interopRequireDefault(require("filehound"));

var _shellCommander = require("../shell-commander");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const program = new _commander.Command();

(async () => {
  program.description('Create symlinks to gordion executables').action(createSymlinks);
  await program.parseAsync();
})();

async function findExecutables() {
  const files = await _filehound.default.create().paths('./' + (process.env.BUILD_FOLDER ?? 'node_modules/gordion/dist/bin')).match('*.js').find();
  return files;
}

async function createSymlinks() {
  const files = await findExecutables();
  let command = 'cd node_modules/.bin';
  files.forEach(file => {
    command += ' && ln -sf ../gordion/dist/bin/' + path.basename(file) + ' gordion-' + path.basename(file, '.js');
  });

  _shellCommander.shellCommander.exec(command);
}