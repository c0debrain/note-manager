import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections';

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
 


import './main.html';
import { Meteor } from 'meteor/meteor';

Template.body.helpers({
  notes(){
    return Notes.find({})
  }
});


Template.modal.events({
  'submit .addform':function(e){
    e.preventDefault();

    const target = e.target;

    const text = target.text.value;

    Meteor.call('notes.insert', text);

    target.text.value = '';

    $('#addmodal').modal('hide');

    return false;
  }
});


Template.note.events({
  'click #delete-note': function(){
    Meteor.call('notes.remove', this)
    return false;
  }
});
