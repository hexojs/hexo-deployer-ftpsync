'use strict';

/* global hexo */

hexo.extend.deployer.register('ftpsync', require('./lib/deployer'));
