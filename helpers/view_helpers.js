var markdown = require("markdown").markdown;

module.exports = {

  currentUser: function(req, res) {
    return req.user;
  },

  parseRecordFormDate: function (req, res) {
    return function (date) {
      if (date) {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        var year = date.getFullYear();
        return year + "-" + month + "-" + day;
      } else {
        return false;
      }
    }
  },
  parseDate: function (req, res) {
    return function (date) {
      if (date) {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
      } else {
        return false;
      }
    }
  },
  getIndexOfPictureInAlbum: function(req, res) {
    return function (picture) {
      var currentPictures = {
        current: picture.id
      };
      if (picture.album) {
        var pictures = picture.album.pictures;
        var pictureIndex = pictures.indexOf(picture.id);
        var lastPictureIndex = pictures.length - 1;
        var previousPictureIndex = pictureIndex - 1;
        var nextPictureIndex = pictureIndex + 1;
        if (pictures[previousPictureIndex]) {
          currentPictures.previous = pictures[previousPictureIndex];
        }
        if (pictures[nextPictureIndex]) {
          currentPictures.next = pictures[nextPictureIndex];  
        }
      } 
      return currentPictures;
    }
  },

  sortPictureByAlbumIndex: function (req, res) {
    return function sortPictureByAlbumIndex(array) {
      array.sort(function arraySort(a,b) {
        if (a.albumIndex < b.albumIndex)
          return -1;
        if (a.albumIndex > b.albumIndex)
          return 1;
        return 0;
      });
      return array;
    }
  },

  markdownToHtml: function (req, res) {
    return function (input) {
      var output = markdown.toHTML(input);
      return output;
    };
  },
};
