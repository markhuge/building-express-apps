var express = require('express'),
    app     = express(),
    http    = require('http'),
    // It's generally a good idea to use env variables
    // for configuring environment-level things like
    // listening ports.
    //
    // It's also a good idea to have a sensible default
    // if the env default is undefined.
    port    = process.env.PORT || 8080;
    



// Sub modules
// ----------- 

// Each module manages their own dependencies and
// routes. In this example we're using separate modules
// to manage different sets of concerns.
//
// See the docs for each module for detail on their
// implementation

var post    = require('./post'),
    auth    = require('./auth');

// Flow control
// ------------

// Express will pass requests through each model in
// the order that they are applied here.
//
// Here we use 'auth' first. Subsequent modules don't
// need to worry about negotiating auth, since it's
// already been handled upstream.
//
// See the docs for the auth module for more detail on
// the implementation.
app.use(auth);

// Mount Points
// ------------

// Here we specify an optional 'mount point' for downstream
// modules. This means downstream modules can be written
// without having to manage their own route prefix.
//
// This is *really* handy for things like localizations
// and versioned APIs. changing a path from:
// '/api/v2/posts/1' to: '/api/v2/posts/1'
// doesn't require any modification of the 'post' module's
// routes.
app.use('/posts', post);

// Bower resolution
// ----------------

// Using the express static middleware, we can resolve
// bower component paths without having to include
// 'bower_components/' in our template files.
//
// This is handy, because our templates become tool
// agnostic, and don't need to be updated if we move
// to something else in the future. 
app.use(express.static(__dirname + '/bower_components'));


// Exporting the app
// -----------------

// Exporting our server instance makes testing easier,
// because we can simply include our server as a module
// rather than having to spin it up and negotiate
// connections.
module.exports = http.createServer(app).listen(port);