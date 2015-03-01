if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllPlayers: function() {
		
        return Players.remove({});

      }

    });

  });

}