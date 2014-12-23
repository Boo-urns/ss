ssList  = new Mongo.Collection('sslist');
people  = new Mongo.Collection('people');

if (Meteor.isClient) {
  Template.list.helpers({
    person: function(){
      return people.find();
    },

  });

  Template.addPersonForm.events({
    'submit form': function(e) {
      e.preventDefault();
      var person = e.target.person;
      var personName = person.value;

      people.insert({
        name: personName,

      });

      person.value = '';
    }
  });

  Template.createList.events({
    'click .matches': function(){
      var list = people.find().fetch();
      var rSort = list.sort(function() { return 0.5 - Math.random() });
      console.log(rSort);
      list.forEach(function(person) {
        console.log(person.name);
      })
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
