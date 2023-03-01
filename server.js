const express = require("express");
const app = express();
const port = 3000;
const { sequelize } = require("./db");
const seed = require("./seed");
const { userRouter } = require("./routes/users");
const { showsRouter } = require("./routes/shows");

app.use("/users", userRouter);
app.use("/shows", showsRouter);

app.listen(port, () => {
  //   sequelize.sync();
  console.log(`Your server is running on port ${port}`);
});
