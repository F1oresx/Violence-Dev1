<script>
    import { executeClient } from 'api/rage'
    import { translateText } from 'lang'
    export let UUID;
    export let FractionID;
    export let OrganizationID;
    export let houseId;
    export let isBan;
    export let DeleteData;
    //export let BankMoney;
    //export let CustomIsCreated;
    
    $: {
        if (FractionID || OrganizationID || houseId) {
            if (onSelectSpawnId (spawnData.pos) === spawnData.none) 
                onSelectSpawnIdToKey (+1);
        }
    }

    let selectSpawnId = 0;
    let spawnConfirm = false;

    const spawnData = {
        none: -1,
        pos: 0,
        org: 1,
        house: 2,
    }

    const onSelectSpawnId = (index) => {
        if (index === selectSpawnId) 
            return selectSpawnId;
        
        if (index == spawnData.house && houseId !== "-") {
            selectSpawnId = spawnData.house;
            spawnConfirm = false;
            return spawnData.house;
        } else if (index == spawnData.org && (FractionID > 0 || OrganizationID > 0)) {
            selectSpawnId = spawnData.org;
            spawnConfirm = false;
            return spawnData.org;
        } else if (index == spawnData.pos) {
            selectSpawnId = spawnData.pos;
            spawnConfirm = false;
            return spawnData.pos;
        }
        return spawnData.none;
    }

    const onKeyUp = (event) => {
		const { keyCode } = event;

        switch (keyCode) {
            case 13:
                onSpawn ()
                break;
            case 37:
                onSelectSpawnIdToKey (-1);
                break;
            case 39:
                onSelectSpawnIdToKey (+1);
                break;
        }
    }

    const onSpawn = () => {
        if (isBan)
            return;
        else if (isBan)
            return;
        else if (DeleteData !== "-")
            return;

        executeClient ("client:OnSelectCharacterv2", UUID, selectSpawnId);
    }

    const onSelectSpawnIdToKey = (number) => {
        let count = selectSpawnId + number;
        let returnId = onSelectSpawnId (count);
        while (returnId === spawnData.none) {
            if (number > 0) {
                count++;
                if (count > spawnData.org)
                    count = spawnData.pos;
            } else {
                count--;                
                if (count < spawnData.pos)
                    count = spawnData.org;
            }
            returnId = onSelectSpawnId (count);
        }
    }

    const MouseUse = (toggled) => {
        executeClient ("client.camera.toggled", toggled);
    }
</script>

<svelte:window on:keyup={onKeyUp} />

{#if !isBan && DeleteData === "-"}
<div class="auth__center">

    <div class="auth__spawn_elements posbut" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>
        <div class="createbutSt" on:keypress={() => {}} on:click={() => onSelectSpawnId (spawnData.pos)} class:use={true} class:active={selectSpawnId == spawnData.pos}>
            Место выхода
        </div>
        {#if houseId !== "-"}
            <div class="createbutSt1" on:keypress={() => {}} on:click={() => onSelectSpawnId (spawnData.house)} class:use={true} class:active={selectSpawnId == spawnData.house}>
                Дома
            </div>
        {/if}
        {#if FractionID > 0 || OrganizationID > 0}
            <div class="createbutSt1" on:keypress={() => {}} on:click={() => onSelectSpawnId (spawnData.org)} class:use={true} class:active={selectSpawnId == spawnData.org}>
                Организация
            </div>
        {/if}
    </div>

    <div class="auth__buttons" style="justify-content: center;" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>
        <div class="createbut" style="margin-right: 0" on:keypress={() => {}} on:click={onSpawn}>
            Начать играть
        </div>
    </div>
</div>


<!-- <div class="auth__center">
    <div class="auth__spawn_elements" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>
        <div class="auth__spawn_element" on:keypress={() => {}} on:click={() => onSelectSpawnId (spawnData.pos)} class:use={true} class:active={selectSpawnId == spawnData.pos}>
            <div>{translateText('player2', 'Место выхода')}</div>
            <div class="auth__small_text">{translateText('player2', 'Вы ничего не потеряете')}</div>
            <span class="auth-exit-place"></span>
        </div>
        {#if houseId !== "-"}
        <div class="auth__spawn_element" on:keypress={() => {}} on:click={() => onSelectSpawnId (spawnData.house)} class:use={true} class:active={selectSpawnId == spawnData.house}>
            {#if !spawnConfirm}
            <div class="box-column">
                <div> {translateText('player2', 'Дома')}</div>
                <div class="auth__small_text">{translateText('player2', 'Вы потеряете нелегальные предметы')}</div>
            </div>
            <span class="auth-home"></span>
            {:else}
            <div class="auth__small_text">{translateText('player2', 'Вы потеряете нелегальные предметы')}</div>
            <div class="box-flex">
                <div class="auth__spawn_btn">
                    {translateText('player2', 'Да')}
                </div>
                <div class="auth__spawn_btn">
                    {translateText('player2', 'Нет')}
                </div>
            </div>
            {/if}
        </div>
        {/if}
        {#if FractionID > 0 || OrganizationID > 0}
        <div class="auth__spawn_element" on:keypress={() => {}} on:click={() => onSelectSpawnId (spawnData.org)} class:use={true} class:active={selectSpawnId == spawnData.org}>
            <div class="box-column">
                <div> {translateText('player2', 'Вы потеряете нелегальные предметы')}</div>
                <div class="auth__small_text">{translateText('player2', 'Вы потеряете нелегальные предметы')}</div>
            </div>
            <span class="auth-fraction"></span>
        </div>
        {/if}
    </div>
    <div class="auth__buttons" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>
        <div class="main__button_square box-center">
            <b>&#8592;</b>
        </div>
        <div class="main__button main_button_size_large" style="margin-right: 0" on:keypress={() => {}} on:click={onSpawn}>
            <div class="main__button_left box-center">{translateText('player2', 'Войти')}</div>
            <div class="main__button_right box-center">
                <div class="main__button_square box-center">
                    <span class="auth-arrow"/>
                </div>
            </div>
        </div>
        <div class="main__button_square box-center">
            <b>&#8594;</b>
        </div>
    </div>
</div> -->
{/if}