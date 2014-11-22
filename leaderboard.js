PlayersList = new Mongo.Collection('players');
console.log("Hello World");
if (Meteor.isClient) {
  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    }
  });
  Template.leaderboard.helpers({
    'player' : function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1} })
    },
    'selectedClass' : function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId === selectedPlayer) {
        return "selected"
      }
    },
    'otherHelperFunction' : function(){
      return "some other function"
    },
    'howMany' : function() {
      return PlayersList.find().count()
    },
  });
};
if (Meteor.isServer) {

}