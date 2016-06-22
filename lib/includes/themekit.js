var path = require('path');
var BinWrapper = require('bin-wrapper');


var slateRoot = path.resolve(__dirname, '../..');
var base = 'https://raw.githubusercontent.com/Shopify/themekit/vendor_experiment/build/dist';

module.exports = new BinWrapper()
    .src(base + '/darwin-amd64/theme', 'darwin')
    .src(base + '/linux-386/theme', 'linux')
    .src(base + '/linux-amd64/theme', 'linux', 'x64')
    .src(base + '/windows-386/theme.exe', 'win32')
    .src(base + '/windows-amd64/theme.exe', 'win32', 'x64')
    .dest(path.join(slateRoot, '/bin'))
    .use(process.platform === 'win32' ? 'theme.exe' : 'theme');
