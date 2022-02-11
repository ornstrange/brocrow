function drawScore() {
  textSize(128);
  textAlign(CENTER, TOP);
  noStroke();
  let textColor;
  textColor = color(0,0,0,50);
  fill(textColor);
  text(score, windowWidth / 2, 32);
};

function drawCountdown() {
  if (score > 0) {
    noStroke();
    let countdownColor = color(255,0,0,30);
    fill(countdownColor);
    let w = windowWidth * map(timer, 0, TIME_LIM, 1, 0);
    rect(0, 0, w, windowHeight);
  };
};

