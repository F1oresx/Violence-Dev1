gm.discord = (detailedStatus) => {
    let state = "на Violence";

    if (global.localplayer && typeof global.localplayer.remoteId !== "undefined")
        state = translateText('на Violence под ID {0}', global.localplayer.remoteId);

    mp.discord.update(detailedStatus, state);
}

global.discordDefault = () => {
    gm.discord(translateText('Наслаждается жизнью'))
};

discordDefault ();