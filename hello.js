countersCollection = new Mongo.Collection('counters');

if (Meteor.isClient) {

  Template.hello.onCreated(function() {
    this.subscribe('allCounters');
  });

  Template.hello.helpers({
    counters: function () {
      return countersCollection.find({});
    }
  });

  Template.hello.events({
    'click button.increment': function () {
      // increment the counter when button is clicked
      Meteor.call('incrementCounter', this._id);
    }
  });
}

Meteor.methods({
  incrementCounter: function(id) {
    countersCollection.update({_id:id} , {$inc: {counter: 1}});
  }
});


if (Meteor.isServer) {

  Meteor.publish('allCounters', function() {
    return countersCollection.find({});
  });
  Meteor.startup(function() {
    if (!countersCollection.findOne({_id:'1'})) {
      countersCollection.insert({_id:'1', counter: 0});
    }
  });

}
