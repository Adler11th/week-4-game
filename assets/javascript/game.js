class Hero{
    health;
    attack;
    counterAttack;
    constructor(url, HP, Attk, CAttk){
        $(".hero_pull").append("<div class = hero><img src = '"+url+"'><div class = 'HP'></div></div>" );
        health = HP;
        attack = Attk;
        counterAttack = CAttk;
    }


}
$(document).ready(function(){
    var Vampire = new Hero()

})