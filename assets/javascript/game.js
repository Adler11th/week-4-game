//Class Declaration
//=================

class Hero {
    constructor(Name, url, HP, Attk, CAttk) {
        this.name = Name;
        this.url = url;
        this.health = HP;
        this.attack = Attk;
        this.counterAttack = CAttk;
        this.selected = false;
        this.available = true;
    }
}

//Global Variables
//================

var GAMEWON = false;
var PLAYERHERO = new Hero;
var ENEMYHERO = new Hero;

//Function Declaration
//====================

function displayHeroPull(objectHolder) {
    for (var key in objectHolder) {
        var elementID = objectHolder[key].name;
        $(".hero_pull").append("<div class = hero-card id = " + elementID + "><img src =" + objectHolder[key].url + "></div>");
        var tempID = "#" + elementID;
        $(tempID).append("<h3 class = 'display_HP'>" + objectHolder[key].health + " HP</h3>");
    }
}

function displayEnemyHero(object) {
    var elementClass = ".hero_pull" + " #" + object.name;
    $(elementClass).remove();
    $(".enemy_hero div").remove();
    $(".enemy_hero").append("<div class = hero-card id = " + object.name + "><img src =" + object.url + "></div>");
    var tempID = "#" + object.name;
    $(tempID).append("<h3 class = 'display_HP'>" + object.health + " HP</h3>");
}

function displayPlayerHero(object) {
    var elementClass = ".hero_pull" + " #" + object.name;
    $(elementClass).remove();
    var tempID = "#" + object.name;
    $(tempID).remove();
    $(".player_hero").append("<div class = hero-card id = " + object.name + "><img src =" + object.url + "></div>");
    $(tempID).append("<h3 class = 'display_HP'>" + object.health + " HP</h3>");
}

function playerSelectHero(object, name) {
    object[name].selected = true;
    object[name].available = false;
    return object[name];
}
function enemySelectHero(objectHolder) {
    for (var key in objectHolder) {
        if (objectHolder[key].available === true) {
            objectHolder[key].available = false;
            return objectHolder[key];
        }
    }
    GAMEWON = true;
    return objectHolder[key];
}
//Main
//====

$(document).ready(function () {

    $(".btn").hide();
    
    var Heroes = {
        "Vampire": new Hero("Vampire", "assets/img/vampire.png", 100, 8, 8),
        "Archer": new Hero("Archer", "assets/img/archer.png", 90, 10, 10),
        "Defender": new Hero("Defender", "assets/img/defender.png", 130, 5, 5),
        "Mage": new Hero("Mage", "assets/img/mage.png", 80, 8, 10)
    };

    displayHeroPull(Heroes);


    //player pick a character once
    $(".hero-card").on("click", function () {

        PLAYERHERO = playerSelectHero(Heroes, this.id);

        displayPlayerHero(PLAYERHERO);

        ENEMYHERO = enemySelectHero(Heroes);

        displayEnemyHero(ENEMYHERO);

        $(".hero-card").off("click");
        $(this).css("border", "1px solid transparent");
        $(".hero-card").off("mouseenter mouseleave");
        $(".btn").show();
    })

    $(".hero-card").hover(
        function () {
            $(this).css("border", "1px solid #fd2856");
        }, function () {
            $(this).css("border", "1px solid transparent");
        })

    $("#attack").on("click", function () {
        if (!GAMEWON) {
            if (ENEMYHERO.health > PLAYERHERO.attack) {
                if (PLAYERHERO.health > ENEMYHERO.counterAttack) {
                    ENEMYHERO.health -= PLAYERHERO.attack;
                    PLAYERHERO.health -= ENEMYHERO.counterAttack;
                    PLAYERHERO.attack += 5;
                    displayPlayerHero(PLAYERHERO);
                    displayEnemyHero(ENEMYHERO);
                } else {
                    alert("You lost!");
                }
            }else{
                ENEMYHERO = enemySelectHero(Heroes)
                displayEnemyHero(ENEMYHERO);
            }
        }else{
            alert("You Won!");
        }
    })
    $("#reset").on("click", function(){
        window.location.reload();
    })

})