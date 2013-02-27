module.exports = {

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
};
