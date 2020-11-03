let sentiment;
let modelIsReady = false;

// Get the input field
window.onload = function () {
  document.getElementById('chat-input').addEventListener('keydown', event => {
    if (event.key == 'Enter') {
      submitText();
    }
  });
};

function setup() {
  noCanvas();
  socket = io.connect();
  console.log(socket);
  socket.on('msg', receiveMsg);
  // Create a new Sentiment method
  sentiment = ml5.sentiment('movieReviews', modelReady);
}
// When the model is loaded
function modelReady() {
  // model is ready
  console.log('Model Loaded!');
  modelIsReady = true;
}
function submitText() {
  let textInput = document.getElementById('chat-input');
  let text = textInput.value;
  if (text != '') {
    document.getElementById('chat-input').value = '';
    createP(text)
      .addClass('chat-line')
      .parent(document.getElementById('chat-window'));
    var chat = document.getElementById('chat-window');
    chat.scrollTop = chat.scrollHeight;
    giveSentiment(text);
    var data = {
      msg: text,
    };
    socket.emit('msg', data);
  }
}
function giveSentiment(text) {
  if (modelIsReady) {
    const prediction = sentiment.predict(text);
    console.log(prediction);
  }
}

function receiveMsg(data) {
  createP(data.msg)
    .addClass('chat-line')
    .parent(document.getElementById('chat-window'));
  var chat = document.getElementById('chat-window');
  chat.scrollTop = chat.scrollHeight;
  giveSentiment(text);
}
