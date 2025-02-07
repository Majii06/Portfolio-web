var canvas = new fabric.Canvas('myCanvas');
var group = new fabric.Group();

var rightAnswer=0;
var answeredQuestions=0;
var numberOfQuestions=10;
var numberOfSelectors;
var random;
var number;
var numberOfSelected; //index of number of painted rects as numerator
var txt = ''; //to store the content of questions
var questionId; //to identify which type of question to show
var questionNumerator;
var questionDenomiator;
var answerNumberator;
var answerDenomiator;
var count;//to calculate the number of rects selected
var cs = new Audio("Correct.mp3");//sound when answer is correct
cs.load();
var ics = new Audio("Incorrect.mp3");//sound when answer is incorrect
ics.load();

function generateTask() {
  var txt='SCORE: '+answeredQuestions+'/'+numberOfQuestions;
  document.getElementById('answerProgress').innerHTML = txt;
  document.getElementById('startGuess').style.visibility = 'hidden';
  document.getElementById('generateTask').style.visibility = 'hidden';
  document.getElementById('welcome').style.visibility = 'hidden';
  document.getElementById('answerResponse').style.visibility = 'hidden';
  init();
}

function init() {//generate the layout and randomly choose question type (two types in total)
  count = 0;
  //clear canvas
  initParameters();
  if (Math.random() < 0.5) {
    questionId = 1;
    questionOneSetup(); //init parameters of question one
  } else {
    questionId = 2;
    questionTwoSetup(); //init parameters of question two
  }
  textQuestion(); //show question text
  generateSelectors(); //draw rects
  generateButton(); //draw button
  //console.log('qeustionId=' + questionId + ';number=' + number + ';numberOfSelected=' + numberOfSelected + ';numberOfSelectors=' + numberOfSelectors);
}

function initParameters() { //to avoid random 0/X or X/X.
  numberOfSelectors = Math.max(2, Math.ceil(Math.random() * 12)); // use Math.ceil to round up and to avoid random 1 as denominator
  random = Math.max(Math.ceil(Math.random() * (numberOfSelectors - 1)), 1); //to avoid random 0 and numberOfSelectors
  number = random;
  questionNumerator = number;
  questionDenomiator = numberOfSelectors;
}

function questionOneSetup() {//quesiton one setup
  txt = 'Color the ' + number + '/' + numberOfSelectors + ' of squares';
  numberOfSelected = 0;
  hideQuestionTwoElements();
}

function questionTwoSetup() {//question two setup
  txt = 'Use the square to complete the challenge.';
  numberOfSelected = number;
  questionTwoAnswer();
}

function textQuestion() {//textQuestion
  if (random == 0) {
    number = 1;
  } else {
    number = random;
  }
  var text = new fabric.Text(txt, {
    top: 50,
    left: 100,
    fill: 'blue',
    fontSize: 30,
    subClass: 'question',
    _controlsVisibility: {
      'tl': false,
      'tr': false,
      'bl': false,
      'br': false,
      'ml': false,
      'mt': false,
      'mr': false,
      'mb': false,
      'mtr': false
    },
    lockMovementX: 'false',
    lockMovementY: 'false',
    lockScalingX: 'false',
    lockScalingY: 'false',
    lockUniScaling: 'false',
    lockRoation: 'false'
  });
  canvas.add(text);
  canvas.renderAll();
}

function generateSelectors() {//generate genreateSelectors:AKA rects waitting to be selected
  var column;
  if (numberOfSelectors <= 6) { //to generate first row of rects
    column = numberOfSelectors;
    drawSelectors(1, column, numberOfSelected);
  } else { //to generate second row of rects
    column = numberOfSelectors - 6;
    drawSelectors(1, 6, numberOfSelected);
    drawSelectors(2, column, numberOfSelected - 6);
  }

  function drawSelectors(row, column, numberOfSelected) {
    for (var i = 0; i < column; i++) {
      var Rectleft = 85 * i;
      var RectTop = 85 * (row - 1);
      var myRect = new fabric.Rect({
        width: 80,
        height: 80,
        stroke: 'grey',
        left: 100 + Rectleft,
        top: 100 + RectTop,
        fill: 'white',
        subClass: 'selector',
        _controlsVisibility: {//disable frame controls
          'tl': false,
          'tr': false,
          'bl': false,
          'br': false,
          'ml': false,
          'mt': false,
          'mr': false,
          'mb': false,
          'mtr': false
        },
        //lock the position
        lockMovementX: 'false',
        lockMovementY: 'false',
        lockScalingX: 'false',
        lockScalingY: 'false',
        lockUniScaling: 'false',
        lockRoation: 'false'
      });
      canvas.add(myRect);
      if (numberOfSelected > 0) {
        myRect.set('fill', 'orange');
        numberOfSelected--;
      }
    }
    canvas.renderAll();
  }
}

function generateButton() {//button
  var buttonFrame = new fabric.Rect({
    width: 200,
    height: 50,
    fill: 'orange',
    stroke: 'grey',
    top: 50,

  });

  var buttonText = new fabric.Text('submit', {
    fill: 'white',
    fontSize: 20,
    top: 62,
    left: 70
  });

  var buttonGroup = new fabric.Group([buttonFrame, buttonText], {
    left: 100,
    top: 400,
    subClass: 'button',
    _controlsVisibility: {
      'tl': false,
      'tr': false,
      'bl': false,
      'br': false,
      'ml': false,
      'mt': false,
      'mr': false,
      'mb': false,
      'mtr': false
    },
    lockMovementX: 'false',
    lockMovementY: 'false',
    lockScalingX: 'false',
    lockScalingY: 'false',
    lockUniScaling: 'false',
    lockRoation: 'false'
  });
  canvas.add(buttonGroup);
}


canvas.on('mouse:down', function(event) {//listen event of select rects and click button
  switch (questionId) {
    case 1: //question one: listen select rects event and click button event
      if (event.target != null) { // to avoid select=null error
        switch (event.target.subClass) { //count and activate selector
          case 'selector':
            if (event.target.fill == 'white') { //select rect
              event.target.set('fill', 'orange');
              count++; //count number of rect selected
            } else { //unselect rect
              event.target.set('fill', 'white');
              count--;
            }
            //console.log(count);
            break;
          case 'button': //check answer
            answerNumerator = count;
            answerDenomiator = numberOfSelectors;
            checkSubmit();
            break;
        }
      }
      break;

    case 2: //question two: listen click button event
      answerNumerator = document.getElementById('numerator').value;
      answerDenomiator = document.getElementById('denominator').value;
      if (event.target != null && event.target.subClass == 'button') {
        checkSubmit();
      }
      break;
  }
  //console.log('questionNumerator:' + questionNumerator + ';answerNumerator:' + answerNumerator);
  //console.log('questionDenomiator:' + questionDenomiator + ';answerDenomiator:' + answerDenomiator);
});


function checkSubmit() {
  if (questionNumerator / questionDenomiator == answerNumerator / answerDenomiator) {
    //console.log('Aowsome, you are correct!');
    cs.play();
    congratsPageShow();
    canvas.clear();

  } else {
    //console.log('Try Again');
    ics.play();
    answerCheck();
  }
  //init();
  canvas.renderAll();
}

function answerCheck() {
  var text;
  if (questionId == 1) {
    text = questionNumerator + ' The needs to be colored. Please try again.';
  }
  if (questionId == 2) {
    text = questionNumerator + '/' + questionDenomiator + ' of the wholes has to be colored. Try again.';
  }
  var answers = new fabric.Text(text, {
    fontSize: 30,
    fill: 'red',
    left: 350,
    top: 400,
    subClass: 'answerCheck'
  });
  canvas.add(answers);
}

function questionTwoAnswer() {
  var answer = new fabric.IText(' of the whole has a color.', {
    fontSize: 30,
    fill: 'blue',
    left: 160,
    top: 320,
    subClass: 'answer'
  });

  var fractionLine = new fabric.Rect({
    width: 50,
    height: 1,
    fill: 'blue',
    subClass: 'line',
    left: 110,
    top: 340
  });
  canvas.add(fractionLine);
  canvas.add(answer);
  document.getElementById('numerator').style.visibility = 'visible';
  document.getElementById('denominator').style.visibility = 'visible';
  document.getElementById('numerator').value = '';
  document.getElementById('denominator').value = '';
}

function hideQuestionTwoElements() {
  document.getElementById('numerator').style.visibility = 'hidden';
  document.getElementById('denominator').style.visibility = 'hidden';
}

function congratsPageShow() {
  
  // document.getElementById('answerProgress').innerHTML = txt;
    if (answeredQuestions == numberOfQuestions) {
      document.getElementById('startGuess').style.visibility = 'visible';
      document.getElementById('generateTask').innerHTML='Susunod';
      document.getElementById('generateTask').style.visibility = 'visible';
      document.getElementById('welcome').style.visibility = 'hidden';
      document.getElementById('answerResponse').innerHTML = 'WRONG, PLAY AGAIN';
      document.getElementById('answerResponse').style.visibility = 'visible';
      answeredQuestions=0;
    }
    else{
  document.getElementById('startGuess').style.visibility = 'visible';
  document.getElementById('generateTask').innerHTML='Susunod';
  document.getElementById('generateTask').style.visibility = 'visible';
  document.getElementById('welcome').style.visibility = 'hidden';
  document.getElementById('answerResponse').innerHTML = 'PERFECT! YOU WERE RIGHT!';
  document.getElementById('answerResponse').style.visibility = 'visible';
  answeredQuestions++;
}
//console.log('answeredQuestions=',answeredQuestions);
}

canvas.on('mouse:over', function(event) {
  //add hovereffect on rects
});
