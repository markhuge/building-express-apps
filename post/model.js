// Sweetest DB mock ever.
var db = {
  1: "my post number is 1",
  2: "some other post",
  3: "yet another post"
}

// CRUD methods
// ------------

exports.createPost = function (req,res){
  var dblen = Object.keys(db).length,
      id    = dblen + 1;
  db[id] = req.body.content;
  res.send("created post id: " + id  + " " +  db[id])

}


exports.readPost = function (req,res) {
  var id = req.params.id;
  if (db[id]) res.send(db[id]);
  else res.send(404);
  
}


exports.updatePost = function (req,res) {
  var id = req.params.id;
  db[id] = req.body.content;
  res.send("updated post id: " + id + " " + db[id])

}

exports.deletePost = function (req,res) {
  var id = req.params.id;
  if (db[id]) { 
    delete db[id]
    res.send("deleted " + id)
  }
}
