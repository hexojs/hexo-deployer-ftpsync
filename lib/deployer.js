'use strict';

const ftp = require('basic-ftp');

module.exports = async function(args, callback) {
  const log = this.log;
  if (!args.host || !args.user || args.pass == null) {
    const help = [
      'You should ensure deployment settings in _config.yml first!',
      '',
      'Example:',
      '  deploy:',
      '    type: ftpsync',
      '    host: <host>',
      '    user: <user>',
      '    pass: <pass>',
      '    remote: [remote] # Default is `/`',
      '    port: [port] # Default is 21',
      '    clear: [true|false] # Default is false',
      '    verbose: [true|false]',
      '',
      'For more help, you can check the docs: http://hexo.io/docs/deployment.html'
    ];

    log.warn(help.join('\n'));
    return callback();
  }

  const client = new ftp.Client();
  client.ftp.verbose = args.verbose || false;

  try {
    await client.access({
      host: args.host,
      port: args.port || 21,
      user: args.user,
      password: args.pass,
      secure: false
    });

    await client.ensureDir(args.remote || '/');
    if (args.clear) await client.clearWorkingDir();
    await client.uploadFromDir(this.public_dir);

    log.info('Deployment complete');
  } catch (err) {
    log.error('FTP Deployment Error:', err);
  } finally {
    client.close();
    callback();
  }
};
