const BodyParser = require( 'body-parser' );
const Express = require( 'express' );
const path = require("path");
const app = Express();
const {PythonShell} = require('python-shell');
const port = 80

// get ip

const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);

app.get('/', function (req, res, next) {
    console.log(req.ipInfo);
    next()
});

app.get('/ccgen/', function (req, res, next) {
    console.log(req.ipInfo);
    next()
});

app.get('/extrapolador/', function (req, res, next) {
    console.log(req.ipInfo);
    next()
});

// favicon

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/tlk/images/favicon.png'));

// Parse request of content-type - application/x-www-form-urlencoded

app.use(BodyParser.json());
app.use( BodyParser.urlencoded( { extended: true } ) );
app.use(Express.static(__dirname+'/tlk'))

app.post( '/extrapolar', function( req, res ) {
    console.log(req.body);
});

app.post( '/ccgen', function( req, res ) {
    console.log(req.body);
});

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/tlk/index.html'))

})

app.listen( port, () => {
    console.log( "Server Run:" + port );
} );



