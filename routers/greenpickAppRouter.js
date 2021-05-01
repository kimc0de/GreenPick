const greenpickAppController = require('../controllers/greenpickAppController');
const router = require('express').Router();

//route to index page
router.get("/add", greenpickAppController.renderNewApp);
router.post("/add", greenpickAppController.saveGreenpickApp);

module.exports = router;