PlayersList = new Mongo.Collection('players');
console.log("Hello World");
if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player' : function(){
      return PlayersList.find()
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