const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const city = require("../controllers/city.controller");
const upload = require("../middlewares/upload");

module.exports = function (app) {
  var users = require("../controllers/user.controller.js");
  var cities = require("../controllers/city.controller");

  // Retrieve all users
  app.get("/api/user/retrieveinfos", users.findall);

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/teachers/all", controller.allAccess);

  app.get("/api/teachers/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/teachers/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/teachers/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // retrieve all cities in profile page
  app.get("/api/teachers/user", cities.findAll);

  //update user info into profile page
  app.put("/api/teachers/user", users.update);

  // to upload the avatar of the user from profile page
  app.post(
    "/api/teachers/user",
    // [authJwt.verifyToken],
    upload.single("file"),
    users.upload
  );
};
