const mongoose = require("mongoose");
require('dotenv').config()

const port = 3000;

const createServer = require("./server");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database successfully')
    const app = createServer();
    app.listen(port, () => {
      console.log(`server has started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exitCode = 1;
  });
