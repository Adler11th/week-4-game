$(document).ready(function() {
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
    Vampire: new Hero("Vampire", "assets/img/vampire.png", 100, 5, 9),
    Archer: new Hero("Archer", "assets/img/archer.png", 90, 6, 9),
    Defender: new Hero("Defender", "assets/img/defender.png", 120, 3, 13),
    Mage: new Hero("Mage", "assets/img/mage.png", 80, 7, 11),
  };

  var PLAYERHERO = new Hero();
  var ENEMYHERO = new Hero();

  GAMESTARTED = false;

  //Function Declaration
  //====================

  function displayHeroPull(objectHolder) {
    for (var key in objectHolder) {
      var selectorNewCardId = "#" + objectHolder[key].name;

      $(".hero_pull").append(
        `<div
          class ="hero-card"
          id ="${objectHolder[key].name}">
          <img src ="${objectHolder[key].url}">
        </div>`
      );

      $(selectorNewCardId).append(
        `<h3 class = 'display_HP'>${objectHolder[key].health}HP</h3>`
      );

      $(selectorNewCardId).append(
        `<h3 class = 'display_name'>${objectHolder[key].name}</h3>`
      );
    }
  }

  function displayLoserPull(object) {
    var selectorNewCardId = "#" + object.name;
    $(".enemy_hero div").remove();

    $(".loser_pull").append(
      `<div
        class="loser_card"
        id ="${object.name}">
        <img src ="${object.url}">
      </div>`
    );

    $(selectorNewCardId).append(
      `<h3 class = 'display_name'>${object.name}</h3>`
    );
  }

  function displayHero(object, nodeClass) {
    //selectors
    var selectorHeroPullCard = ".hero_pull " + "#" + object.name;
    var selectorOldCard = nodeClass + " div";
    var selectorNewCardId = "#" + object.name;
    //clean up
    $(selectorHeroPullCard).remove();
    $(selectorOldCard).remove();

    $(nodeClass).prepend(
      `<div class="chosen_card" id ="${object.name}">
        <img src ="${object.url}">
      </div>`
    );

    $(selectorNewCardId).append(
      `<h3 class = 'display_HP'>${object.health}HP</h3>`
    );

    $(selectorNewCardId).append(
      `<h3 class = 'display_name'>${object.name}</h3>`
    );
  }

  function selectHero(objectHolder, key) {
    objectHolder[key].available = false;
    return objectHolder[key];
  }

  function checkIfAvailable() {
    for (var key in Heroes) {
      if (Heroes[key].available === true) {
        return true;
      }
    }
    return false;
  }

  function startRound() {
    $(".enemy_hero div").remove();

    $(".hero-card").hover(
      function() {
        $(this).css("box-shadow", "0 0 10px 5px #fd2856");
      },
      function() {
        $(this).css("box-shadow", "0 0 0 0 #fd2856");
      }
    );

    $(".hero-card").on("click.round", function() {
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
        $("#dialog").text("Attack!");
        $(".hero-card").off("click.round");
        $(".hero-card").off("mouseenter mouseleave");
        fight();
      }
    });
  }

  function fight() {
    $("#attack").on("click", function() {
      if (ENEMYHERO.health > PLAYERHERO.attack) {
        if (PLAYERHERO.health > ENEMYHERO.counterAttack) {
          ENEMYHERO.health -= PLAYERHERO.attack;
          PLAYERHERO.health -= ENEMYHERO.counterAttack;
          PLAYERHERO.attack += Heroes[PLAYERHERO.name].attack;
          displayHero(PLAYERHERO, ".player_hero");
          displayHero(ENEMYHERO, ".enemy_hero");
        } else {
          $("#attack").off("click");
          alert("You lost!");
          reset();
          startRound();
        }
      } else {
        $(".loser_pull").show();
        displayLoserPull(ENEMYHERO);
        if (checkIfAvailable()) {
          $("#dialog").text("Enemy defeated, pick another hero.");
          $("#attack").off("click");
          startRound();
        } else {
          $("#dialog").text("You won!");
          $("#attack").off("click");
          alert("You Won!");
          reset();
          startRound();
        }
      }
    });
  }

  function reset() {
    GAMESTARTED = false;
    $("#attack").off("click");
    $("#dialog").text("Pick your hero!");
    $(".btn").hide();
    $("#main").hide();
    $(".loser_pull div").remove();
    $(".loser_pull").hide();

    for (var key in Heroes) {
      Heroes[key].available = true;
    }

    $(".hero_pull div").remove();
    displayHeroPull(Heroes);
  }
  //Main
  //====
  reset();
  startRound();

  $("#reset").on("click", function() {
    reset();
    startRound();
  });
});
