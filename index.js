var faunadb = require("faunadb"),
  q = faunadb.query,
  client = new faunadb.Client({ secret:  'YOUR_FAUNADB_ADMIN_SECRET' }),
  db_name = "Hello_world",
  role = "server",
  class_name = "test",
  index_name = "test_index";
// Create database
client.query(
  q.Do(
      q.If(q.Exists(q.Database(db_name)), "Database exists", q.CreateDatabase({ name: db_name })),    
      {secret : q.Select("secret", q.CreateKey({ database: q.Database(db_name), role: role }))}
  )
).then(function(data){
  // Instantiate database instance
  var client = new faunadb.Client({ secret: data.secret });
  // Create a class
  client.query(
      q.If(q.Exists(q.Class(class_name)), "Class exists", q.CreateClass({ name: class_name }))
  ).then(function(data){
    // Create class index and content
    client.query(
      q.Do(
        q.If(q.Exists(q.Index(index_name)), "Index exists",  q.CreateIndex({ 
          name: index_name, 
          source: q.Class(class_name),
          terms: [{ field: ["data", "name"] }]
        })),
        q.Create(q.Class(class_name), { data: {  name: "alice" }})
       )
    ).then(function(response) {

      console.log("----------------------------- log the ref ----------------------------------");
      console.log(response.ref); // Would log the ref to console.
      console.log("----------------------------------------------------------------------------");
      var helper = client.paginate(q.Match(q.Index(index_name), "alice"))
      helper.map(function(ref) { return q.Get(ref); }).each(function(page) {
        console.log("--------------------- log the retrieved instance ---------------------------");
        console.log(page); // Will now log the retrieved instances.
        console.log("----------------------------------------------------------------------------");
      });
       // Would log the ref to console.
    }).catch(function(error){
      console.log(error)
    })
  })
}).catch(function(error){
  console.log("--------------------- Client instantiation ---------------------------");
  console.log("Fix by using the correct FAUNADB ADMIN SECRET from your dashboard");
  console.log("----------------------------------------------------------------------");
});
