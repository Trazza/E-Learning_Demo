// each color has a list so that we have a little variation
var colors = {
  brown: ["#c2892b", "#af7c27", "#b57813"],
  red: ["#e91d45", "#e91d22", "#e60f3d"],
  green: ["#30d02c", "#26bf22", "#30c12d"],
  blue: ["#1d57e9", "#194dd1", "#1d68d9"],
  purple: ["#9414c9"],
  milk: ["#999999"],
  yellow: ["#fee619"]
};

// set initial color
Session.set("color", "brown");

// set initial mode to view
Session.set("mode", "login");

// this uses the Shark branch of Meteor, hence the UI namespace
UI.body.helpers({

players: function () {
    	return Players.find();
  },
  // all boxes in collection
  // XXX should at some point be scoped to user
  boxes: function () {
    return Boxes.find();
  },
  // list of colors for color picker
  colors: function () {
    return _.map(_.keys(colors), function (name) {
      return {
        name: name,
        code: colors[name][0]
      };
    });
  },
  // active color helper for color picker
  activeColor: function () {
    return this.name === Session.get("color");
  },
  // see if we are in login mode
  loginMode: function () {
    return Session.equals("mode", "login");   
  }
});

// events on the dialog with lots of buttons
UI.body.events({
  "click .clear-boxes": function () {
    Meteor.call("clearBoxes");
  },
  "click .swatch": function () {
    Session.set("color", this.name);
  },
  "mousedown shape": function (event) {
    if (Session.get("mode") === "login") {
    	alert("Ti devi loggare");
    } else {
      if (event.button === 1) {
        alert(event.currentTarget.id);
      } else if (event.button === 4 || event.button === 2) {
        
        
      }
    }
  }
});
