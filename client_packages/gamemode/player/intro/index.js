require("./gamemode/player/intro/data/club");

let currentScenario = global.clubIntroData;

global.isScenePlayed = function() {
    return currentScenario.isPlaying;
};

global.getCharacterScenData = function() {
    return currentScenario.characters;
};

global.getSpawnScenario = function() {
    return currentScenario.scenes.spawn;
}

global.getMainCamera = function() {
    return mainCamera;
};

global.getScenesData = function(type) {
    return currentScenario.scenes[type];
};

let mainCamera;
let timeout;
let pedsPool = [];
let vehiclesPool = [];

var MusicIntro = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
];

async function startScenario() {
    mp.game.cam.doScreenFadeOut(0);
    mp.game.time.setClockTime(currentScenario.time.hour, currentScenario.time.minute, currentScenario.time.second);
    mp.game.gameplay.setWeatherTypeNow(currentScenario.weather);
    await global.sleep(1000);
    
    mp.players.local.position = currentScenario.playerPosition;

    mp.game.streaming.requestIpl(currentScenario.iplName);
    if (currentScenario.deleteObjects)
        currentScenario.deleteObjects.forEach(data => {
            mp.game.entity.createModelHide(data.x, data.y, data.z, data.radius, data.model, true);
        });

    createPeds();
    createVehicles();

    currentScenario.isPlaying = true;

    mp.game.cam.doScreenFadeIn(500);

    mp.gui.cursor.show(false, false);

    createCamera(0);
    var randMusic = Math.floor(Math.random() * MusicIntro.length);
    //global.soundCEF.execute(`playMusicIntro('./sounds/${MusicIntro[randMusic]}.mp3', 0.16)`);
    mp.game.app.executeClientFunction("cef", `intro.open()`);
};

function stopScenario() {
    currentScenario.isPlaying =false;

    destroyCamera();
    destroyPeds();
    destroyVehicles();

    if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
    }
};

function createCamera(index) {
    let intro = currentScenario;
    if (!intro.isPlaying) return;

    var cameraSettings = intro.cameras[index];
    if (typeof(cameraSettings) == 'undefined') {
        createCamera(0);
        return;
    }

    let camType = typeof(cameraSettings.to) == 'undefined' ? "default" : "interpolate";

    destroyCamera();

    if (camType == "default") 
    {
        mainCamera = global.CameraManager.createCamera("intro", "default", cameraSettings.from.pos, new mp.Vector3(0, 0, 0), cameraSettings.from.fov);
        global.CameraManager.pointAtCoord(mainCamera, cameraSettings.from.pointAt);
        global.CameraManager.setActiveCamera(mainCamera, true);
        mainCamera.shake("HAND_SHAKE", 0.3);
        timeout = setTimeout(() => {
            createCamera(index + 1);
        }, intro.defaultSceneDuration);
    }
    if (camType == "interpolate") 
    {
        mainCamera = global.CameraManager.createCamera("intro", "default", cameraSettings.from.pos, new mp.Vector3(0, 0, 0), cameraSettings.from.fov);
        mainCamera.shake("HAND_SHAKE", 0.3);
        global.CameraManager.pointAtCoord(mainCamera, cameraSettings.from.pointAt);
        global.CameraManager.setActiveCamera(mainCamera, true);
        mainCamera.shake("HAND_SHAKE", 0.3);
        global.CameraManager.setActiveCameraWithInterpExt(mainCamera, cameraSettings.to.pos, cameraSettings.to.pointAt, cameraSettings.duration, 0, 0);

        timeout = setTimeout(() => {
            createCamera(index + 1);
        }, cameraSettings.duration);
    }

    if (cameraSettings.dof !== undefined) {
        if (cameraSettings.dof.shallowMode !== undefined) mainCamera.setUseShallowDofMode(cameraSettings.dof.shallowMode);
        if (cameraSettings.dof.nearDof !== undefined) mainCamera.setNearDof(cameraSettings.dof.nearDof);
        if (cameraSettings.dof.farDof !== undefined) mainCamera.setFarDof(cameraSettings.dof.farDof);
        if (cameraSettings.dof.strength !== undefined) mainCamera.setDofStrength(cameraSettings.dof.strength);
    }
};

function destroyCamera() {
    if (mainCamera != null) {
        mainCamera.destroy();
        mainCamera = null;
        mp.game.cam.renderScriptCams(false, true, 0, true, true);
    }
};

function createPeds() {
    currentScenario.peds.forEach(data => {
        let entity = mp.peds.new(mp.game.joaat(data.model), data.position, data.heading, global.localplayer.dimension);

        entity.scenData = data;
        entity.isScenReady = false;

        pedsPool.push(entity);
        onStream(entity);
    });
};

function destroyPeds() {
    pedsPool.forEach(entity => entity.destroy());
    pedsPool = [];
};

function createVehicles() {
    currentScenario.vehicles.forEach(data => {
        var veh = mp.vehicles.new(mp.game.joaat(data.model), data.position, {
            numberPlate: data.numberPlate,
            heading: data.rotation,
            dimension: global.localplayer.dimension,
        });

        veh.setLodDist(1000);
        veh.scenData = data;
        veh.isScenReady = false;

        if (typeof(data.freezePosition) !== 'undefined')
            veh.freezePosition(veh.freezePosition);
        
        vehiclesPool.push(veh);
        onStream(veh);
    });
};

function destroyVehicles() {
    vehiclesPool.forEach(entity => entity.destroy());
    vehiclesPool = [];
};

function onStream(entity) {
    if (!entity || entity.handle == 0 || !entity.scenData) return;
    
    let data = entity.scenData;
    switch(entity.type) {
        case "ped":
            if (typeof(data.animation) !== 'undefined') {
                global.requestAnimDict(data.animation.animDict).then(() => {
                    if (entity && entity.handle && mp.peds.exists(entity))
                        entity.taskPlayAnim(data.animation.animDict, data.animation.animName, 8, 1.0, -1, 1, 0, false, false, false); 
                });
            }

            if (typeof(data.scenario) !== 'undefined')
                entity.taskStartScenarioInPlace(data.scenario, 0, false);

            if (typeof(data.freezePosition) !== 'undefined')
                entity.freezePosition(data.freezePosition);
        break;
        case "vehicle":
            if (typeof(data.colors) !== 'undefined')
                entity.setColours(data.colors[0], data.colors[1]);
            
            if (typeof(data.freezePosition) !== 'undefined')
                entity.freezePosition(data.freezePosition);
            
            // if (typeof(data.lightState) !== 'undefined')
            //     entity.setLights(data.lightState);

            if (typeof(data.engine) !== 'undefined')
                entity.setEngineOn(data.engine, true, true);

            if (typeof(data.doors) !== 'undefined') {
                for (const [id, state] of Object.entries(data.doors))
                    state ? entity.setDoorOpen(parseInt(id), false, false) : entity.setDoorShut(parseInt(id), false);
            }

        break;
    }

    entity.isScenReady = true;
};

function switchScene(scene, duration) {
    var data = currentScenario.scenes[scene];
    if (!data) return;

    if (timeout !== null) {
        clearTimeout(timeout);
        timeout = undefined;
    }

    mp.game.app.executeClientFunction("cef", `intro.reset()`);
    global.CameraManager.setActiveCameraWithInterpExt(mainCamera, data.camPos, data.camLookAt, duration, 0, 0, data.fov);
};

mp.events.add({
    "client.intro.start": startScenario,
    "client.intro.stop": stopScenario,
    "client.intro.switchScene": switchScene,
    "entityStreamIn": onStream
});