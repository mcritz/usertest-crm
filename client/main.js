import { Template } from 'meteor/templating';
import { Subjects } from '../api/subjects.js';

import './subject.js';
import './main.html';


Template.body.rendered = function() {
	$('#contacted').datepicker();
};

Template.body.helpers({
	subjects() {
		return Subjects.find({})
	}
});

var validateEmail = function(someText) {
	if (!someText.length) { return false; }
	var emailRegEx = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi);

	console.log(someText.match(emailRegEx));

	if (!someText.match(emailRegEx)) { return false; }
	return true;
}

Template.body.events({
	'keyup #new-email, blur #new-email' (event) {
		const $target = $(event.target);
		const text = $target.val().trim();
		$target.parent('div.form-group').removeClass('has-success, has-warning');

		var validation_class = validateEmail(text) ? 'has-success' : 'has-warning';
		$target.parent('div.form-group').addClass(validation_class);
	},
	'submit .new-subject' (event) {
		event.preventDefault();
		const $target = $(event.target);

		$target.find('.form-group').removeClass('has-success has-warning');
		console.log($target.find('.form-group'));

		const fname = $target.find('#new-fname').val().trim();
		const lname = $target.find('#new-lname').val().trim();
		const email = $target.find('#new-email').val().trim();
		const lastcontacted = new Date($target.find('#contacted').val());

		if (!fname.length && !lname.length) {
			return;
		}

		Subjects.insert({
			fname : fname,
			lname : lname,
			email : email,
			lastContacted : lastcontacted,
			createdAt : new Date(),
		});

		$target.find('#new-lname, #new-fname, #new-email, #contacted').val('');
	}
});

