// YOUR CODE HERE:

/*
Parse is a very generalized system and will allow you to store any kind of object you like. 
During this sprint, we'll be using it as a shared message storage server that everyone in the 
class can read and write from (via REST).

The message objects you send to the parse server (via POST requests) should be in the following format:
*/

var app = {

  server: 'https://api.parse.com/1/classes/messages',
  messageObject: {
    username: 'hanyen',
    text: 'testing message',
    roomname: 'lobby'
  },
  init: function() {
    // create a user chat after clicking on the username
      //fetch all the chats of that user, using .fetch method, passing the username
    // this.fetch();
    
    // create click event handlers 
    $('.username').on('click', this.handleUsernameClick);
    $('#send .submit').on('submit', this.handleSubmit);
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(userName) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        //if argument is undefined, grab all objects
          //else if argument = a username, grab all objects associated with that userName
        
        // $('#chatsTextArea').html($chatsContent.results[0].text);
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    $('#chats').html('<p><button class = "username">' + message.username + '</button> ' + message.text + '</p>');
    
  },
  renderRoom: function(roomName) {
    $('#roomSelect').html('<option>' + roomName + '</option>');
  },
  handleUsernameClick: function() {
    console.log('i am in handleUsernameClick');
    
  },
  handleSubmit: function() {
    console.log('i am in handleSubmit');
    // post and get
    // app.messageObject['usernamame'] = 'hanyen';
    // app.messageObject['text'] = $('.submit').val();
    // app.messageObject['roomname'] = 'lobby';

    app.send(app.messageObject);
    app.fetch(app.messageObject);
  }
};


var message = {
  username: 'hanyen',
  text: 'whazapp!!!',
  roomname: 'lobby'
};



/*
1. Display messages retrieved from the parse server.
Use proper escaping on any user input. Since you're displaying input that other users have typed, your app is vulnerable XSS attacks. See the section about escaping below.
http://wonko.com/post/html-escaping

2. Setup a way to refresh the displayed messages (either automatically or with a button)

3. Allow users to select a user name for themself and to be able to send messages
//1. assign IDs/clasees to the html form elements
//2. create jquery to handle button click

4. Rooms. Allow users to create rooms and enter existing rooms - 
Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.

5. Socializing. 
a. Allow users to 'befriend' other users by clicking on their user name.
b. Display all messages sent by friends in bold
*/