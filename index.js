var FTPSync = require('ftpsync');

hexo.extend.deployer.register('ftpsync', function(args, callback){
  var config = hexo.config.deploy,
    ftp = new FTPSync();

  if (!config.host || !config.user || config.pass == null){
    var help = [
      'You should configure deployment settings in _config.yml first!',
      '',
      'Example:',
      '  deploy:',
      '    type: ftpsync',
      '    host: <host>',
      '    port: [port] # Default is 21',
      '    remote: [remote] # Default is `/`',
      '    user: <user>',
      '    pass: <pass>',
      '    ignore: [ignore]',
      '    connections: [connections] # Default is 1',
      '',
      'For more help, you can check the docs: ' + 'http://zespia.tw/hexo/docs/deployment.html'.underline
    ];

    console.log(help.join('\n'));
    return callback();
  }

  ftp.settings = {
    local: hexo.base_dir,
    host: config.host,
    port: config.port || 21,
    remote: config.remote || '/',
    user: config.user,
    pass: config.pass,
    connections: config.connections || 1,
    ignore: []
  };

  if (ftp.settings.port > 65535 || ftp.settings.port < 1){
    ftp.settings.port = 21;
  }

  ftp.run(callback);
});