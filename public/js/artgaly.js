$(function () {
  $('.fileupload').fileupload();
  $('#newAlbum').modal();

  $('.carousel').carousel()
  
  $(".test-bootbox").submit(function(e) {
    var form = this;
    bootbox.confirm("Are you sure to leave this conversation?", function(result) {
      if (result) 
        form.submit();
    });
    return false;
  });
  
});
