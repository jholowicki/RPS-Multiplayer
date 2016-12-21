
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPbrqnY3TpvKvDY7GEUcF0t0tLuLA0S8k",
    authDomain: "rps-game-d3e6b.firebaseapp.com",
    databaseURL: "https://rps-game-d3e6b.firebaseio.com",
    playerDatabaseURL: "https://rps-game-d3e6b.firebaseio.com/players",
    storageBucket: "rps-game-d3e6b.appspot.com",
    messagingSenderId: "869894323251"
  };
  firebase.initializeApp(config);
   


   // Create a variable to reference the database
   var database = firebase.database();



// var myDataRef = new Firebase('https://rps-game-d3e6b.firebaseio.com/');
// var playerDataRef = new Firebase('https://rps-game-d3e6b.firebaseio.com/players');
var player1 = false;
var player2 = false;
var playerNum;


 // "Login" On Click of Button
    $("#click-button").on("click", function() {
    	// startGame();

	name = $('#name-input').val().trim();
	
      //  Store Click Data to Firebase in a JSON property called clickCount
      // Note how we are using the Firebase .set() method

     
    });

function startGame(){
database.ref().set({

players: {
    player1: {
        name: 'vincent',
        wins: 0,
        losses: 0,
        choice: 'set'
    },

    player2: {
        name: 'joy',
        wins: 0,
        losses: 0,
        choice: 'set'
    }
}

 });
//checking players turn, set each player, chat connection, write on screen status
}

startGame();

//gameLogic() 3 functions
//player1Won();
//player2Won();
//tie();
//restartGame();   
//

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({ 
    	username: name, 
    	email: email, 
    	profile_picture: imageUrl 
    });
}
