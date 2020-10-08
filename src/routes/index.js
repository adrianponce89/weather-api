const router = require("express-promise-router")();
const Controller = require("../controllers");

router.route("/location").get(Controller.location);
router.route("/current/:city?").get(Controller.current);
router.route("/forecast/:city?").get(Controller.forecast);

module.exports = router;
