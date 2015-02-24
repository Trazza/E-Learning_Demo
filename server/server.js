// it's not possible to remove all without making a method
Meteor.methods({
  clearBoxes: function () {
    Boxes.remove({});
  }
});

if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPlayers: function() {
		
        return Players.remove({});

      }

    });

  });

}