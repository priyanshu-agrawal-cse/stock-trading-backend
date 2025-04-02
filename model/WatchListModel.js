const {model} = require("mongoose");

const {WatchListSchema} = require("../schemas/WatchListSchema");

const watchlistModel = new model("watchList" , WatchListSchema);

module.exports = {watchlistModel};