const httpStatus = require('http-status-codes');

module.exports = {
	respondJSON: async (req, res) => {
		res.json({
			status: httpStatus.OK,
			data: req.data
		});
	}
}
