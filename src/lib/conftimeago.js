
const { format } = require("timeago.js");

timeago = (timestamp)=>{
    return format(timestamp);
}

module.exports = timeago;