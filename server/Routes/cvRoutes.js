const router = require("express").Router();
const CvCtrl = require("../Controllers/CvCtrl");
const upload = require("../middleware/fileParser");

router.route("/generateCv").post(upload.single("file"), CvCtrl.modifyCv);

module.exports = router;
