PlayersList = new Mongo.Collection('players');
console.log("Hello World");
if (Meteor.isClient) {
  Meteor.subscribe('thePlayers');
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
    },
    'click .remove' : function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }
  });
  Template.leaderboard.helpers({
    'player' : function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({},{sort: {score: -1, name: 1} })
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
    'showSelectedPlayer' : function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }
  });
  Template.addPlayerForm.events({
    'submit form' : function(event) {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    }
  });
};
if (Meteor.isServer) {
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId})
  });
}