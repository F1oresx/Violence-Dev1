<script>
    import { executeClient } from 'api/rage';
    import { format } from 'api/formatter';
    import { charMoney } from 'store/chars.js';
    import exit from './exit.png';
    import './main.sass';
    import './main.css';
    import palochka from './palochka.png';
    import InputCustom from 'components/input/index.svelte';
    import { validate } from 'api/validation';
    export let viewData;
    if (!viewData) viewData = '[]';
    let price = viewData.price;

    let weddingType = viewData.type; // 0 - женить / 1 - развод

    const weddingTypeText = [
        "Вы попали в место, где влюбленные могут закрепить свои чувства узами брака. Мир только для вас двоих!",
        "В жизни бывают разные ситуаци.. Иногда то что кажется любовью может оказаться влюблённостью.. Мы все понимаем..",
    ];

    let typeSurname = 0;

    let nameInput = "";

    const onBuy = () => {
        if (weddingType == 0) {
            if (nameInput.length === 0) {
                window.notificationAdd(4, 9, `Вы не указали ID или имя человека`, 3000);
                return;
            }
            let check;
            check = validate("name", nameInput);
            if (/\D/.test(nameInput) && !check.valid) {
                window.notificationAdd(4, 9, check.text, 3000);
                return;
            }
        }
        if (price > Number ($charMoney)) { 
            window.notificationAdd(4, 9, `У Вас не хватает денег`, 3000);
            return;   
        }
        executeClient ("client.wedding.married", nameInput, typeSurname);
    }
</script>
<div class="main" id="wedding" class:divorce={weddingType == 1}>
    <div class="wedding__header">Загс
        <img src={exit} alt="exit" style="margin-left: 78%;">
    </div>
    <!-- <div class="wedding__text">{weddingTypeText [weddingType]}</div> -->
    <!-- {#if weddingType === 0} -->
    <div class="placeept">
        <div class="input"><InputCustom setValue={(value) => nameInput = value} value={nameInput} placeholder="" type="text"/></div>
        <span>Введите Имя или ID</span>
    </div>

    <div class="family">
    <div class="wedding__subtitle">Выберите фамилию</div>
    <div class="box-flex" style="margin-bottom: 0">
        <div class="wedding__selector" class:active={typeSurname == 0} on:click={() => typeSurname = 0}>Жениха</div>
        <div class="wedding__selector2" class:active={typeSurname == 1} on:click={() => typeSurname = 1}>Невесты</div>
    </div>
    <div class="box-center">
        <div class="wedding__selector3" class:active={typeSurname == 2} on:click={() => typeSurname = 2}>Не менять</div>
    </div>
    </div>
    <!-- {/if} -->
    <!-- <div class="wedding__subtitle">${format("money", price)}</div>
    <div class="wedding__text">Стоимость услуги</div> -->
    <div class="wedding__button" on:click={onBuy}>Поженится за 100.000.000$</div>
    <img src={palochka} alt="palochka" style="margin-left: 49.2%;margin-top: 300px;color:rgba(49, 49, 49, 1);position: absolute;">
    <!-- <div class="wedding__exit">
        <div class="wedding__exit_text">Выйти</div>
        <div class="wedding__exit_button">ESC</div>
    </div> -->
</div>