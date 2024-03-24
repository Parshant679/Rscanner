const router = require("express").Router();
const upload = require("../middleware/fileParser");
const emailCtrl = require("../Controllers/emailCtrl");

router.route("/email").post(upload.single("file"), emailCtrl.emailGenerator);
module.exports = router;
