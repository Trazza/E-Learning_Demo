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




Meteor.methods({
  all_players_color: function (id, color) {
  	console.log(id+' '+color);
  	document.getElementById(id+'__Legs').setAttribute('diffuseColor', color);
  	/*
  	Players.find().forEach( function (p) {
  			
  			document.getElementById(p._id+'__Legs').setAttribute('diffuseColor', p.color);
  		});
  */
  },
	
  quiz: function () {
    console.log("Quiz");
     
  }
});




// this uses the Shark branch of Meteor, hence the UI namespace
UI.body.helpers({


	players: function () {
    	return Players.find();
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
  "mousedown transform": function (event) {
    if (Session.get("mode") === "login") {
    	console.log("Ti devi loggare");
    } else {
      if (event.button === 1) {
        console.log(event.currentTarget.id);
      } else if (event.button === 4 || event.button === 2) {
        
        
      }
    }
  },
   'keydown': function(event) {
   if (Session.get("mode") != "login") {
    event.preventDefault();
    
    console.log(event.which);
    switch (event.which) {
				// TRASLAZIONE
				case 38: // freccia su
					z = String(parseFloat(Players.findOne(Session.get('user_id')).z) - 0.5);
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							z: z, 
    						}
    					}
    				)
					break;
				
				case 40: // freccia giù	
					z = String(parseFloat(Players.findOne(Session.get('user_id')).z) + 0.5);
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							z: z, 
    						}
    					}
    				)
					break;
				
				case 37: //freccia sinistra	
    				x = String(parseFloat(Players.findOne(Session.get('user_id')).x) - 0.5);
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							x: x, 
    						}
    					}
    				)	
					break;
					
				case 39: // freccia destra
					x = String(parseFloat(Players.findOne(Session.get('user_id')).x) + 0.5); 
    				Players.update(
    					{ _id: Session.get('user_id') }, 
    					{ $set: //consente di modificare sono il parametro selezionato 
    						{
    							x: x, 
    						}
    					}
    				)	
					break;
					
				// ROTAZIONE
				case 90: // Z
					
					break;
					
				case 67: // C
					
					break;
			
			}	
	}
  }
});
