const localPlayer = mp.players.local;

function open(isFirst) {
    mp.events.call("client.intro.switchScene", "auth", 600);
    global.main_browser.execute(`window.router.setView('PlayerAuthentication');`);
    global.menuOpen();
}

function close() {
    mp.game.app.executeClientFunction("cef", `authorization.reset()`);
}

global.charactersData = [];
var characterPeds = {};
async function openCharacters(login, socialClub, customizationData, charactersData) {
    mp.events.call("client.intro.switchScene", "characters", 600);

    // mp.console.logInfo(customizationData);
    customizationData = JSON.parse(customizationData);
    global.charactersData = JSON.parse(charactersData);

    var scenData = global.getCharacterScenData();
    for(var slotIndex = 0; slotIndex < customizationData.length; slotIndex++) {
        var slot = slotIndex + 1;
        var params = customizationData[slotIndex];

        let characterScenData = scenData[slot];

        if (params == null) {
            characterPeds[slot] = null;
        }
        else {
            var model = 'mp_m_freemode_01';
            if (params.Gender === 1)
                model = 'mp_f_freemode_01';

            var ped = mp.peds.new(mp.game.joaat(model), characterScenData.position, characterScenData.heading, localPlayer.dimension);
            ped.customizationData = params;
            ped.scenData = characterScenData;

            characterPeds[slot] = ped;
            entityStreamIn(ped);
        }
    }

    mp.game.app.executeClientFunction("cef", `authorization.initCharacters('${login}', '${socialClub}', ${charactersData})`);
    global.menuOpen();
};

function selectCharacter(index) {
    let charsData = global.getCharacterScenData();
    let scenario = charsData[index + 1];

    if (index < 0) 
        scenario = global.getScenesData("characters");

    if (typeof(scenario) == 'undefined') return;

    global.CameraManager.setActiveCameraWithInterpExt(global.getMainCamera(), scenario.camPos, scenario.camLookAt, 700, 0, 0, scenario.fov, scenario.dof);
};

function entityStreamIn(entity) {
    if (entity.type === 'ped') {
        let params = entity.customizationData;
        let scenData = entity.scenData;
        if (scenData === undefined || params === undefined || params === null) return;

        entity.setHeadBlendData(
            params.Parents.Mother,
            params.Parents.Father,
            0,
            params.Parents.Mother,
            params.Parents.Father,
            0,
            params.Parents.Similarity,
            params.Parents.SkinSimilarity,
            0,
            true
        );

        entity.setComponentVariation(2, params.Hair.Hair, 0, 2);
        entity.setHeadOverlay(2, params.EyebrowColor, 1.0, params.Hair.Color, 0);

        entity.setHairColor(params.Hair.Color, params.Hair.HighlightColor);
        entity.setEyeColor(params.EyeColor);
        entity.setHeadOverlayColor(2, 1, params.Hair.Color, 0);

        entity.setComponentVariation(1, 0, 0, 2);
        entity.setComponentVariation(3, params.Clothes.Torso.Variation, params.Clothes.Torso.Texture, 2);
        entity.setComponentVariation(4, params.Clothes.Leg.Variation, params.Clothes.Leg.Texture, 2);
        entity.setComponentVariation(5, params.Clothes.Bag.Variation, params.Clothes.Bag.Texture, 2);
        entity.setComponentVariation(6, params.Clothes.Feet.Variation, params.Clothes.Feet.Texture, 2);
        entity.setComponentVariation(7, params.Clothes.Accessory.Variation, params.Clothes.Accessory.Texture, 2);
        entity.setComponentVariation(8, params.Clothes.Undershit.Variation, params.Clothes.Undershit.Texture, 2);
        entity.setComponentVariation(9, params.Clothes.Bodyarmor.Variation, params.Clothes.Bodyarmor.Texture, 2);
        entity.setComponentVariation(10, params.Clothes.Decals.Variation, params.Clothes.Decals.Texture, 2);
        entity.setComponentVariation(11, params.Clothes.Top.Variation, params.Clothes.Top.Texture, 2);

        for (var i = 0; i < params.Tattoos.length; i++) {
            var list = params.Tattoos[i];
            if (list.length != 0) {
                list.forEach(item => {
                    entity.setDecoration(mp.game.joaat(item.Dictionary), mp.game.joaat(item.Hash));
                });
            }
        };
    
        for (var i = 0; i < params.Appearance.length; i++) {
            entity.setHeadOverlay(i, params.Appearance[i].Value, 1.0);
        };

        entity.taskClearLookAt();

        global.requestAnimDict(scenData.animation.animDict).then(() => {
            if (entity && entity.handle && mp.peds.exists(entity))
                entity.taskPlayAnim(scenData.animation.animDict, scenData.animation.animName, 8, 1.0, -1, 1, 0, false, false, false); 
        });
    }
};

function closeCharacters() {
    mp.events.call("client.intro.stop");
    mp.game.app.executeClientFunction("cef", `authorization.reset()`);

    Object.values(characterPeds).forEach(ped => ped != null && ped.destroy());
    characterPeds = {};
};

function onReady() {
    global.loggedin = true;

    closeCharacters();  
    
    global.menu = mp.browsers["new"]('http://package/interface/menu.html');
    mp.game.ui.displayHud(true);

    mp.events.call("freeze", false);
    global.soundCEF.execute(`stopMusic()`);
    global.menuClose();
};

mp.events.add({
    "client.accounts.open": open,
    "client.accoutns.close": close,
    "client.characters.open": openCharacters,
    "client.characters.close": closeCharacters,
    "client.characters.select": selectCharacter,
    "client.ready": onReady,
    "entityStreamIn": entityStreamIn
});