import { Template } from 'meteor/templating';
import { Subjects } from '../api/subjects.js';

import './subject.html';

Template.subject.events({
	'click .remove'() {
		Subjects.remove(
			this._id
		);
	}
});
