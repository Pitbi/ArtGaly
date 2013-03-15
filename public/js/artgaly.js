$(function () {
  $('.carousel').carousel({
    interval: 4000
  });
  
  $('.action.add-news-element').click(addNewsElement);
  
  function addNewsElement() {
    var list = $('.news-elements');
    var field = list.find('.news-element:first').clone();
    $('.news-elements').append(field);
  }

  
  $(".delete-album").submit(function(e) {
    var form = this;
    bootbox.confirm("Etes vous certain de vouloir supprimer cet album?", function(result) {
      if (result) 
        form.submit();
    });
    return false;
  });
  $(".delete-picture").submit(function(e) {
    var form = this;
    bootbox.confirm("Etes vous certain de vouloir supprimer cette photo?", function(result) {
      if (result) 
        form.submit();
    });
    return false;
  });

  $(".form-upload-files").submit(function(e) {
    $(".btn-upload").hide();
  });

  $('#carousel').elastislide();
  $('#carousel-vertical').elastislide( {
    orientation : 'vertical'
  });

  $('.hided-form').hide();
  $('.action.show-form-btn').click(showForm);
  $('.action.hide-form-btn').click(hideForm);
  function showForm() {
    $('.hided-form').show();
    $('.show-form-btn').hide();
  }
  function hideForm() {
    $('.hided-form').hide();
    $('.show-form-btn').show();  
  }

  $('.hided-form2').hide();
  $('.action.show-form-btn2').click(showForm2);
  $('.action.hide-form-btn2').click(hideForm2);
  function showForm2() {
    $('.hided-form2').show();
    $('.show-form-btn2').hide();
  }
  function hideForm2() {
    $('.hided-form2').hide();
    $('.show-form-btn2').show();  
  }

  $('.hided-form3').hide();
  $('.action.show-form-btn3').click(showForm3);
  $('.action.hide-form-btn3').click(hideForm3);
  function showForm3() {
    $('.hided-form3').show();
    $('.show-form-btn3').hide();
  }
  function hideForm3() {
    $('.hided-form3').hide();
    $('.show-form-btn3').show();  
  }

  $('.hide-upload-files-form').hide();
  $('.action.show-upload-files-form').click(showUploadForm);
  $('.action.hide-upload-files-form').click(hideUploadForm);
  function showUploadForm(){
    $(".hide-upload-files-form").show();
    $(".upload-pictures-form-add-button").hide();
  }
  function hideUploadForm(){
    $(".hide-upload-files-form").hide();
    $(".upload-pictures-form-add-button").show();
  }

  $('.pictures-tool').hide();
  $('.offers-tool').hide();
  $('.action.show-home-tool').click(showHomeTool);
  $('.action.show-pictures-tool').click(showPictureTool);
  $('.action.show-offers-tool').click(showOffersTool);
  function showHomeTool() {
    $('.pictures-tool').hide();
    $('.offers-tool').hide();
    $('.home-tool').show();
  }
  function showPictureTool() {
    $('.home-tool').hide();
    $('.offers-tool').hide();
    $('.pictures-tool').show();
  }
  function showOffersTool() {
    $('.home-tool').hide();
    $('.pictures-tool').hide();
    $('.offers-tool').show();
  }

  $('input:file').change(
    function() {
      var files = $('.upload-files').get(0).files;
      $('.upload-list-files li').remove();
      for (var i = 0; i < files.length; i++) {
        if (files[i].name) {
          $('.upload-list-files').append($('<li class="alert alert-info">' + files[i].name + '</li>'));
        }
      }
    }
  );
});
