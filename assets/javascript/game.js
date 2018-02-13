$(document).ready(function () {
    //Class Declaration
    //=================

    class Hero {
        constructor(Name, url, HP, Attk, CAttk) {
            this.name = Name;
            this.url = url;
            this.health = HP;
            this.attack = Attk;
            this.counterAttack = CAttk;
            this.available = true;
        }
    }

    //Global Variables
    //================
    var Heroes = {
        "Vampire": new Hero("Vampire", "assets/img/vampire.png", 100, 8, 8),
        "Archer": new Hero("Archer", "assets/img/archer.png", 90, 2, 10),
        "Defender": new Hero("Defender", "assets/img/defender.png", 130, 5, 5),
        "Mage": new Hero("Mage", "assets/img/mage.png", 80, 8, 10)
    };

    var PLAYERHERO = new Hero;
    var ENEMYHERO = new Hero;

    GAMEWON = false;
    GAMESTARTED = false;

    //Function Declaration
    //====================

    function displayHeroPull(objectHolder) {
        for (var key in objectHolder) {
            $(".hero_pull").append("<div class = hero-card id = " + objectHolder[key].name + "><img src =" + objectHolder[key].url + "></div>");
            var selectorNewCardId = "#" + objectHolder[key].name;
            $(selectorNewCardId).append("<h3 class = 'display_HP'>" + objectHolder[key].health + " HP</h3>");
        }
    }

    function displayHero(object, nodeClass) {

        var selectorHeroPullCard = ".hero_pull "+ "#"+object.name;
        var selectorOldCard = nodeClass + " div";
        var selectorNewCardId = "#" + object.name;

        $(selectorHeroPullCard).remove();
        $(selectorOldCard).remove();
        $(nodeClass).prepend("<div class= chosen_card id = " + object.name + "><img src =" + object.url + "></div>");
        $(selectorNewCardId).append("<h3 class = 'display_HP'>" + object.health + " HP</h3>");
    }

    function selectHero(objectHolder, key) {
        console.log(objectHolder[key]);
        objectHolder[key].available = false;
        return objectHolder[key];
    }

    function checkIfAvailable(){
        for(var key in Heroes){
            if(Heroes[key].available === true){
                console.log("Heroes available");
                return true;
            }
        }
        console.log("Heroes not available");
        return false;
    }

    function startRound(Heroes) {
        $(".enemy_hero div").remove();
        $(".hero-card").hover(function () {
            $(this).css("border", "1px solid #fd2856");
        }, function () {
            $(this).css("border", "1px solid transparent");
        });

        $(".hero-card").on("click.round", function () {
            $("#main").show();
            $(".btn").show();
            if (!GAMESTARTED) {
                Object.assign(PLAYERHERO, selectHero(Heroes, this.id));
                displayHero(PLAYERHERO, ".player_hero");
                GAMESTARTED = true;
                $("#dialog").text("Pick enemy!");
            } else {
                Object.assign(ENEMYHERO, selectHero(Heroes, this.id));
                displayHero(ENEMYHERO, ".enemy_hero");
                $(".hero-card").off("click,round");
                $(".hero-card").css("border", "1px solid transparent");
                $(".hero-card").off("mouseenter mouseleave");
                $("#dialog").text("Attack!");
                fight();
            }
        })
    }

    function fight(){

        $("#attack").on("click", function () {
            if (PLAYERHERO.health > ENEMYHERO.counterAttack) {
                if (ENEMYHERO.health > PLAYERHERO.attack) {
                    ENEMYHERO.health -= PLAYERHERO.attack;
                    PLAYERHERO.health -= ENEMYHERO.counterAttack;
                    PLAYERHERO.attack += Heroes[PLAYERHERO.name].attack;
                    displayHero(PLAYERHERO, ".player_hero");
                    displayHero(ENEMYHERO, ".enemy_hero");
                }else{
                    if(checkIfAvailable()){
                        $("#dialog").text("Enemy defeated, pick another hero.");
                        $("#attack").off("click");
                        startRound();
                    }else{
                        $("#dialog").text("You won!");
                        $("#attack").off("click");
                        alert("You Won!");
                        reset();
                    }
                }
    
            } else {
                $("#attack").off("click");
                alert("You lost!");
                reset();
            }
    
        })
    }

    function reset() {

        GAMEWON = false;

        GAMESTARTED = false;

        $("#dialog").text("Pick your hero!");

        $(".btn").hide();

        $("#main").hide();

        for (var key in Heroes) {
            Heroes[key].available = true;
        }

        $(".hero_pull div").remove();

        displayHeroPull(Heroes);


        startRound(Heroes);
    }
    //Main
    //====

    reset();

    $("#reset").on("click", function () {
        reset();
    })

})