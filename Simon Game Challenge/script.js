var level=1;
var colors = ["green","red","yellow","blue"];

var selected = [];
var userselected= [];

var started= false;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level "+level);
        getPattern();
        started = true;
    }
});

$(document).click(function(event) {
    if(started) {
        var clicked=event.target.id;
        userselected.push(clicked);

        animateflash(clicked);
        playsound(clicked);

        ansCheck(userselected.length-1);
    }
});


function ansCheck(num) {

    if(selected[num] == userselected[num]) {
        if(selected.length === userselected.length) {
            setTimeout(function() {
                getPattern();
            },500);
        }
    }
    else {

        $("#level-title").text("Game Over, Press Any Key to Restart");

        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);      
        
        restratGame();
    }
}

function getPattern() {

    $("#level-title").text("Level "+level);
    level++;
    userselected= [];    
    var rand=Math.floor(Math.random()*4);
    selected.push(colors[rand]);
    
    //Animation
    setTimeout(() => {
        $("#"+colors[rand]).fadeOut(100).fadeIn(100);
        playsound(colors[rand]);
    }, 500);  
}


function playsound(song) {
    var sound = new Audio("sounds/"+song+".mp3");
    sound.play();
}

function animateflash(color) {

    $("#"+color).addClass("pressed");
    setTimeout(function() {
        $("#"+color).removeClass("pressed");
    },100);
}

function restratGame() {
    level= 1;
    started= false;
    selected= [];
}


