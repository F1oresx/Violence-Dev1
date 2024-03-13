var RAGE = {
    Server(eventName, ...args) {
        try {
            mp.trigger("rage.callServer", eventName, ...args);
        }
        catch(e) { console.log(`CallServer | ${eventName} | ${args}`); }
    },

    Client(eventName, ...args) {
        try {
            mp.trigger(eventName, ...args);
        }
        catch(e) { console.log(`CallClient | ${eventName} | ${args}`); }
    }
}