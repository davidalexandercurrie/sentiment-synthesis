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
  document.getElementById('chat-input').value = '';
  createP(text)
    .addClass('chat-line')
    .parent(document.getElementById('chat-window'));
  var chat = document.getElementById('chat-window');
  chat.scrollTop = chat.scrollHeight;
  giveSentiment(text);
}
function giveSentiment(text) {
  if (modelIsReady) {
    const prediction = sentiment.predict(text);
    console.log(prediction);
  }
}
