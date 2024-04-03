# FTP deployer

[![Build Status](https://img.shields.io/github/actions/workflow/status/hexojs/hexo-deployer-ftpsync/tester.yml?branch=master&label=test)](https://github.com/hexojs/hexo-deployer-ftpsync/actions?query=workflow%3ATester)
[![NPM version](https://badge.fury.io/js/hexo-deployer-ftpsync.svg)](https://www.npmjs.com/package/hexo-deployer-ftpsync)

Deploy your site via FTP.

## Install

```
$ npm install hexo-deployer-ftpsync --save
```

## Usage

See https://hexo.io/docs/one-command-deployment#FTPSync

## Warning

If the parameter `clear` is set to true, this plugin will delete all the files and directories on the remote server before uploading. Use this plugin in production at your own risk.
