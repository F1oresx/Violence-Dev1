const spawnSelector = {
    opened: false,

    hovered: "",
    transition: 700,
    positions: [],

    init() {
        mp.events.add("render", spawnSelector.render);
    },

    open(data) {
        spawnSelector.positions = data;
        spawnSelector.hovered = "";

        mp.events.call("client.intro.switchScene", "spawn", 700);

        mp.game.app.executeClientFunction("cef", `authorization.openSpawn(${JSON.stringify(data)})`);
        spawnSelector.opened = true;
    },

    render() {
        if (!spawnSelector.opened || spawnSelector.getCamera() == null) return;

        for (let data of spawnSelector.positions) {
            let key = data.Type;
            let textureName = spawnSelector.hovered === key ? `spawn_${key}_hovered` : `spawn_${key}`; 

            let position = new mp.Vector3(data.Position.x, data.Position.y, data.Position.z + 300);
            let angle = spawnSelector.getHeadingFromCoords(spawnSelector.getCamera().getCoord(), position);

            mp.game.graphics.drawLine(position.x, position.y, position.z, position.x, position.y, 0, 255, 255, 255, 150);

            global.drawTexture3D(position, 'majestic_textures_001', textureName, {
                scaleX: 120,
                scaleY: 120,
                heading: angle,
                alpha: 255,
            });
        }; 
    },

    getHeadingFromCoords(camPos, secondPos) {
        return 180 * Math.atan2(secondPos.y - camPos.y, secondPos.x - camPos.x) / Math.PI + 270;;
    },    

    getCamera() {
        return global.getMainCamera();
    },

    async clearHovers() {
        if (spawnSelector.getCamera() == null) return;

        let distance = spawnSelector.distanceToPos(spawnSelector.getCamera().getCoord(), global.getSpawnScenario().camPos);
        let transition = (distance / 50 + spawnSelector.transition).toFixed();

        global.CameraManager.setActiveCameraWithInterp(spawnSelector.getCamera(), global.getSpawnScenario().camPos, global.getSpawnScenario().camLookAt, parseInt(transition), 0, 0, 40);
        global.CameraManager.pointAtCoord(spawnSelector.getCamera(), global.getSpawnScenario().camLookAt);

        await spawnSelector.sleep(transition);
    },
    
    async onHover(type, unHovered = false) {
        if (spawnSelector.getCamera() == null) return;

        if (mp.game.streaming.isNewLoadSceneActive()) 
            mp.game.streaming.newLoadSceneStop();

        if (spawnSelector.hovered != "" && type == "" && unHovered) {
            if (type == "")
                spawnSelector.hovered = "";

            await spawnSelector.clearHovers();
        }

        var data = spawnSelector.positions.find(x => x.Type == type)
        if (data == null) return;

        spawnSelector.hovered = type;
        const position = new mp.Vector3(data.Position.x, data.Position.y, data.Position.z + 300);

        let heading = -90;
        if (position.y > 5500) 
            heading = 90;

        let distance = spawnSelector.distanceToPos(spawnSelector.getCamera().getCoord(), position);
        let transition = (distance / 50 + spawnSelector.transition).toFixed();

        global.CameraManager.setActiveCameraWithInterp(spawnSelector.getCamera(), spawnSelector.getCameraOffset(new mp.Vector3(position.x, position.y, position.z + 250), heading, 700), new mp.Vector3(-10, 0, 0), parseInt(transition), 0, 0, 40);
        global.CameraManager.pointAtCoord(spawnSelector.getCamera(), position);

        mp.game.streaming.newLoadSceneStartSphere(position.x, position.y, data.Position.z, 500, 0);
    },

    distanceToPos(v1, v2) {
        return Math.abs(Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2) + Math.pow(v2.z - v1.z, 2)));
    },

    getCameraOffset(pos, angle, dist) {
        angle = angle * 0.0174533;
    
        pos.y = pos.y + dist * Math.sin(angle);
        pos.x = pos.x + dist * Math.cos(angle);
        return pos;
    },

    sleep(time) {
        return new Promise((resolve, reject) => setTimeout(resolve, time));
    },
}

spawnSelector.init();

let temporarySelectedSlot = -1;
mp.events.add({
    "client.spawnSelector.open": (slot, data) => {
        temporarySelectedSlot = slot;

        let spawnData = JSON.parse(data);
        spawnSelector.open(spawnData);
    },

    "client.spawnSelector.hover": (type, unHover) => spawnSelector.onHover(type, unHover),
    "client.spawnSelector.submit": async (type) => {
        if (mp.game.streaming.isNewLoadSceneActive()) 
            mp.game.streaming.newLoadSceneStop();

        spawnSelector.opened = false;
        mp.game.cam.doScreenFadeOut(500);
        await global.sleep(400);
        mp.events.call("client.customTransition.open", "Летим в штат");
        await global.sleep(3000);
        mp.events.callRemote("server.characters.play", temporarySelectedSlot, type);
        mp.events.call("client.customTransition.close");
    }
});

global.getObjectOffset = function(position, heading, offset) {
    return mp.game.object.getObjectOffsetFromCoords(
        position.x,
        position.y,
        position.z,
        heading,
        offset.x,
        offset.y,
        offset.z
    );
};

global.drawTexture3D = function(position, textureDict, textureName, {scaleX = 1, scaleY = 1, heading = 0, alpha = 255}) {
    if (!mp.game.graphics.hasStreamedTextureDictLoaded(textureDict)) {
        mp.game.graphics.requestStreamedTextureDict(textureDict, true);
        return;
    }

    let pos1 = new mp.Vector3(-0.5 * scaleX, 0, 0.5 * scaleY);
    let pos2 = new mp.Vector3(0.5 * scaleX, 0, 0.5 * scaleY);
    let pos3 = new mp.Vector3(-0.5 * scaleX, 0, -0.5 * scaleY);
    let pos4 = new mp.Vector3(0.5 * scaleX, 0, -0.5 * scaleY);

    let finalPos1 = global.getObjectOffset(position, heading, pos1);
    let finalPos2 = global.getObjectOffset(position, heading, pos2);
    let finalPos3 = global.getObjectOffset(position, heading, pos3);
    let finalPos4 = global.getObjectOffset(position, heading, pos4);

    mp.game.invoke('0x29280002282F1928', finalPos1.x, finalPos1.y, finalPos1.z, finalPos3.x, finalPos3.y, finalPos3.z, finalPos2.x, finalPos2.y, finalPos2.z, 255, 255, 255, alpha, textureDict, textureName, 0.000000001, 0.000000001, 0.000000001, 0.000000001, 0.999999999, 0.000000001, 0.999999999, 0.000000001, 0.000000001);
    mp.game.invoke('0x29280002282F1928', finalPos3.x, finalPos3.y, finalPos3.z, finalPos4.x, finalPos4.y, finalPos4.z, finalPos2.x, finalPos2.y, finalPos2.z, 255, 255, 255, alpha, textureDict, textureName, 0.000000001, 0.999999999, 0.000000001, 0.999999999, 0.999999999, 0.000000001, 0.999999999, 0.000000001, 0.000000001);
};