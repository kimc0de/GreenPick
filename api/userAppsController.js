const httpStatus = require('http-status-codes');
const GreenPickApp = require('../models/greenPickApp');
const {respondNoResourceFound} = require('../controllers/errorController');
const {redirectIfUnauthorized} = require('../controllers/errorController');

module.exports = {

	getAllApps: async (req, res, next) => {
		redirectIfUnauthorized(req, res);

		try {
			let apps = await GreenPickApp.find({ userId: req.user._id });
			req.data = apps;
			console.log(req.data);
		} catch (error) {
			console.error(error);
			respondNoResourceFound(req, res);
		}
		next();
	},
	respondJSON: async (req, res) => {
		res.json({
			status: httpStatus.OK,
			data: req.data
		});
	}
}
