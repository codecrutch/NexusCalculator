var player = {
  vita: 0,
  mana: 0,
  ac: 0,
  might: 0,
  will: 0,
  grace: 0,
  manaMultiplier: 0,
  vitaMultiplier: 0,
  mightMultiplier: 0,
  willMultiplier: 0,
  graceMultiplier: 0,
  spell: "",
  damageDealt: 0,
  damagePercent: 0,
  damageReal: 0,
  curse: 50,
};


$(document).ready(function() { 

  setVita(2043000);
  setMana(2292000);

  $("input").on('input', function() {
    getStats();
    calculateDamage();
  });

  
});

function spell(spellname) {
    switch(player.spell) {
        case("Hellfire"):
          player.manaMultiplier = 1.8;
          player.vitaMultiplier = 0;
        break;
        case("Sam Hellfire"):
          player.manaMultiplier = 2.5;
          player.vitaMultiplier = 0;
        break;
        case("Inferno"):
          player.manaMultiplier = 1.5;
          player.vitaMultiplier = 0;
        break;
        case("Sa Hellfire"):
          player.manaMultiplier = 2;
          player.vitaMultiplier = 0.5;
        break;
        case("Slash"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 0.0245;
          mightMultiplier = 11.435
        break;
        case("Beserk"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 0.75;
        break;
        case("Feral Beserk"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 0.85;
        break;
        case("Whirlwind"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 1.575;
        break;
        case("Whirlwind (Kwi-sin)"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 1.75;
        break;
        case("Assault"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 0.5;
        break;
        case("Karak"):
          player.manaMultiplier = 0.5;
          player.vitaMultiplier = 1.875;
        break;
        case("Warrior Sa"):
          player.manaMultiplier = 0.1;
          player.vitaMultiplier = 0.4875;
        break;
        case("Rend"):
          player.manaMultiplier = 2;
          player.vitaMultiplier = 2;
        break;
        case("Townie"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 3;
        break;
        case("Desperate Attack"):
          player.manaMultiplier = 1;
          player.vitaMultiplier = 1;
        break;
        case("No Mana DA"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 1;
        break;
        case("Lethal Strike"):
          player.manaMultiplier = 0.5;
          player.vitaMultiplier = 2.5;
        break;
        case("Sam Kae"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 2;
        break;
        case("Rogue Sa"):
          player.manaMultiplier = 0.45;
          player.vitaMultiplier = 1.8;
        break;
        case("Assassinate"):                    // NEEDS CORRECT FORMULA
          player.manaMultiplier = 0.5;          //
          player.vitaMultiplier = 1.65;         //
        break;
        case("Retribution"):
          player.manaMultiplier = 0.34;
          player.vitaMultiplier = 0;
        break;
        case("Son-Kal"):
          player.manaMultiplier = 0;
          player.vitaMultiplier = 0.0245;
          mightMultiplier = 11.435
        break;
      }
  }

function getStats() {
  getVita();
  getMana();
  getAC();
  getMight();
  getWill();
  getGrace();
  spell(player.spell);
}

function resetMultipliers() {
  player.mightMultiplier = 0;
  player.willMultiplier = 0;
  player.graceMultiplier = 0;
  player.vitaMultiplier = 0;
  player.manaMultiplier = 0;
}

function getVita() {
  player.vita = $("#charVita").val();
}

function getMana() {
  player.mana = $("#charMana").val();
}

function getAC() {
  player.ac = $("#charAC").val();
}
function getWill() {
  player.might = $("#charMight").val();
}
function getMight() {
  player.will = $("#charWill").val();
}
function getGrace() {
  player.grace = $("#charGrace").val();
}
function setVita(number) {
  player.vita = number;
  $("#charVita").val(number);
  //alert(player.vita);
}

function setMana(number) {
  player.mana = number;
  $("#charMana").val(number);
}

function setAC(number) {
  player.ac = number;
  $("#charAC").val(number);
}

function setSpellGraphic(source) {
  $("#spellCasted").attr("src", source);
}

function removeCreatures() {
  $("#creatures").empty();
}

function creatureDamageOutput(creature_vita, ac, curse) {

  //console.log("Creature vita = " + creature_vita + " and player damage = " + player.damageDealt + " Health left = " + (creature_vita - player.damageDealt));
  var health_left = creature_vita - damageReduction(ac,curse,1);

  if(health_left > 0) {
    player.damagePercent = ((health_left / creature_vita) * 100).toFixed(2);
    return health_left;
  } else {
    player.damagePercent = 0;
    return 0;
  }
}

function outputCreatureDamage() {
  if($("#cave").text() == "") { 
  } else {
    $.each($(".creaturevita"), function(index, value) {
        //creatureDamageOutput($(value).text(),-76,0);
        var elCreatureAC = $(".creatureac").get(index);
        $(value).after("<p class='damage-dealt'>Vita Left:</br>" + creatureDamageOutput($(value).text(),Number($(elCreatureAC).text()), Number(player.curse)) + "<br>-------------<br>" + $(value).text() + "</p>");
        $(value).after("<p class='damage-dealt'>Damage: " + player.damageReal + "</p>");
        var color_percent = "width:" + player.damagePercent + "%;"

        if(player.damagePercent > 55) {
           $("#creature-percent-" + index).removeClass()
           $("#creature-percent-" + index).addClass("progress-bar creature-health-text creature-health-bar progress-bar-success")
        }
        if(player.damagePercent < 55 && player.damagePercent > 27) {
          $("#creature-percent-" + index).removeClass()
           $("#creature-percent-" + index).addClass("progress-bar creature-health-text progress-bar-warning")
        }
        if(player.damagePercent < 27) {
          $("#creature-percent-" + index).removeClass()
           $("#creature-percent-" + index).addClass("progress-bar creature-health-text progress-bar-danger")
        }
        var el = "#creature-percent-" + index;

        $(el).attr({"style" : color_percent, "aria-valuenow": color_percent});
        $(el).text(player.damagePercent + "%");


    })
  }
}

function deleteDamageDealt() {
  $.each($(".damage-dealt"), function(index, value) {
    $(value).remove();
  })

}

function calculateDamage() {
  player.damageDealt = Math.ceil((player.vita * player.vitaMultiplier) + (player.mana * player.manaMultiplier) +
   (player.might * player.mightMultiplier) + (player.will * player.willMultiplier) + (player.grace * player.graceMultiplier))
  $("#damageOutput").text(player.damageDealt);
  deleteDamageDealt(); // Delete output from last selection, will be run in OutputCreatureDamage next
  outputCreatureDamage();
}

function damageReduction(creature_ac, curse, doze) {
  var damageAtZeroAC = player.damageDealt;
  var realDamage = damageAtZeroAC * (1 + ((creature_ac + curse)/100.0)) * doze
  console.log(realDamage);
  player.damageReal = realDamage;
  return realDamage;
}