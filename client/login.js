// each color has a list so that we have a little variation
var colors = {
  brown: ["#c2892b"],
  red: ["#e91d45"],
  green: ["#30d02c"],
  blue: ["#1d57e9"],
  purple: ["#9414c9"],
  gray: ["#999999"],
  yellow: ["#fee619"]
};



Template.temporary_login.events({
 
 	"click .swatch": function() {
    	Session.set("color", this.name);
  	},

    'click button.login-mode' : function(e, t){  //login
    	
    	e.preventDefault(); //  ???
      
      	//estraggo il nome dal form di login
    	var username = t.find('#login-username').value;
    	 
    	if (username.replace(/ /g, '') == "") {  //verifico che il nome non sia una sequenza di spazi
    		alert("inserisci username");
    	} else {
    		var user_id = username.replace(/ /g, '')+ "_id";
    		if (typeof(Players.findOne(user_id)) != 'undefined'){
    			alert('utente ESISTENTE');
    		}else{;
    			alert('CONFERMATO');
				Session.set("mode", "scenaMode");
				Session.set("utente", username); 
				Session.set("user_id", user_id); 
				
				 //posizione iniziale del player
 				var x = "3";
 				var y = "1";
 				var z = "1";
 				var color = Random.choice(colors[Session.get("color")]);
				
				Players.insert({  	//inserisco nome utente e id nella collection
 	        		nome: username,
    	      		_id: user_id,
    	      		x: x,
    	      		y: y,
    	      		z: z,
    	      		color: color
        		});
			
				//aggiungo la box nell'x3d
      			//$("#scena_x3d").append("<transform DEF='BOX_red' id='BOX"+user_id+"' translation='"+Players.findOne(Session.get('user_id')).x+" "+Players.findOne(Session.get('user_id')).y+" "+Players.findOne(Session.get('user_id')).z+"' rotation='0 0 1 0' > <shape> <appearance> <material diffuseColor='1 0 0'></material> </appearance> <box size='2 2 2'></box> </shape> </transform>		");
    	   		
    	   		//$("#nome_utente_log").append("BENVENUTO "+ username);
    	   	
    	   		//document.getElementById('AAA_id__Legs').setAttribute('diffuseColor', color);
    	   		document.getElementById('lavagna__MA_Molbert').setAttribute('diffuseColor', '0 1 0');
    	   		//Tracker.flush();
			}
       	}
       	
      }
  });
  
  
  Template.temporary_logout.events({

    'submit #temporary_logout_form' : function(e, t){
    e.preventDefault(); //  ???
      
      	//estraggo il nome dal form di login
    	
		Session.set("mode", "login");
		Session.set("utente", "Non sei loggato");
		$("#nome_utente_log").empty();
		Players.remove(Session.get('user_id'));
      
       
      }
  });






Template.temporary_login.helpers({


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


});