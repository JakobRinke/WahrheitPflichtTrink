var playerList = []




const PlayerDisplay = document.getElementById("PlayerDisplay")
const PlayerPrefab = '<li class="Spieler" onclick="removePlayer(this.innerHTML)">[NAME]</li>'

function updatePlayerDisplay()
{
    out = ""
    playerList.forEach(name => out+=PlayerPrefab.replace(/\[NAME\]/, name));
    PlayerDisplay.innerHTML = out;
}

AddPlayerInput = document.getElementById("AddPlayerInput")
function addPlayer()
{
    if(!playerList.includes(AddPlayerInput.value) && AddPlayerInput.value!="")
    {
        playerList.push(AddPlayerInput.value);
        updatePlayerDisplay();
    }
    AddPlayerInput.value="";
}

function removePlayer(player)
{
    var index = playerList.indexOf(player);
    if (index !== -1) {
        playerList.splice(index, 1);
        updatePlayerDisplay();
    }
}

const lobby = document.getElementById("lobby")
function startGame()
{
    if (playerList.length < 2)
    {
        return;
    }
    lobby.style.marginLeft="-300vw";
    loadCard();
    setTimeout(function(){
        lobby.style.visibility = "hidden";
        lobby.style.position = "absolute";
    }, 600);
    
}


const cardPrefab = '<div class="card" id="card" onclick="next()">[AUFGABE]</div>'
const cardContainer = document.getElementById("CardContainer")
function loadCard()
{
    cardContainer.innerHTML = cardPrefab.replace(/\[AUFGABE\]/, getAufgabe());
    setTimeout(function(){
        document.getElementById("card").style.marginLeft="0vw";

    }, 300);
}


Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
function getAufgabe()
{
    var aufgabe = aufgaben[Math.floor(Math.random() * aufgaben.length)];
    var p1 = Math.floor(Math.random() * (playerList.length));
    var p2 = p1;
    while (p1==p2)
    {
        console.log(p2);
        p2 = Math.floor(Math.random() * (playerList.length));
    }
    return aufgabe.replace(/\[1\]/, playerList[p1]).replace(/\[2\]/, playerList[p2]);
}

function next()
{
    document.getElementById("card").style.marginLeft="-150vw";
    
    setTimeout(function(){
        loadCard();
    }, 600);
}