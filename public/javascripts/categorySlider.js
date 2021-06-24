$(document).ready(() => {
  const homeContent = $("#homepage-apps").html();

  $("#category-slider button").click(function () {
    $("#category-slider button").addClass("inactive");
    $(this).removeClass("inactive");

    if (!$(this).hasClass("selected")) {
      $(this).addClass("selected");
      let categoryName = $(this).attr('name');
      $.get("/api/category/" + categoryName + "?format=json", (data) => {
        $("#homepage-apps").html('');
        let apps = data.data.apps;
        if (apps.length == 0) {
          $("#homepage-apps").append(
            `<h3> There is no green pick application for this category </h3>`
          );
        }
        apps.forEach((app) => {
          $("#homepage-apps").append('<div class="row" id="app-card"></div>');
          $("#app-card").append(
            `
            <div class="col col-lg-4 col-md-6 col-12" onclick="location.href='/app/${app._id}';">
              <div class="card-body category-${categoryName} d-flex">
                <img class="app-logo" src="${app.image}">
                <div>
                  <h2>${app.name}</h2>
                  <p class="app-slogan">${app.slogan}</p>
                  <div class="badge rounded-pill text-light category-badge-${categoryName}">${categoryName}</div>
                </div>
              </div>
            </div>
          `
          );
        });
      });
    } else {
      $(this).removeClass("selected");
      $("#category-slider button").removeClass("inactive");
      $("#homepage-apps").html("");
      $("#homepage-apps").append(homeContent);
    }
  });
});
