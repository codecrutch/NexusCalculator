var player = {
  vita: 0,
  mana: 0,
  ac: 0,
  might: 0,
  will: 0,
  grace: 0,
  getStats: function() {
    player.getVita();
    player.getMana();
    player.getAC();
    player.getMight();
    player.getWill();
    player.getGrace();
    spell.getSpell(spell.name);
  },
  resetMultipliers: function() {
    player.mightMultiplier = 0;
    player.willMultiplier = 0;
    player.graceMultiplier = 0;
    player.vitaMultiplier = 0;
    player.manaMultiplier = 0;
  },

  getVita: function() {
    player.vita = $("#charVita").val();
  },

  getMana: function() {
    player.mana = $("#charMana").val();
  },

  getAC: function() {
    player.ac = $("#charAC").val();
  },
  getWill: function() {
    player.might = $("#charMight").val();
  },
  getMight: function() {
    player.will = $("#charWill").val();
  },
  getGrace: function() {
    player.grace = $("#charGrace").val();
  },
  setVita: function(number) {
    player.vita = number;
    $("#charVita").val(number);
    //alert(player.vita);
  },

  setMana: function(number) {
    player.mana = number;
    $("#charMana").val(number);
  },

  setAC: function(number) {
    player.ac = number;
    $("#charAC").val(number);
  },
};

var spell = {
  manaMultiplier: 0,
  vitaMultiplier: 0,
  mightMultiplier: 0,
  willMultiplier: 0,
  graceMultiplier: 0,
  name: "",
  damageDealt: 0,
  damagePercent: 0,
  damageReal: 0,
  setSpellGraphic: function(source) {
   $("#spellCasted").attr("src", source);
  },
  deleteDamageDealt: function() {
    $.each($(".damage-dealt"), function(index, value) {
      $(value).remove();
    })

  },
  calculateDamage: function() {
    spell.damageDealt = Math.ceil((player.vita * spell.vitaMultiplier) + (player.mana * spell.manaMultiplier) +
     (player.might * spell.mightMultiplier) + (player.will * spell.willMultiplier) + (player.grace * spell.graceMultiplier))
    $("#damageOutput").text(spell.damageDealt);
    spell.deleteDamageDealt(); // Delete output from last selection, will be run in OutputCreatureDamage next
    outputCreatureDamage();
  },
  damageReduction: function(creature_ac, curse, doze) {
    var damageAtZeroAC = spell.damageDealt;
    var realDamage = damageAtZeroAC * (1 + ((creature_ac + curse)/100.0)) * doze
    console.log(realDamage);
    spell.damageReal = realDamage;
    return realDamage;
  },
  getSpell: function(spellname) {
    switch(spell.name) {
        case("Hellfire"):
          spell.manaMultiplier = 1.8;
          spell.vitaMultiplier = 0;
        break;
        case("Sam Hellfire"):
          spell.manaMultiplier = 2.5;
          spell.vitaMultiplier = 0;
        break;
        case("Inferno"):
          spell.manaMultiplier = 1.5;
          spell.vitaMultiplier = 0;
        break;
        case("Sa Hellfire"):
          spell.manaMultiplier = 2;
          spell.vitaMultiplier = 0.5;
        break;
        case("Slash"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 0.0245;
          spell.mightMultiplier = 11.435
        break;
        case("Beserk"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 0.75;
        break;
        case("Feral Beserk"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 0.85;
        break;
        case("Whirlwind"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 1.575;
        break;
        case("Whirlwind (Kwi-sin)"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 1.75;
        break;
        case("Assault"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 0.5;
        break;
        case("Karak"):
          spell.manaMultiplier = 0.5;
          spell.vitaMultiplier = 1.875;
        break;
        case("Warrior Sa"):
          spell.manaMultiplier = 0.1;
          spell.vitaMultiplier = 0.4875;
        break;
        case("Rend"):
          spell.manaMultiplier = 2;
          spell.vitaMultiplier = 2;
        break;
        case("Townie"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 3;
        break;
        case("Desperate Attack"):
          spell.manaMultiplier = 1;
          spell.vitaMultiplier = 1;
        break;
        case("No Mana DA"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 1;
        break;
        case("Lethal Strike"):
          spell.manaMultiplier = 0.5;
          spell.vitaMultiplier = 2.5;
        break;
        case("Sam Kae"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 2;
        break;
        case("Rogue Sa"):
          spell.manaMultiplier = 0.45;
          spell.vitaMultiplier = 1.8;
        break;
        case("Assassinate"):                    // NEEDS CORRECT FORMULA
          spell.manaMultiplier = 0.5;          //
          spell.vitaMultiplier = 1.65;         //
        break;
        case("Retribution"):
          spell.manaMultiplier = 0.34;
          spell.vitaMultiplier = 0;
        break;
        case("Son-Kal"):
          spell.manaMultiplier = 0;
          spell.vitaMultiplier = 0.0245;
          spell.mightMultiplier = 11.435
        break;
      }
  },
};

var creature = {
  name: "",
  vita: 0,
  ac: 0,
  curse: 50,
  sleep: 1,
}


$(document).ready(function() { 

  player.setVita(2043000);
  player.setMana(2292000);

  $("input").on('input', function() {
    player.getStats();
    spell.calculateDamage();
  });

  
});





function removeCreatures() {
  $("#creatures").empty();
}

function creatureDamageOutput(creature_vita, ac, curse) {

  //console.log("Creature vita = " + creature_vita + " and player damage = " + player.damageDealt + " Health left = " + (creature_vita - player.damageDealt));
  var health_left = creature_vita - spell.damageReduction(ac, curse,creature.sleep);

  if(health_left > 0) {
    spell.damagePercent = ((health_left / creature_vita) * 100).toFixed(2);
    return health_left;
  } else {
    spell.damagePercent = 0;
    return 0;
  }
}
function outputCreatureDamage() {
  if($("#cave").text() == "") { 
  } else {
    $.each($(".creaturevita"), function(index, value) {
        //creatureDamageOutput($(value).text(),-76,0);
        var elCreatureAC = $(".creatureac").get(index);
        creature.vita = Number($(value).text());
        creature.ac = Number($(elCreatureAC).text());
        $(value).after("<p class='damage-dealt'>Vita Left:</br>" + creatureDamageOutput(creature.vita,creature.ac, creature.curse) + "<br>-------------<br>" + $(value).text() + "</p>");
        $(value).after("<p class='damage-dealt'>Damage: " + spell.damageReal.toFixed(2) + "</p>");
        var color_percent = "width:" + spell.damagePercent + "%;"

        if(spell.damagePercent > 55) {
           $("#creature-percent-" + index).removeClass()
           $("#creature-percent-" + index).addClass("progress-bar creature-health-text creature-health-bar progress-bar-success")
        }
        if(spell.damagePercent < 55 && spell.damagePercent > 27) {
          $("#creature-percent-" + index).removeClass()
           $("#creature-percent-" + index).addClass("progress-bar creature-health-text progress-bar-warning")
        }
        if(spell.damagePercent < 27) {
          $("#creature-percent-" + index).removeClass()
           $("#creature-percent-" + index).addClass("progress-bar creature-health-text progress-bar-danger")
        }
        var el = "#creature-percent-" + index;

        $(el).attr({"style" : color_percent, "aria-valuenow": color_percent});
        $(el).text(spell.damagePercent + "%");


    })
  }
}

