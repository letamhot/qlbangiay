var shoes = {} || shoes;
shoes.drawTable = function() {
  $.ajax({
    url: "http://localhost:3000/shoes/",
    method: "GET",
    dataType: "json",
    success: function(data) {
      $("#tbshoes").empty();
      var i = 0;
      $.each(data, function(i, v) {
        $("#tbshoes").append(
          "<tr>" +
            "<td>" +
            (i+1) +
            "</td>" +
            "<td>" +
            v.ten +
            "</td>" +
            "<td>" +
            v.loai.type +
            "</td>" +
            "<td><img src='" +
            v.img +
            "' width ='50px' height ='50px'></td>" +
            "<td>" +
            v.slu +
            "</td>" +
            "<td>" +
            v.gia +
            "</td>" +
            "<td>" +
            "<a href='javascript:void(0);' onclick='shoes.get(" +
            v.id +
            ")'><i class='fa fa-edit'></i></a> " +
            "<a href='javascript:void(0);' onclick='shoes.delete(" +
            v.id +
            ") '><i class='fa fa-trash'></i></a>" +
            "</td>" +
            "</tr>"
        );
      });
      $('#myTable').DataTable();
    }
  });
};
shoes.openModal = function() {
  shoes.reset();
  $("#addEditShoes").modal("show");
};
shoes.save = function() {
  if ($("#formaddeditShoes").valid()) {
    if ($("#Id").val() == 0) {
      var shoesObj = {};
      shoesObj.ten = $("#ten").val();
      var typeObj = {};
      typeObj.id = $("#TypeId").val();
      typeObj.type = $("#TypeId option:selected").html();
      shoesObj.loai = typeObj;
      shoesObj.img = $("#img").val();
      shoesObj.slu = $("#sl").val();
      shoesObj.gia = $("#gia").val();

      $.ajax({
        url: "http://localhost:3000/shoes/",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(shoesObj),
        success: function(data) {
          $("#addEditShoes").modal("hide");
          shoes.drawTable();
        }
      });
    } else {
      var shoesObj = {};
      shoesObj.ten = $("#ten").val();
      var typeObj = {};
      typeObj.id = $("#TypeId").val();
      typeObj.type = $("#TypeId option:selected").html();
      shoesObj.loai = typeObj;
      shoesObj.img = $("#img").val();
      shoesObj.slu = $("#sl").val();
      shoesObj.gia = $("#gia").val();
      shoesObj.id = $("#Id").val();
      $.ajax({
        url: "http://localhost:3000/shoes/" + shoesObj.id,
        method: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(shoesObj),
        success: function(data) {
          $("#addEditShoes").modal("hide");
          shoes.drawTable();
        }
      });
    }
  }
};
shoes.delete = function(id) {
  bootbox.confirm({
    title: "Remove shoes",
    message: "Do you want to remove this shoes?",
    buttons: {
      cancel: {
        label: '<i class="fa fa-times"></i> No'
      },
      confirm: {
        label: '<i class="fa fa-check"></i> Yes'
      }
    },
    callback: function(result) {
      if (result) {
        $.ajax({
          url: "http://localhost:3000/Shoes/" + id,
          method: "DELETE",
          dataType: "json",
          success: function(data) {
            shoes.drawTable();
          }
        });
      }
    }
  });
};
// shoes.searchNode = function() {

// };
shoes.get = function(id) {
  $.ajax({
    url: "http://localhost:3000/Shoes/" + id,
    method: "GET",
    dataType: "json",
    success: function(data) {
      $("#ten").val(data.ten);
      $("#img").val(data.img);
      $("#sl").val(data.slu);
      $("#gia").val(data.gia);
      $("#Id").val(data.id);
      var validator = $("#formaddeditShoes").validate();
      validator.reset();
      $("#addEditShoes").modal("show");
    }
  });
};

shoes.initType = function() {
  $.ajax({
    url: "http://localhost:3000/types",
    method: "GET",
    dataType: "json",
    success: function(data) {
      $("#TypeId").empty();
      $.each(data, function(i, v) {
        $("#TypeId").append(
          "<option value='" + v.id + "'>" + v.type + "</option>"
        );
      });
    }
  });
};
shoes.reset = function() {
  $("#ten").val("");
  $("#img").val("");
  $("#sl").val("");
  $("#gia").val("");
  $("#Id").val("0");
  $("#addEditShoes")
    .find(".modal-title")
    .text("Create New Shoes");
  $("#formaddeditShoes")
    .validate()
    .reset();
};
shoes.init = function() {
  shoes.drawTable();
  shoes.initType();
};
$(document).ready(function() {
  shoes.init();
});
