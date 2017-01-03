// YOUR CODE HERE:

//define jquery variables
var $submitButton = $(".submit");
var $message = $("#message");
var $chats = $("#chats");
var $chatsContent;

/*
Parse is a very generalized system and will allow you to store any kind of object you like. 
During this sprint, we'll be using it as a shared message storage server that everyone in the 
class can read and write from (via REST).

The message objects you send to the parse server (via POST requests) should be in the following format:
*/

var app = {
  server: 'https://api.parse.com/1/classes/messages',
  init: function() {},
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
  fetch: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        // $chatsContent = data;
        // console.log($chatsContent);
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
    $('#chats').html('<p>' + message.text + '</p>');
    console.log(message.text);
  },
  renderRoom: function(roomName) {
    $('#roomSelect').html('<option>' + roomName + '</option>');
  }
};
  
var message = {
  username: 'hanyen',
  text: 'whazapp!!!',
  roomname: 'lobby'
};

/*
To get you started, here's an example POST request. Note that any messages you POST to the server are viewable by everyone, so be nice.
*/

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

//create an object named app
// var App = Parse.Object.extend("App");
// var app = new App();

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'GET',
  
//   contentType: 'application/json',
//   success: function (data) {
//     $chatsContent = data;
//     console.log($chatsContent);
//     $('#chatsTextArea').html($chatsContent.results[0].text);
//     console.log('chatterbox: Message received');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to receive message', data);
//   }
// });


/*
1. Display messages retrieved from the parse server.
Use proper escaping on any user input. Since you're displaying input that other users have typed, your app is vulnerable XSS attacks. See the section about escaping below.
http://wonko.com/post/html-escaping
*/



/*


2. Setup a way to refresh the displayed messages (either automatically or with a button)

3. Allow users to select a user name for themself and to be able to send messages
//1. assign IDs/clasees to the html form elements
//2. create jquery to handle button click
*/

// $sendButton.click(function() {
//   console.log("button clicked");
//   var userMessage = $textField.val();
//   //empty the textField
//   $textField.val("");
//   //display message on the chatbox
//   $chats.html(userMessage);
// });
/*


4. Rooms. Allow users to create rooms and enter existing rooms - 
Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.

5. Socializing. 
a. Allow users to 'befriend' other users by clicking on their user name.
b. Display all messages sent by friends in bold
*/