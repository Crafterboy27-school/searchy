const rails = require("http-rails");
var rail = new rails();
const port = 3000;
const path = require("path");

rail.use(rails.static(path.resolve("./")));

rail.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
