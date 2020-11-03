let sentiment;
let modelIsReady = false;
let osc;
let osc2;
let playing = false;

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
  osc = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');
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
    giveSentiment(text, 'local');
    var data = {
      msg: text,
    };
    socket.emit('msg', data);
  }
}
function giveSentiment(text, from) {
  if (modelIsReady) {
    const prediction = sentiment.predict(text);
    console.log(prediction);
    if (from == 'local') {
      console.log('local');
      playSound(prediction);
    } else {
      console.log('outside');
      playSoundFromOtherPeople(prediction);
    }
  }
  if (!playing) {
    playing = true;
    osc.start();
    osc2.start();
  }
}

function receiveMsg(data) {
  createP(data.msg)
    .addClass('chat-line')
    .parent(document.getElementById('chat-window'));
  var chat = document.getElementById('chat-window');
  chat.scrollTop = chat.scrollHeight;
  giveSentiment(text, 'outside');
}

setInterval(() => {
  let zigzags = document.getElementsByClassName('zigzag');
  zigzags[0].style.left = Math.random() * 20 + 'px';
  zigzags[1].style.left = Math.random() * 20 + 'px';
}, 50);

function playSound(prediction) {
  osc.freq(prediction.score * 2000 + 100);
}
function playSoundFromOtherPeople(prediction) {
  osc2.freq(2100 - (prediction.score * 2000 + 100));
}
