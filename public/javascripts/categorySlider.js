$(document).ready(() => {
  $("#category-slider button").click(function() {
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
        $("#homepage-apps").append(
          `
          <div class="row" id="app-card">
              <div class="col col-lg-4 col-md-6 col-12" onclick="location.href='/app/${app._id}';">
                <div class="card-body category-${categoryName} d-flex">
                  <img class="app-logo" src="/images/brandlogos/goodOnYou.png">
                  <div>
                    <h2>${app.name}</h2>
                    <p class="app-slogan">${app.slogan}</p>
                    <div class="badge rounded-pill text-light category-badge-${categoryName}">${categoryName}</div>
                  </div>
                </div>
              </div>
          </div>
          `
        );
      })
    })
  });
});
