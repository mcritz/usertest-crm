import { Template } from 'meteor/templating';
import { Subjects } from '../api/subjects.js';

import './main.html';


Template.body.rendered = function() {
	$('#contacted').datepicker();
};

Template.body.helpers({
	subjects() {
		return Subjects.find({})
	}
});

Template.body.events({
	'focus #contacted' (event) {

	},
	'submit .new-subject' (event) {
		event.preventDefault();
		const $target = $(event.target);

		const fname = $target.find('#new-fname').val();
		const lname = $target.find('#new-lname').val();
		const lastcontacted = new Date($target.find('#contacted').val());

		Subjects.insert({
			fname : fname,
			lname : lname,
			lastContacted : lastcontacted,
			createdAt : new Date(),
		});

		$target.val('');
	}
});
