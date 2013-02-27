$(function () {
  $('.carousel').carousel({
    interval: 3000
  });
  $('#modal-gallery').on('load', function () {
    var modalData = $(this).data('modal');
});

  $('#myModal').modal();
  
  $('.news-form').hide();
  $('.action.show-news-form').click(showNewsForm);
  function showNewsForm() {
    $('.news-form').show();
  }
  
  $('.action.hide-news-form').click(hideNewsForm);
  function hideNewsForm() {
    $('.news-form').hide();
  }  
  
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
  
  $('.pictures-form').hide();
  $('.action.show-pictures-form').click(showPicturesForm);
  $('.action.hide-pictures-form').click(hidePicturesForm);
  
  
  function showPicturesForm() {
    $('.pictures-form').show();
    $('.pictures-form-add-button').hide();
  }
  
  function hidePicturesForm() {
    $('.pictures-form').hide();
    $('.pictures-form-add-button').show();
  }
  
  $('input:file[multiple]').change(
    function() {
      var files = $('.upload-pictures').get(0).files;
      $('.upload-list-files li').remove();
      for (var i = 0; i < files.length; i++) {
        if (files[i].name) {
          $('.upload-list-files').append($('<li class="alert alert-info">' + files[i].name + '</li>'));
        }
      }
    }
  );
});
