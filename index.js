var Hapi = require('hapi'),
    server = new Hapi.Server(8000, {
      views: {
        engines: {
          html: require('handlebars')
        },
        basePath: __dirname,
        path: './views',
        layoutPath: './views/layouts',
        helpersPath: './views/helpers',
        layout: 'application'
      }
    });

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.view('index', {
      title: 'Lima Monumentos'
    });
  }
});

server.route({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: 'assets',
      listing: true
    }
  }
});

server.start();