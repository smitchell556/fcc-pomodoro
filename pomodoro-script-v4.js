/////////////////////////////
//  ADD BEEP TO END OF TIMER;
/////////////////////////////


// Define global variables

var timerFunc = 0,
    breakTime = 5,
    workTime = 25,
    expireTime = new Date(),
    minuteElem = 25,
    secondElem = 00,
    count = 0,
    startStopButton = document.getElementById("startStop"),
    startStopCount = 0,
    minuteString = '',
    secondString = '',
    endChime = null;
    // endChime = new Audio("buzzer.mp3");
document.getElementById("js-time").innerHTML = minuteElem + ':00';
document.getElementById("break-time").innerHTML = breakTime;
document.getElementById("work-time").innerHTML = workTime;
document.getElementById("decBreakTime").disabled = true;


function changeTime(typeTime, someSign) {
  // Set work and break timer values function
  if (typeTime === 'break' && someSign === 'minus') {
    if (breakTime === 15) {
      document.getElementById("incBreakTime").disabled = false;
    };
    breakTime --;
    document.getElementById("break-time").innerHTML = breakTime;
    if (breakTime === 5) {
      document.getElementById("decBreakTime").disabled = true;
    };
  }
  else if (typeTime === 'break' && someSign === 'plus') {
    if (breakTime === 5) {
      document.getElementById("decBreakTime").disabled = false;
    };
    breakTime ++;
    document.getElementById("break-time").innerHTML = breakTime;
    if (breakTime === 15) {
      document.getElementById("incBreakTime").disabled = true;
    }
  }
  else if (typeTime === 'work' && someSign === 'minus') {
    if (workTime === 45) {
      document.getElementById("incWorkTime").disabled = false;
    };
    workTime --;
    document.getElementById("work-time").innerHTML = workTime;
    document.getElementById("js-time").innerHTML = workTime + ':00';
    if (workTime === 15) {
      document.getElementById("decWorkTime").disabled = true;
    };
  }
  else {
    if (workTime === 15) {
      document.getElementById("decWorkTime").disabled = false;
    };
    workTime ++;
    document.getElementById("work-time").innerHTML = workTime;
    document.getElementById("js-time").innerHTML = workTime + ':00';
    if (workTime === 45) {
      document.getElementById("incWorkTime").disabled = true;
    };
  };
};


function countDownTimer(expire) {
  // Countdown function
  var timeNow = new Date();
  // If timer has not finished, adjusts time left based on system clock
  if (expire > timeNow) {
    diffInSeconds = Math.round((expire - timeNow) / 1000);
    minuteElem = Math.floor(diffInSeconds / 60);
    secondElem = diffInSeconds - (minuteElem * 60);
    minuteString = minuteElem.toString();
    secondString = secondElem.toString();
    if (minuteElem < 10) {
      minuteString = '0' + minuteElem.toString();
    };
    if (secondElem < 10) {
      secondString = '0' + secondElem.toString();
    };
    document.getElementById("js-time").innerHTML = minuteString + ':' + secondString;
  }
  //  Clears setInterval and initializes new call to pomodoro()
  else {
    endChime.play();
    document.getElementById("js-time").innerHTML = "00:00";
    clearInterval(timerFunc);
    pomodoro();
  }
};


function pomodoro() {
  // Determines whether to run work, short break, or long break timer
  // Sets timer values and tracks number of pomodoros completed
  count ++;
  if (count % 8 === 0) {
    count = 0;
    expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + 30);
    timerFunc = setInterval(countDownTimer, 1000, expireTime);
    document.body.style.background = "#00B5A3";
    document.title = "Begin Break";
    setTimeout(function() {document.title = "Pomodoro It!";}, 5000);
    document.getElementById("circle4").style.background= "white";
  }
  else if (count % 2 === 0) {
    expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + breakTime);
    timerFunc = setInterval(countDownTimer, 1000, expireTime);
    document.body.style.background = "#00B5A3";
    document.title = "Begin Break";
    setTimeout(function() {document.title = "Pomodoro It!";}, 5000);
    if (count < 3) {
      document.getElementById("circle1").style.background = "white";
    }
    else if (count < 5) {
      document.getElementById("circle2").style.background= "white";
    }
    else {
      document.getElementById("circle3").style.background= "white";
    }
  }
  else {
    expireTime = new Date();
    expireTime.setMinutes(expireTime.getMinutes() + workTime);
    timerFunc = setInterval(countDownTimer, 1000, expireTime);
    document.body.style.background = "#1E0845";
    document.title = "Begin Work";
    setTimeout(function() {document.title = "Pomodoro It!";}, 5000);
    if (count === 1) {
      document.getElementById("circle1").style.background= "transparent";
      document.getElementById("circle2").style.background= "transparent";
      document.getElementById("circle3").style.background= "transparent";
      document.getElementById("circle4").style.background= "transparent";
    };
  };
};

function startStopTimer() {
  endChime = new Audio("buzzer.mp3");
  if (startStopCount % 2 === 0) {
    pomodoro();
    startStopButton.innerHTML = "STOP";
    document.getElementById("decWorkTime").disabled = true;
    document.getElementById("incWorkTime").disabled = true;
    document.getElementById("decBreakTime").disabled = true;
    document.getElementById("incBreakTime").disabled = true;
    startStopCount ++;
  }
  else {
    clearInterval(timerFunc);
    document.body.style.background = "#00B5A3";
    startStopButton.innerHTML = "START";
    document.getElementById("js-time").innerHTML = workTime + ':00';
    document.getElementById("decWorkTime").disabled = false;
    document.getElementById("incWorkTime").disabled = false;
    document.getElementById("decBreakTime").disabled = false;
    document.getElementById("incBreakTime").disabled = false;
    count = 0;
    numPomodoros = 0;
    startStopCount ++;
    document.getElementById("circle1").style.background= "transparent";
    document.getElementById("circle2").style.background= "transparent";
    document.getElementById("circle3").style.background= "transparent";
    document.getElementById("circle4").style.background= "transparent";
  };
};
