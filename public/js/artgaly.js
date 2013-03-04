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

  $('.upload-pictures-form').hide();
  $('.action.show-upload-pictures-form').click(showUploadPictureForm);
  $('.action.hide-upload-pictures-form').click(hideUploadPictureForm);
  function showUploadPictureForm() {
    $('.upload-pictures-form').show();
    $('.action.show-upload-pictures-form').hide();
  }
  function hideUploadPictureForm() {
    $('.upload-pictures-form').hide();
    $('.action.show-upload-pictures-form').show();
  }
  
  $('.edit-picture-form').hide();
  $('.hide-edit-picture-form').hide();
  $('.action.show-edit-picture-form').click(showEditPictureForm);
  $('.action.hide-edit-picture-form').click(hideEditPictureForm);
  function showEditPictureForm() {
    $('.edit-picture-form').show();
    $('.hide-edit-picture-form').show();
    $('.show-edit-picture-form').hide();
  }
  function hideEditPictureForm() {
    $('.edit-picture-form').hide();
    $('.hide-edit-picture-form').hide();
    $('.show-edit-picture-form').show();
  }

  $('.add-comment').hide();
  $('.action.show-comment-form').click(showCommentForm);
  $('.action.hide-comment-form').click(hideCommentForm);
  function showCommentForm() {
    $('.add-comment').show();
    $('.show-comment-form').hide();
  }
  function hideCommentForm() {
    $('.add-comment').hide();
    $('.show-comment-form').show();
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
