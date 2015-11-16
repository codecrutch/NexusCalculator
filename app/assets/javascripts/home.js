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
};


$(document).ready(function() { 

  setVita(1245000);
  setMana(2241323);

  $("input").on('input', function() {

    getStats();
    
    

    if($("button#mage-spell-title:contains('Mage')").length > 0) { 
    // check to see if no spell was selected
    } else {
      getStats();
      calculateDamage();
    }

    if($("button#warrior-spell-title:contains('Warrior')").length > 0) {

    } else {
      getStats();
      calculateDamage();
    }

    if($("button#rogue-spell-title:contains('Rogue')").length > 0) {

    } else {
      getStats();
      calculateDamage();
    }
    if($("button#poet-spell-title:contains('Poet')").length > 0) {

    } else {
      getStats();
      calculateDamage();
    }
    /*alert("Players stats are:\nVita: " + player["vita"] +
      "\nMana: " + player["mana"] +
      "\nAC: " + player["ac"]);
    */
  });

  $("#mage-spell-dropdown li a").click(function() {

    getStats();

    $("button#mage-spell-title").text(this.innerHTML);
    player.spell = this.innerHTML;
    resetMultipliers();
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
    }
    calculateDamage();
  });

  $("#warrior-spell-dropdown li a").click(function() {

    getStats();

    $("button#warrior-spell-title").text(this.innerHTML);
    player.spell = this.innerHTML;
    resetMultipliers();
    switch(player.spell) {
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
    }
    calculateDamage();
  });

  $("#rogue-spell-dropdown li a").click(function() {

    getStats();

    $("button#rogue-spell-title").text(this.innerHTML);
    player.spell = this.innerHTML;
    resetMultipliers();
    switch(player.spell) {
        case("Desperate Attack"):
          player.manaMultiplier = 1;
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
          player.manaMultiplier = 0.5;
          player.vitaMultiplier = 1.65;
        break;
    }
    calculateDamage();
  });

  $("#poet-spell-dropdown li a").click(function() {

    getStats();

    $("button#poet-spell-title").text(this.innerHTML);
    player.spell = this.innerHTML;
    resetMultipliers();
    switch(player.spell) {
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
    calculateDamage();
  });
});

function getStats() {
  getVita();
  getMana();
  getAC();
  getMight();
  getWill();
  getGrace();
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

function creatureDamageOutput(creature_vita) {

  //console.log("Creature vita = " + creature_vita + " and player damage = " + player.damageDealt + " Health left = " + (creature_vita - player.damageDealt));
  var health_left = creature_vita - player.damageDealt;

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
        creatureDamageOutput($(value).text());
        //$(value).after("<p class='damage-dealt'>Vita Left:</br>" + creatureDamageOutput($(value).text()) + "<br>-------------<br>" + $(value).text() + "</p>");
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
  deleteDamageDealt();
  outputCreatureDamage();
}