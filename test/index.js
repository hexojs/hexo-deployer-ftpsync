'use strict';

const should = require('chai').should(); // eslint-disable-line
const pathFn = require('path');
const fs = require('hexo-fs');
const FtpSrv = require('ftp-srv');

describe('deployer', () => {
  const baseDir = pathFn.join(__dirname, 'deployer_test');
  const publicDir = pathFn.join(baseDir, 'public');
  const fakeRemote = pathFn.join(baseDir, 'remote');

  const hostname = '127.0.0.1';
  const port = 8021;
  const ftpServer = new FtpSrv({
    url: `ftp://${hostname}:${port}`
  });

  ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
    resolve({ root: fakeRemote });
  });

  ftpServer.listen();

  const ctx = {
    base_dir: baseDir,
    public_dir: publicDir,
    log: {
      info: () => {},
      error: () => {}
    }
  };

  const deployer = require('../lib/deployer').bind(ctx);

  before(() => {
    fs.mkdir(baseDir);
    return fs.writeFile(pathFn.join(publicDir, 'foo.txt'), 'foo');
  });

  beforeEach(() => {
  });

  after(() => {
    ftpServer.close();
    return fs.rmdir(baseDir);
  });

  afterEach(() => {
  });

  function validate() {
    return fs.existsSync(pathFn.join(publicDir, 'foo.txt'));
  }

  it('default', () => {
    // return true;
    return deployer({
      host: '127.0.0.1',
      user: 'anonymous',
      pass: 'nopassword',
      port
    }, () => {}).then(() => {
      return validate();
    });
  });
});
