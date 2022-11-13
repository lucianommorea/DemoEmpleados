const server = require('./src/app.js');
const { populateDb } = require('./src/controllers/generalControllers.js');
const { conn } = require('./src/db.js');


// Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
  conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    await populateDb()
  });
});
