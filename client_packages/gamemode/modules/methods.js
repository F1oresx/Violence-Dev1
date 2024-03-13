global.requestAnimDict = (animDictionary) => new Promise(async (resolve, reject) => {
    if (mp.game.streaming.hasAnimDictLoaded(animDictionary))
        return resolve(true);

    mp.game.streaming.requestAnimDict(animDictionary);

    let time = 0;
    while (!mp.game.streaming.hasAnimDictLoaded(animDictionary)) {
        if (time > 500)
            return resolve("Ошибка requestAnimDict. Dict: " + animDictionary);

        time++;

        await global.sleep (10);
    }

    return resolve(true);
});