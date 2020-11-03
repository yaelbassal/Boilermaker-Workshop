//start.js is the entry point for node process.
const {db} = require('./server/database')
const app = require('./server')

const port = process.env.PORT || 3000;
//{force: true}
db.sync()
  .then(() => {
    app.listen(port, () => console.log(`server listening on port ${port}`))
  })
