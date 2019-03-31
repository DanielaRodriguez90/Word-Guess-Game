//array for all NBA teams
var nbaTeams = ["hawks","celtics","nets","hornets","bulls","cavaliers","mavericks","nuggets","pistons","warriors","rockets","pacers","clippers", "lakers","grizzlies","heat","bucks","timberwolves", "pelicans","knicks","thunder","magic","sixers","suns","trail blazers", "kings","spurs","raptors","jazz","wizards"];
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var lettersGuessed = [];
var teamNameDisplay = "";
var teamNameSelected = selectedTeam();
var wordDiv = document.getElementById("selectedTeamNameDisplay");


// GAME //

//create function for randonly selected team name
function selectedTeam() {
    var randomTeamName = nbaTeams[[Math.floor(Math.random() * nbaTeams.length)]];
    return randomTeamName;
}

//using HTML id's to set game stats
function displayStats(){
    document.getElementById("guessedLetters").textContent = lettersGuessed;
    document.getElementById("totalWins").textContent = wins;
    document.getElementById("totalLosses").textcontent = losses;
    document.getElementById("selectedTeamNameDisplay").textContent = teamNameSelected;
    document.getElementById("guessesRemaining").textContent = guessesRemaining;
}

//team name displayed using _'s
function  answerArray(){
    for (var i = 0; i < teamNameSelected.length; i++){
        teamNameDisplay = teamNameDisplay + " _ ";
        wordDiv.textContent = teamNameDisplay;
    }
}

//game reset if player wins/next round/ next word
function nextWordGuess(){
    document.getElementById("lastWord").innerHTML = "<h2> Previous Team Name:" + teamNameSelected + "</h2>";
    teamNameDisplay = "";
    teamNameSelected = selectedTeam();
    answerArray();
    guessesRemaining = 10;
    lettersGuessed = [];
}

//replace game stats
function setCharAt(str, index, chr){
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

//call fucntion to create game stats
displayStats();

//game start
answerArray();

//starts game when any key is pressed
document.onkeyup = function (event) {
    var userLetterGuess = event.key;

    userLetterGuess = userLetterGuess.toLowerCase();
    if (userLetterGuess.match(/[a-z]/i) && userLetterGuess.length == 1) {
        if(!lettersGuessed.includes(userLetterGuess)) {
            if(teamNameSelected.includes(userLetterGuess)) {
                for(var i = 0; i < teamNameSelected.length; i++){
                    if (userLetterGuess === teamNameSelected.charAt(i)) {
                        teamNameDisplay = setCharAt(teamNameDisplay, i, userLetterGuess);
                        wordDiv.textContent = teamNameDisplay;
                    }
                }
            }    
            guessesRemaining--;
            lettersGuessed.push(userLetterGuess);
            console.log(lettersGuessed);
        }
    }
   if (teamNameDisplay === teamNameSelected){
       wins++;
       nextWordGuess();
   } 
   else if (guessesRemaining === 0){
       losses++;
        nextWordGuess();
   }
   
   displayStats();

}

