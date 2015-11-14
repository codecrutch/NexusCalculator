// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

$(document).ready(function() {
  	$("#notice").fadeOut(3000);
  	$.backstretch("http://www.nexusatlas.com/photo/newspics/Pueullabattles2.PNG");

  	 $(window).load(function(){
        $('#myModal').modal('show');
    });


  /*	$("#member-sign-in").slideDown(5000);
  	//$("#member-sign-in").slideDown(5000);
  	var ok = setInterval(function(e){
	  	$("#member-sign-in").slideUp(2000), 150000
	 }); 
  */

 	/* $.ajax({
       type: "GET",
       url: "caves",
       dataType: "json",
       data: { 'cave_id' : 1},
       cache: false,
       contentType: "application/json",
       success: function(data) {

            $.each(data, function(i,cave){
                 $('#creatures').append(
                 	'<li>' + cave.cavename + '</li>' +
                 	'<p>' + cave.requirements + '</p>'
                 	);
             });
       }
    });
	*/
    

 });