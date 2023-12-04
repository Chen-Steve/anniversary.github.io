var dv = document.getElementById("content");
dv.style.opacity = 0; // Initially set opacity to 0
var delayInSeconds = 9; // Set the delay time in seconds
var val = 0;

function timer(){
    var start = new Date(2021, 11, 4, 14, 0); // Month is 0-indexed; December is 11
    var t = new Date() - start;
    var d = Math.floor(t / 1000 / 60 / 60 / 24);
    var h = Math.floor(t / 1000 / 60 / 60 % 24);
    var m = Math.floor(t / 1000 / 60 % 60);
    var s = Math.floor(t / 1000 % 60);
    document.getElementById("d").innerHTML = d;
    document.getElementById("h").innerHTML = h;
    document.getElementById("m").innerHTML = m;
    document.getElementById("s").innerHTML = s;
}

function fadein() {
    if (val < 1) {
        val += 0.025; // Increment opacity
        dv.style.opacity = val;
    } else {
        clearInterval(fadeinInterval); // Stop the interval once fully visible
    }
}

function showTimerAfterDelay() {
    setTimeout(function() {
        fadeinInterval = setInterval(fadein, 50); // Start fading in
    }, delayInSeconds * 1000);
}


timer();
setInterval(timer, 1000);
showTimerAfterDelay();