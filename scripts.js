function addEmail(evt) {
  let email = $("#email-input").val();
  sessionStorage.setItem("email", email);
  $("#email").append(`O seu email é ${email}?`);
  $("#ready").modal();
}

$(document).ready(function () {
  var searchParams = new URLSearchParams(window.location.search);
  for (let p of searchParams) {
    if (p[0] === "email") sessionStorage.setItem("email", p[1]);
  }

  var email = sessionStorage.getItem("email");
  if (email) {
    $("#email").append(`O seu email é ${email}?`);
  }

  $(".rsvp").click(function (evt) {
    var email = sessionStorage.getItem("email");
    if (!email) {
      $("#add-email").modal();
      return;
    }

    $("#loading").modal({
      showClose: false,
      closeExisting: false,
      escapeClose: false,
      clickClose: false,
    });

    $.ajax("https://rsvp.ingresse.com/wishlist", {
      method: "post",
      dataType: "json",
      data: JSON.stringify({
        email: sessionStorage.getItem("email"),
        eventId: evt.target.value,
      }),
      contentType: "application/json",
      headers: {
        "X-Api-Key": "woYTtRY4Wb7sz5n0iyTwd6yFVdE9vIC29ChQq6Yt",
      },
      statusCode: {
        200: function () {
          $("#success").modal();
        },
      },
    }).fail(function (res) {
      $("#error").modal();
    });
  });
});
