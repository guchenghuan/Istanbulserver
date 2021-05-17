const { json } = require('body-parser');

/*jslint nomen: true */
var
    // nopt = require('nopt'),
    // config = nopt({ coverage: Boolean }),
    istanbulMiddleware = require('istanbul-middleware'),
    coverageRequired = true,
    port = 8988;

if (coverageRequired) {
    console.log('server start with coverage !');
    istanbulMiddleware.hookLoader(__dirname, { verbose: true });
}
// console.log('Starting server at: http://localhost:' + port);
// if (!coverageRequired) {
//     console.log('Coverage NOT turned on, run with --coverage to turn it on');
// }
require('./server').start(port, coverageRequired);

