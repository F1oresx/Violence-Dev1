global.sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

require("./gamemode/modules/cef");
require("./gamemode/modules/rage");
require("./gamemode/modules/camerasManager");
require("./gamemode/modules/methods");

// player
require("./gamemode/player/authorization/authManager");
require("./gamemode/player/intro");