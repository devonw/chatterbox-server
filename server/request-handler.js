
var fs = require('fs');

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// module.exports.defaultCorsdefaultCorsHeaders = defaultCorsdefaultCorsHeaders;

module.exports.requestHandler = function(request, response) {

  var defaultCorsdefaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-defaultCorsHeaders': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  var url = request.url;
  var method = request.method;
  var data = request._postData;

  defaultCorsdefaultCorsHeaders['Content-Type'] = 'application/json';

  // response.writeHead(200, defaultCorsdefaultCorsHeaders);

  if (method === 'GET') {
    if (url === '/classes/messages') {
      // fs get the whole messages director
      console.log('dirname', __dirname);
      fs.readFile(__dirname + '/classes/messages.txt', 'utf-8', function(err, data) {
        if (err) {
          var statusCode = 404;
          response.statusCode = statusCode;
          response.end();
        } else if (data) {
          console.log(data);
          var statusCode = 200;
          response.statusCode = 200;
          response.writeHead(statusCode, defaultCorsdefaultCorsHeaders);
          response.end(JSON.stringify({ results: data }));
        }
      });      
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else if (method === 'POST' && data !== undefined) {
    var username = request.data.username;
    var message = request.data.message;
    var data = {
      username: useranme,
      message: message
    };
    // fs add message to the file
    fs.appendFile(__dirname + '/classes/messages.txt', JSON.stringify(data), function(err) {
      if (err) {
        var statusCode = 404;
        response.writeHead(statusCode, defaultCorsHeaders);
        response.end();
      }
    });
    var statusCode = 201;
    response.writeHead(statusCode, defaultCorsHeaders);
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  } 


  console.log('Serving request type ' + request.method + ' for url ' + request.url);
};

// These defaultCorsHeaders will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.



