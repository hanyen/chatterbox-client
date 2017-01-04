// YOUR CODE HERE:

/*
Parse is a very generalized system and will allow you to store any kind of object you like. 
During this sprint, we'll be using it as a shared message storage server that everyone in the 
class can read and write from (via REST).

The message objects you send to the parse server (via POST requests) should be in the following format:
*/
var $messageContent;

var app = {

  server: 'https://api.parse.com/1/classes/messages',

  //for testing only
  messageObject: {
    username: 'hanyen',
    text: 'testing message',
    roomname: 'lobby'
  },
  
  // masterRoomname: [],

  //create object with roomname as the key
  roomnameObject: {
    AllRooms: ''
  },

  init: function() {
    //fetch all messages and display it in #chat
    //setInterval to autofetch
    app.fetch();
    app.renderRoom();
    setInterval(app.fetch, 10000);
    
    
    // create a user chat window after clicking on the username
      //fetch all the chats of that user, using .fetch method, passing the username
      //===== code below ======

    
    // create click event handlers for username click (onClick)
    $('.username').on('click', app.handleUsernameClick);

    // create click event handlers for submit button (onSubmit)
    $('#send .submit').on('submit', app.handleSubmit);

    // create click event handlers for roomSelect dropdown
    $('#roomSelect').on('change', app.fetch);
  },
  
  send: function(messageObject) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(messageObject),
      contentType: 'application/json',
      success: function (data) {
        // console.log(data);
        console.log('chatterbox: Message sent');
        app.clearMessages();
        app.fetch();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  fetch: function() {

    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: {
        order: '-createdAt'
      },
      
      success: function (messages) {
        // console.log(messages);
        // goal: render the recent messages firstd
        // iterate through the data
        
        // find out all the roomnames
          //populate the dropdown options with roomnames
        // for the given roomnames in the dropdown
          // render message based on the roomname
        app.clearMessages(); 
        console.log($('#roomSelect option:selected').text());
        console.log('************');
        for (var i = 0; i < messages.results.length; i++) {
          if ($('#roomSelect option:selected').text() === 'AllRooms') { /* use jquery to find out which option is selected. if it's AllRooms */
            app.renderMessage(messages.results[i]);
          }

          // else if /* the currently selected option */ {
          //   app.renderMessage(/* just the message in the selected option*/);
          // }
          
          //app.renderRoom(messages.results[i]);

        // }
        
        
        // for (var i = 0; i < messages.results.length; i++) {
        //   app.roomnameObject[messages.results[i].roomname] = '';
        //   console.log(app.roomnameObject);
        //   // app.renderRoom(messages.results[i]);
        }
        
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

    if (message.text !== undefined) {
      //need to handle bad chat message using regex
      var cleanMessage = message.text.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");  
    } else {
      cleanMessage = ' ';
    }
    
    $('#chats').append('<div class="message"><a href="#" class = "username">' + message.username + '</a> ' + cleanMessage /*+ '<span>, CreatedAt: ' + message.createdAt + '</span>'*/ + '<span>, Roomname: ' + message.roomname + '</span>' + '</div>');
    // var cleanMessage = message.text;
    // $('#chats').append('<div class="message"><a href="#" class = "username">' + message.username + '</a> ' + cleanMessage + '<span>, CreatedAt: ' + message.createdAt + '</span>' + '<span>, Roomname: ' + message.roomname + '</span>' + '</div>');
    //set the dropdown #to the room name

  },
  renderRoom: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      data: {
        order: '-createdAt'
      },
      
      success: function (messages) {
        for (var i = 0; i < messages.results.length; i++) {
          app.roomnameObject[messages.results[i].roomname] = '';
        }

        console.log(app.roomnameObject);
        console.log('^^^^^^^^^^^^^^');
        //append options to the HTML select tag
        $('#roomSelect').empty();
        for (var key in app.roomnameObject) {
          $('#roomSelect').append('<option>' + key + '</option>');
        }
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });

    
    
    
  },
  handleUsernameClick: function() {
    console.log('i am in handleUsernameClick');
    
  },
  handleSubmit: function() {
    // console.log('i am in handleSubmit');
    // console.log($('.sendMessage').val());
    // create a messageObject

    var messageObject = {
      // get the current username (default: hanyen)
      username: app.getUrlParameter('username'),
      // get the message typed in the box (#message)
      text: $('.sendMessage').val(),
      // get the current room i am in (#roomSelect)
      roomname: 'lobby'
    };
    // console.log(messageObject);

    // pass the messageObject to app.send
    app.send(messageObject);
    $('.sendMessage').val('');
  },

  getUrlParameter: function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');
    var sParameterName;

    for (var i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }
};




/*
1. Display messages retrieved from the parse server. (done)

Use proper escaping on any user input. Since you're displaying input that other users have typed, your app is vulnerable XSS attacks. See the section about escaping below.
http://wonko.com/post/html-escaping. (done)

2. Setup a way to refresh the displayed messages (either automatically or with a button) (done)

3. Allow users to select a user name for themself and to be able to send messages
//1. assign IDs/clasees to the html form elements
//2. create jquery to handle button click

4. Rooms. Allow users to create rooms and enter existing rooms - 
Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.

5. Socializing. 
a. Allow users to 'befriend' other users by clicking on their user name.
b. Display all messages sent by friends in bold
*/