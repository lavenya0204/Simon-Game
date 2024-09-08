var gamePattern=[];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern=[];

var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern=[];

    level++;

    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber=Math.floor(randomNumber);

    $("#level-title").text("Level "+ level);

    var randomChosenColour = buttonColours[randomNumber];
 
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    
    var audio = new Audio("./sounds/"+randomChosenColour+".mp3");
    audio.play(); 
}

$(".btn").click(function(){
        var userChosenColour= this.id;
        userClickedPattern.push(userChosenColour);
        //console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });

$(document).keypress(function(){
    if(!started){
    var text = "Level "+ level;
    $("#level-title").text(text);
    nextSequence();
    started = true;
    }
});

function playSound(name){
        var audio = new Audio("./sounds/"+name+".mp3");
        audio.play();
}

function animatePress(currentColour){
    $("."+currentColour+".btn").addClass("pressed");
    setTimeout(function() {
        $("."+currentColour+".btn").removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        // console.log("success!");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else{
        //console.log("wrong!");
        var wrongAud = new Audio("./sounds/wrong.mp3");
        wrongAud.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamepattern=[];
    started=false;
}

