<script>    
    import { translateText } from 'lang'
    export let isSendCreator = false;
    import { executeClient } from 'api/rage'
    import { gender, FirstName, LastName } from 'store/customization';
    import { selectIndex } from './../store.js';
    import Appearance from './elements/appearance/index.svelte';
    import Characteristics from './elements/characteristics/index.svelte';
    import Info from './elements/info/index.svelte';
    import Clothes from './elements/clothes/index.svelte';
    import CreateNewCustomization from 'store/random/index.js'
    import { validate } from 'api/validation';
    import PopupConfirm from '../../confirm/index.svelte';
    import './main.css';

    let elemetsId = 0;

    const elemetsSettings = [
        {elemets: Info, "title": translateText('player2', 'Наследственность'),"icon": "auth-hzcheeto", desc: translateText('player2', 'Выберите родителей своего персонажа, схожесть с одним из них и желаемый тон кожи.')},
        {elemets: Characteristics, "title": translateText('player2', 'Лицо'),"icon": "auth-smile", desc: translateText('player2', 'Настройте лицо своему персонажу максимально подробно: от лба и до формы подбородка!')},
        {elemets: Appearance, "title": translateText('player2', 'Особенности'),"icon": "auth-brush", desc: translateText('player2', 'Украсьте своего персонажа уникальными особенностями, подобрав цвет глаз, наличие веснушек, брови и не только!')},
        {elemets: Clothes, "title": translateText('player2', 'Комплекты одежды'),"icon": "auth-shirt", desc: translateText('player2', 'Тут вы можете выбрать Пол,Цвет кожи своему персонажу')},
        //{elemets: <ExportChar />, "title": "Эскпорт персонажа","icon": "character-file-chart", desc: "Тут вы можете выбрать Пол,Цвет кожи своему персонажу"}
    ];

    const onSelectCategory = (index) => {
        elemetsId = index;
        executeClient ("client.characters.customization.updateCam", "hat");
    }

    const MouseUse = (toggled) => {
        executeClient ("client.camera.toggled", toggled);
    }

    let isCreate = false;

    const onCreate = () => {
        if (isCreate)  
            return;
        if (!isSendCreator) {
            let check;

            check = validate("name", $FirstName);
            if(!check.valid) {
                window.notificationAdd(4, 9, check.text, 3000);
                return;
            }

            check = validate("surname", $LastName);
            if(!check.valid) {
                window.notificationAdd(4, 9, check.text, 3000);
                return;
            }
        }
        isCreate = true;
        executeClient ('client.characters.customization.create', $selectIndex, $FirstName, $LastName, $gender);
    }

    const onKeyUp = (event) => {
        const { keyCode } = event;
        
        if(keyCode == 13) {
            onCreate ();
        }
    }

    const onError = (text) => {
        isCreate = false;
        window.notificationAdd(4, 9, text, 3000);
    }

    window.events.addEvent("cef.customization.error", onError);

    import { onDestroy } from 'svelte'
    onDestroy(() => {
        window.events.removeEvent("cef.customization.error", onError);
    });

    let isPopupConfirmed = false;

    const onClickRandom = () => {
        CreateNewCustomization ($gender);
        onPopupToogle()
    }

    const onPopupToogle = () => {
        isPopupConfirmed = !isPopupConfirmed;
    }

</script>

<svelte:window on:keyup={onKeyUp} />
{#if isPopupConfirmed}
    <PopupConfirm {onClickRandom} {onPopupToogle}/>
{/if}

<div class="rightcharsCR">
    <div class="HeadR">
        <h1>Создание<br>персонажа</h1>
        <p>Создайте своего персонажа которым будете творить историю</p>
    </div>
    <div class="ListR" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>     
        <svelte:component this={elemetsSettings[elemetsId].elemets} />     
    </div>
</div>

<div class="auth__center">

    <div class="auth__buttons" style="justify-content: center;" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>
        <div class="createbutStart" style="margin-right: 0" on:keypress={() => {}} on:click={onCreate}>
            Создать персонажа
        </div>
    </div>
</div>
<div class="auth__customisation_center">
    <div class="auth__customization">
        <div class="auth__customization_categories1" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>
            {#each elemetsSettings as item, index}
            <div class="auth__customization_categorie" on:keypress={() => {}} on:click={() => onSelectCategory (index)} class:active={elemetsId == index}>
                <span class={item.icon+1}></span>
            </div>
            {/each}
            <div class="auth__customization_categorie" on:keypress={() => {}} on:click={() => isPopupConfirmed = true}>
                <span class="auth-random1"></span>
            </div>
            {#if false}
                <div class="auth__customization_categorie" title="Перенос внешности с Classic">
                    <span class="auth-person"></span>
                </div>
            {/if}
        </div>
    </div>
</div>