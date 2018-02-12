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
        "Archer": new Hero("Archer", "assets/img/archer.png", 70, 2, 10),
        "Defender": new Hero("Defender", "assets/img/defender.png", 130, 5, 5),
        "Mage": new Hero("Mage", "assets/img/mage.png", 80, 8, 10)
    };

    var PLAYERHERO = new Hero;
    var ENEMYHERO = new Hero;

    GAMEWON = false;

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
        var tempID = "#" + object.name;
        $(elementClass).remove();
        $(".enemy_hero h2").remove();
        $(".enemy_hero div").remove();
        $(".enemy_hero").prepend("<h2>Enemy: " + object.name + "</h2><div class = hero-card id = " + object.name + "><img src =" + object.url + "></div>");
        $(tempID).append("<h3 class = 'display_HP'>" + object.health + " HP</h3>");
    }

    function displayPlayerHero(object) {
        var elementClass = ".hero_pull" + " #" + object.name;
        var tempID = "#" + object.name;
        $(elementClass).remove();
        $(tempID).remove();
        $(".player_hero h2").remove();
        $(".player_hero div").remove();
        $(".player_hero").prepend("<h2>Hero: " + object.name + "</h2><div class = hero-card id = " + object.name + "><img src =" + object.url + "></div>");
        $(tempID).append("<h3 class = 'display_HP'>" + object.health + " HP</h3>");
    }

    function playerSelectHero(objectHolder, key) {
        objectHolder[key].available = false;
        return objectHolder[key];
    }

    function enemySelectHero(objectHolder) {
        for (var key in objectHolder) {
            if (objectHolder[key].available === true) {
                objectHolder[key].available = false;
                return objectHolder[key];
            }
        }
        GAMEWON = true;
        return null;
    }

    function startGame(Heroes, id) {

        $("#main").show();
        $(".btn").show();

        Object.assign(PLAYERHERO, playerSelectHero(Heroes, id));

        displayPlayerHero(PLAYERHERO);

        Object.assign(ENEMYHERO, enemySelectHero(Heroes));

        displayEnemyHero(ENEMYHERO);

        $(".hero-card").off("click");
        $(".hero-card").css("border", "1px solid transparent");
        $(".hero-card").off("mouseenter mouseleave");

    }

    function reset() {
        GAMEWON = false;

        $(".btn").hide();

        $("#main").hide();

        for (var key in Heroes) {
            Heroes[key].available = true;
        }

        $(".hero_pull div").remove();

        displayHeroPull(Heroes);

        $(".hero-card").on("click", function () {
            startGame(Heroes, this.id);
        });

        $(".hero-card").hover(function () {
            $(this).css("border", "1px solid #fd2856");
        }, function () {
            $(this).css("border", "1px solid transparent");
        });
    }

    //Main
    //====

    reset();

    $("#attack").on("click", function () {
        try {
            if (ENEMYHERO.health > PLAYERHERO.attack) {
                if (PLAYERHERO.health > ENEMYHERO.counterAttack) {
                    ENEMYHERO.health -= PLAYERHERO.attack;
                    PLAYERHERO.health -= ENEMYHERO.counterAttack;
                    PLAYERHERO.attack += 5;
                    displayPlayerHero(PLAYERHERO);
                    displayEnemyHero(ENEMYHERO);
                } else {
                    alert("You lost!");
                    reset();
                }
            } else {
                Object.assign(ENEMYHERO, enemySelectHero(Heroes));
                displayEnemyHero(ENEMYHERO);

                if (GAMEWON) {
                    alert("You Won!");
                    reset();
                }
            }
        }
        catch (error) {
            alert("Ooops, something went wrong")
        }
    })


    $("#reset").on("click", function () {
        reset();
    })

})