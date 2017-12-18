/* POMODORO CLOCK
   A timer that allows the user to set work times and break times.
   Defaults to 25 minute work time and 5 minute break time, but times 
   are customizable in one-minute increments. At the end of each time
   period, a bell rings to notify the user and the countdown automatically
   begins for the next period. The user can reset the clock for their next 
   pomodoro.
*/

$(document).ready(function () {

    // DOM elements
    var timerDisplay = document.getElementById("timerDisplay");
    var workInput = document.getElementById("workInput");
    var breakInput = document.getElementById("breakInput");
    var message = document.getElementById("message");
    var reset = document.getElementById("reset");
    var speed = document.getElementById("speed");

    // state variables
    var count;
    var timerIsOn;
    var itsWorkTime;
    var inputIsValid = true;

    // clock runtime in milliseconds
    var myInterval = 1000;

    // default session time values
    const WORK_DEFAULT = 25;
    const BREAK_DEFAULT = 5;

    // set clock at start
    var minutes;
    var seconds;

    speed.addEventListener("click", toggleSpeed);

    function toggleSpeed(){
        if (myInterval === 1000){
            myInterval = 100;
            speed.innerHTML = "slower";
        } else if (myInterval === 100){
            myInterval = 1000;
            speed.innerHTML = "faster";
        }
        
    }
    
    // validate that user input is a positive integer
    function validateInput(){
        var inputs = [workInput, breakInput];
        for (var i = 0; i < inputs.length; i++){
            inputs[i].addEventListener("input", function(event){
                //console.log(`This is ${this} and its value is ${this.value}`);
                if (workInput.value <= 0 || workInput.value % 1 !== 0 || breakInput.value <= 0 || breakInput.value % 1 !== 0 ){
                    message.innerHTML = "time must be in whole minutes!";
                    inputIsValid = false;
                } else {
                    message.innerHTML = "";
                    inputIsValid = true;
                }
            })
        }
    }
  
    // timer click event
    timerDisplay.addEventListener("click", handleTimerClick);

    function handleTimerClick(){
        // disable 
        if (!inputIsValid){
            return;
        } else {
        
            // if it's the first session, start the clock
            if (!timerIsOn && count === 0){
                timerIsOn = true;

                // disable input fields until clock is reset
                breakInput.disabled = true;
                workInput.disabled = true;

                // show reset and speed buttons
                reset.style.visibility = "visible";
                speed.style.visibility = "visible";

                // set minutes to work input
                minutes = workInput.value;

                countdown();
            // if the clock is running, pause
            } else if (timerIsOn){
                timerIsOn = false;
            // if the clock is paused, resume
            } else if (!timerIsOn && count > 0){
                timerIsOn = true;
                breakInput.disabled = true;
                workInput.disabled = true;
                countdown();
            }
        }
    }

    // on reset, stop countdown and set clock back to default values
    reset.addEventListener("click", setDefaults);

    function setDefaults(){
        count = 0;
        timerIsOn = false;
        itsWorkTime = true;

        workInput.value = WORK_DEFAULT;
        breakInput.value = BREAK_DEFAULT;

        minutes = workInput.value;
        seconds = 0;

        validateInput();

        breakInput.disabled = false;
        workInput.disabled = false;

        timerDisplay.innerHTML = "start";
        reset.style.visibility = "hidden";
        speed.style.visibility = "hidden";

        myInterval = 1000;
        speed.innerHTML = "faster";

        $(breakInput).removeClass("green");
        $(workInput).removeClass("red");
    }


    function countdown() {
        // check for pause condition
        if (!timerIsOn){
            return;
        } 

        // toggle work/break border color
        if (itsWorkTime){
           $(breakInput).removeClass("green");
           $(workInput).addClass("red");
        } else {
            $(workInput).removeClass("red");
            $(breakInput).addClass("green");
        }

        if (minutes === 0 && seconds === 0) {
            // play chime at end of current timer
            document.getElementById("sound").play();

            // when one timer finishes, set timer to the next
            if (itsWorkTime){
                minutes = breakInput.value;
                itsWorkTime = false;    
            } else {
                minutes = workInput.value;
                itsWorkTime = true;
            }
        }       

        // format timer display
        if (seconds < 10) {
            timerDisplay.innerHTML = minutes + ":0" + seconds;
        } else {
            timerDisplay.innerHTML = minutes + ":" + seconds;
        }

        // decrement to 59s to roll over the minute
        if (seconds === 0 && minutes >= 1) {
            seconds = 59;
            minutes = minutes - 1;
        } else {
            seconds = seconds - 1;
        }   
        
        // increment for state
        count += 1;

        setTimeout(countdown, myInterval);           
        
    }

    setDefaults();

});