'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var emails = require('../../app/controllers/emails.server.controller');

	// Emails Routes
	app.route('/api/emails')
		.get(emails.list)
		.post(users.requiresLogin, emails.create);

	app.route('/api/emails/:emailId')
		.get(emails.read)
		.put(users.requiresLogin, emails.hasAuthorization, emails.update)
		.delete(users.requiresLogin, emails.hasAuthorization, emails.delete);

	app.route('/sendEmail').post(emails.sendEmail);

	// Finish by binding the Email middleware
	app.param('emailId', emails.emailByID);
};
