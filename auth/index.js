var express = require('express');

// This makes it possible for this module to be
// included upstream.
module.exports = app = express();

// Routes
// ------

// Routes will match in order.
//
// Further down in our code, we're checking all
// HTTP POST requests for a user.
// The one exception to this will be the
// POST request to log our user in.
//
// By putting the login route first, we ensure
// requests against this endpoint will be handled
// correctly.
app.post('/login', login);

// Here we're doing a series of checks on any HTTP
// requests that create or modify content on the 
// server.
//
// We're going to assume that any of these
// operations require that a user is logged in.
//
// Content-level access/permissions are handled by
// the downstream modules. 
app.post("*", checkLoggedIn);
app.put("*",  checkLoggedIn);
app.delete("*", checkLoggedIn);



function login (req,res) {
  // This could be any any number of things including
  // Passport.js. 
  checkCredentials(req.body.user,req.body.password, function (err,user)) {
    if (err) res.send(401, "Bad username and/or password");
    else {
      // Again, this could be Passport or something else.
      // A serialize user function typically sets up your
      // token/session/etc.
      serialze(user);
      
      // This will usually be a redirect to a success page
      // or in the case of a single page app, a success msg
      // that contains a serialized user object.
      //
      // In that case it would be something like:
      // `res.json(user)`
      res.send("Logged In");
       }
  }
}


// checkLoggedIn Middleware
// ----------

function checkLoggedIn (req,res,next) {
  // If req.user is populated, our user is logged in
  // and we can continue sending this request downstream
  if (req.user) {
    next();

  // Otherwise we throw a 403. The request stops here and
  // is not passed through any additional modules.
  } else {
    res.send(403,'You are not logged in');
  }
}