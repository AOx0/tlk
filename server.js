const BodyParser = require( 'body-parser' );
const Express = require( 'express' );
const path = require("path");
const app = Express();
const {PythonShell} = require('python-shell');
const port = 80

// favicon

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/tlk/images/favicon.png'));

// Parse request of content-type - application/x-www-form-urlencoded

app.use(BodyParser.json());
app.use( BodyParser.urlencoded( { extended: true } ) );
app.use(Express.static(__dirname+'/tlk'))

app.post( '/extrapolar', function( req, res ) {
    console.log(req.body);

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: __dirname + '/tlk/python',
        args: [String(req.body.cc1),req.body.cc2]
    };

    PythonShell.run('extrapolador.py',options, function(err,results) {
        // if(err) throw err;
        if (results && (results[0]) !== "Error") {
            res.send("<h1>" + results[0] + "\n" + results[1] +  "\n" + results[2] + "</h1>")
            res.end()
        }
        res.end()

    });
} );

app.post( '/ccgen', function( req, res ) {
    console.log(req.body);
});

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/tlk/index.html'))
})

app.listen( port, () => {
    console.log( "Server Run:" + port );
} );



