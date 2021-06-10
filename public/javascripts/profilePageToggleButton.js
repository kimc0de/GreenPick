$(document).ready(function() {
  
  // Toggle button behaviour profile page
  $('#profile-page .toggle-button').click(function() {
    if (!$(this).hasClass("active")) {
      $("#profile-page .toggle-button.active").removeClass("active");
      $(this).addClass("active");
      
      //switch and delete/add active class
      $('#profile-page .app-list').removeClass("active")
      $("#profile-page #"+$(this).attr("data-list-id")).addClass("active")
    }
  })
  
})