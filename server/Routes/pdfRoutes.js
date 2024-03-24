const router = require("express").Router();
const upload = require("../middleware/fileParser");
const pdfCtrl = require("../Controllers/pdfCtrl");

router.route("/Scanner").post(upload.single("file"), pdfCtrl.scanPdf);
router.route("/modify").post(upload.single("file"), pdfCtrl.modifyPdf);

module.exports = router;
