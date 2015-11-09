var player = {
  vita: 0,
  mana: 0,
  ac: 0,
  spell: ""
};

$(document).ready(function() {
  $("#member").css({"color":"red", "padding": "20px 20px 20px 20px"});  

  setVita(1245000);
  setMana(2241323);

  var manaMultiplier = 0;
  var vitaMultiplier = 0;

  $("input").on('input', function(e) {
    getStats();

    if($("button#spellTitle:contains('Spells')").length > 0) { 
    // check to see if no spell was selected
    } else {
      getStats();
      $("#damageOutput").text(Math.ceil((player.vita * vitaMultiplier) + (player.mana * manaMultiplier)));
    };
    /*alert("Players stats are:\nVita: " + player["vita"] +
      "\nMana: " + player["mana"] +
      "\nAC: " + player["ac"]); */
  });


  $("#caves li a").click(function(e) {
    $("#cave").text(this.innerHTML);
    AJAXloadCave(this.innerHTML);
  });

  $("#spells li a").click(function(e) {

    getStats();

    $("button#spellTitle").text(this.innerHTML);
    player.spell = this.innerHTML;
    
    switch(player.spell) {
        case("Hellfire"):
          manaMultiplier = 1.8;
          vitaMultiplier = 0;
        break;
        case("Sam Hellfire"):
          manaMultiplier = 2.5;
          vitaMultiplier = 0;
        break;
        case("Inferno"):
          manaMultiplier = 1.5;
          vitaMultiplier = 0;
        break;
        case("Sa Hellfire"):
          manaMultiplier = 2;
          vitaMultiplier = 0.5;
        break;
    }
    $("#damageOutput").text(Math.ceil((player.vita * vitaMultiplier) + (player.mana * manaMultiplier)));
    setSpellGraphic("http://www.nexusatlas.com/photo/spells60/ohaenghf.gif");
  });

});

function getStats() {
  getVita();
  getMana();
  getAC();
};

function getVita() {
  player.vita = $("#charVita").val();
};

function getMana() {
  player.mana = $("#charMana").val();
};

function getAC() {
  player.ac = $("#charAC").val();
};

function setVita(number) {
  player.vita = number;
  $("#charVita").val(number);
  //alert(player.vita);
};

function setMana(number) {
  player.mana = number;
  $("#charMana").val(number);
};

function setAC(number) {
  player.ac = number;
  $("#charAC").val(number);
};

function setSpellGraphic(source) {
  $("#spellCasted").attr("src", source);
};

function AJAXloadCave(cave) {
  removeCreatures();
  var creature = "";
  switch(cave) {
      case("Assassin"):
      creature = "cutthroat";
      break;
      case("Magus"):
      creature = "oldwitch";
      break;
      case("Hillman"):
      creature = "oneub";
      break;
      case("Hunter"):
      creature = "maskedhunter1";
      break;
      case("Anchorite"):
      creature = "fists1";
      break;
      case("Wind"):
      creature = "flamewhisp";
      break;
    default:
      creature = "fists1";
  }
  for(i = 0; i < 1; i++) {
  $("#creatures").append("<div class='col-xs-1'><div id='drone'><img id='creatureSelected' src='http://www.nexusatlas.com/photo/monster60/" + creature + ".gif'><img id='spellCasted' src='http://www.nexusatlas.com/photo/spells60/mingkenhellfire.gif'</div></div>")
  };
};

function removeCreatures() {
  $("#creatures").empty();
};