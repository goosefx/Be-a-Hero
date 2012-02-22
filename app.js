
/**
 * Module dependencies.
 */

var express = require('express'), 
    swig = require('swig'),
    routes = require('./routes'),
    app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.register('.html', swig);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Configuration // Development
app.configure('development', function(){
  swig.init({ root: __dirname + '/views', allowErrors: true, cache: false });
  app.set('view cache', false);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Configuration // Production
app.configure('production', function(){
  swig.init({ root: __dirname + '/views', allowErrors: true, cache: true });
  app.set('view cache', true);
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(parseInt(process.env.PORT) || 8888);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
