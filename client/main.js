import { Template } from 'meteor/templating';
import { Subjects } from '../api/subjects.js';

import './main.html';

Template.body.helpers({
	subjects() {
		return Subjects.find({})
	}
});

Template.body.events({
	'submit .new-subject' (event) {
		event.preventDefault();
		const $target = $(event.target);

		const fname = $target.find('#new-fname').val();
		const lname = $target.find('#new-lname').val();
		const contactedNow = $target.find('#contacted-now').val() == 'on';
		const lastContacted = contactedNow ? new Date() : null;

		Subjects.insert({
			fname : fname,
			lname : lname,
			lastContacted : lastContacted,
			createdAt : new Date(),
		});

		$target.val('');
	}
});
