$(document).ready(() => {
  $("#category-slider button").each(() => {
    let variable = this;
    $(this).on("click", () => {
      $("#homepage-apps").html('');
      console.log("This is " , variable);
      let category = this.getAttribute("name");

      $.get("/api/category/" + category, (data) => {
        console.log(data);

      }).then(() => {});
    });
  });
});
