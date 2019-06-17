export default {
  // eslint-disable-next-line
  api: process.env['NODE_ENV'] === 'development' ? '/gameApi/' : window.location.protocol + '//' + window.location.host + '/' || ''
  // http://gicdev.demogic.com/
  // http://192.168.1.154:86/
};
