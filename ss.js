ssList  = new Mongo.Collection('sslist');
people  = new Mongo.Collection('people');
Matches = new Mongo.Collection(null);

if (Meteor.isClient) {
  Template.list.helpers({
    person: function(){
      return people.find();
    },

  });
  Template.matches.helpers({
    match: function() {
      var m = Matches.find().fetch();
      if( m.length > 0) {
        var mOutput = [];
        for(var i=0; i<m[0].list.length; i++) {
          mOutput.push(m[0].list[i]);
        }
        
        console.log(mOutput);      
        return mOutput;
      }
    }
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
      var receivers = list;
      list.sort(function() {
        return .5 - Math.random();
      });

      var matched = [];
      var taken   = [];

      var listLen = list.length;
      receivers.forEach(function(person) {
        for(var i=0; i<listLen; i++) {
          if(person._id !== list[i]._id && taken.indexOf(list[i]._id) == -1) {
            matched.push({giver: person, receiver: list[i]});
            taken.push(list[i]._id);
            return false;
          }
        }
      });

      Matches.insert({list: matched});
    }
  });
  Template.registerHelper('addKeys', function (all) {
    return _.map(all, function(i, k) {
        return {key: k, value: i};
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
