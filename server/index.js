/*jslint nomen: true */
var path = require('path'),
    express = require('express'),
    url = require('url'),
    publicDir = path.resolve(__dirname, '..', 'public'),
    coverage = require('istanbul-middleware'),
    bodyParser = require('body-parser');

function matcher(req) {
    var parsed = url.parse(req.url);
    return parsed.pathname && parsed.pathname.match(/\.js$/) && !parsed.pathname.match(/jquery/);
}

module.exports = {
    start: function (port, needCover) {
        var app = express();
        var http = require('http');
        var https = require('https');
        var fs = require('fs');

        //设置跨域访问
        app.all('*', function (req, res, next) {
            // console.log('req: ', req)
            res.header("Access-Control-Allow-Credentials", "true");  //服务端允许携带cookie
            res.header("Access-Control-Allow-Origin", req.headers.origin);  //允许的访问域
            res.header("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");  //访问头
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");  //访问方法
            res.header("Content-Security-Policy", " upgrade-insecure-requests");
            res.header("X-Powered-By", ' 3.2.1');
            if (req.method == 'OPTIONS') {
                res.header("Access-Control-Max-Age", 86400);
                res.sendStatus(204); //让options请求快速返回.
            }
            else {
                next();
            }

        });
        if (needCover) {
            console.log('Turn on coverage reporting at' + '/bilibili/webcoverage');
            app.use('/bilibili/webcoverage', coverage.createHandler({ verbose: true, resetOnGet: true }));
            app.use(coverage.createClientHandler(publicDir, { matcher: matcher }));
        }
        app.use('/', express.static(__dirname + ''));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.set('view engine', 'hbs');
        app.engine('hbs', require('hbs').__express);
        app.use(express['static'](publicDir));

        // app.listen(port);

        var httpServer = http.createServer(app);
        var httpsServer = https.createServer({
            key: fs.readFileSync('E://coveragewithweb//istanbulserver//cert//private.pem', 'utf8'),  // /data1/istanbulserver/cert  
            cert: fs.readFileSync('E://coveragewithweb//istanbulserver//cert//file.crt', 'utf8')
        }, app);

        // httpServer.listen(port, function () {
        //     console.log('HTTP Server is running on: http://localhost:%s', port);
        // });
        httpsServer.listen(port, function () {
            console.log('HTTPS Server is running on: https://localhost:%s', port);
        });
    }
};
