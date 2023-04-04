const log4js = require('log4js');

log4js.addLayout('custom', function (config) {
  return function (logEvent) {
    const output = {
      timestamp: logEvent.startTime.getTime(),
      level: logEvent.level.levelStr,
      message: logEvent.data[0],
      context: logEvent.categoryName
    };
    return JSON.stringify(output);
  };
});

log4js.addLayout("json", function (config) {
  return function (logEvent) {
    return JSON.stringify(logEvent) + config.separator;
  };
});

log4js.configure({
  appenders: {
    console: {
      type: 'console',
    },
    file: {
      type: 'dateFile',
      filename: 'logs/app.log',
      pattern: '.yyyy-MM-dd',
      layout: { type: 'custom' },
      compress: false
    }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' }
  },
  pm2: true, // 支持 PM2 进程管理器
  disableClustering: true // 禁用集群
});

module.exports = log4js;