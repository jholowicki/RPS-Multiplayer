
// Initializes RpsGame, construction will proceed below.
function RpsGame() {
  
  // Shortcuts to DOM Elements.
  this.pl1SubmitButton = document.getElementById("pl1-add"); 
  console.log(this.pl1SubmitButton);
  this.pl1NameInput = document.getElementById("pl1name-input");
  this.pl2SubmitButton = document.getElementById("pl2-add");
  this.pl2NameInput = document.getElementById("pl2name-input");
  this.chatForm = document.getElementById('chat-form')
  this.chatInput = document.getElementById('chat-input');
  this.messageList = document.getElementById('message-ouput');

  //Saves player name to Firebase DB on form submit.
  this.pl1SubmitButton.addEventListener('submit', this.saveName.bind(this));
  //Saves chat message to Firebase DB on form submit.
  this.chatForm.addEventListener('submit', this.saveMessage.bind(this));

  //Initialize Firebase.
  this.initFirebase();
  console.log(this.initFirebase());
}

//Sets up shortcut to Firebase features.
RpsGame.prototype.initFirebase = function(){
  //Sets the database access.
  this.database = firebase.database();
  //Firebase authorization and storage can be added here later as well.
};

//Saves Name to Firebase DB
RpsGame.prototype.saveName = function() {
    if (this.pl1NameInput.value) {

        // Add player one to the Firebase Database.
        this.database.set({
            player1: this.pl1NameInput.value,
            wins: 0,
            losses: 0,
            choice: 'set'
        }).then(function(){}).catch(function(error) {
            console.error('Error writing new message to Firebase Database', error);
        });

    } else if (this.pl2NameInput.value){

        // Add player two to the Firebase Database.
        this.database.set({
            player2: this.pl2NameInput.value,
            wins: 0,
            losses: 0,
            choice: 'set'
        }).catch(function(error) {
            console.error('Error writing new message to Firebase Database', error);
        });
        // unnecessary function:
        // then(function() {
        //     // Clear message text field and SEND button state.
        //     // RpsGame.resetMaterialTextfield(this.pl2NameInput);
            
        // }.bind(this))

    }
};


//Saves Message to Firebase DB
RpsGame.prototype.saveMessage = function(){
    if (this.chatInput.value) {

    var currentUser = "hello";
    // Add a new message entry to the Firebase Database.
    this.messagesRef.push({
      name: currentUser,
      text: this.chatInput.value
    }).then(function() {
      // Clear message text field
      // RpsGame.resetMaterialTextfield(this.chatInput);
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
}
};
// Template for messages.
RpsGame.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// Displays a Message in the UI.
RpsGame.prototype.displayMessage = function(key, name, text) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = RpsGame.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  }
};


// Loads chat messages history and listens for upcoming ones.
RpsGame.prototype.loadMessages = function() {
   // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('messages');
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads the last 10 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
    this.displayMessage(data.key, val.name, val.text);
  }.bind(this);
  this.messagesRef.limitToLast(10).on('child_added', setMessage);
  this.messagesRef.limitToLast(10).on('child_changed', setMessage);

};

rpsGame = new RpsGame();
