const moment = require("moment");

const formatMessages = (userName, text, userId = null) => {
  return {
    userName,
    text,
    time: moment().format("h:mm a"),
    userId,
  };
};

module.exports = formatMessages;
