var shoes = {} || shoes;
$('.message a').click(function(){
$('form').animate({height:"toggle", opacity:"toggle"}, "slow");
});

shoes.login = function(id){
    $.ajax({
      url: "http://localhost:3000/login/" + id,
      method: "GET",
      dataType: "json",
      success: function(data) {
        $("#username").val(data.username);
        $("#password").val(data.password);
        var validator = $("#login").validate();
        validator.reset();
        $("#login-form").modal("show");
      }
    });
  };
  shoes.reset = function() {
    $("#username").val("");
    $("#password").val("");
    $("#login")
      .find(".login-form");
    $("#login-form")
      .validate()
      .reset();
  };