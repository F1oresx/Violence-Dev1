<script>
    import { translateText } from 'lang'
    import ProgressBar from 'progressbar.js';
    import { selectChar, selectType, selectIndex, settings } from './../store.js';
    import { updateIndex } from 'store/customization';
    import moment from 'moment';
    import { setTime, elapsed } from 'api/moment'
    import { executeClient } from 'api/rage'
    export let charid;
    export let char;
    
    const charData = char.Data;
    
    const updateTime = (data) => {
        if ($selectIndex !== charid)
            return;

        selectChar.set (char);

        if (data !== "-") 
            setTime (data);
        else 
            setTime (false);
    }

    $: if (char.Data.DeleteData) {
        updateTime (char.Data.DeleteData)
    }

    selectIndex.subscribe((value) => {
        if (value === charid)
            updateTime (char.Data.DeleteData)
    });

    //export let FractionID;
    //export let Money;
    //export let BankMoney;
    //export let CustomIsCreated;
    
    const GetMaxExp = (lvl) => {
        return 3 + lvl * 3;
    }

    const GetProgress = (exp) => {
       let progress = exp * 100 / GetMaxExp (charData.LVL);
        
        if (progress > 100) progress = 100;

        return progress / 100;
    }

	const CreateProgressBar = () => {
        let ProgressBarId = new ProgressBar.Circle(".auth__characters_circle.UUID-" + charData.UUID, {
            color: '#FF9F1C',
            trailColor: '#eee',
            trailWidth: 1,
            duration: 1400,
            easing: 'bounce',
            strokeWidth: 6,
            from: {color: '#FF9F1C', a:0},
            to: {color: '#E71D36', a:1},
            // Set default step function for all animate calls
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
            }
        });
        ProgressBarId.animate(GetProgress (charData.EXP));
    }

    const onSelectChar = () => {
        isDell = false;
        updateIndex (charid);
        selectIndex.set (charid);
        selectType.set (settings.char);
        selectChar.set (char);
    }
    let isDell = false;

    const onDell = (e, isCancelDell = false) => {
        e.stopPropagation();

        if (isDell || isCancelDell) {
            if (!window.loaderData.delay("delete", 5))
                return;
            else if (charid > 2)
                return;
            else if ($selectIndex !== charid)
                return;

            isDell = false;
            executeClient("client.char.delete", charid);
        } else {
            isDell = true;
        }
    }
</script>

<div class="CharsHa" on:keypress={() => {}} on:click={onSelectChar} class:active={$selectIndex === charid}>
    <div class="lvlL">
        <b>{charData.LVL}</b>
    </div>
    <div class="nameL">
        <p>Персонаж # {charid + 1}</p>
        <span>{charData.FirstName} {charData.LastName}</span>
    </div>
    <div class="iconL">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_415_477)">
                <path d="M16.25 21.25L22.5 15L16.25 8.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
            <g filter="url(#filter1_d_415_477)">
                <path d="M7.5 21.25L13.75 15L7.5 8.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
            <defs>
                <filter id="filter0_d_415_477" x="12.25" y="4.75" width="14.25" height="20.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset></feOffset>
                    <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"></feColorMatrix>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_415_477"></feBlend>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_415_477" result="shape"></feBlend>
                </filter>
                <filter id="filter1_d_415_477" x="3.5" y="4.75" width="14.25" height="20.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                    <feOffset></feOffset>
                    <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"></feColorMatrix>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_415_477"></feBlend>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_415_477" result="shape"></feBlend>
                </filter>
            </defs>
        </svg>
    </div>
</div>

<!-- <div class="auth__characters_block" on:keypress={() => {}} on:click={onSelectChar} class:active={$selectIndex === charid}>
    <div class="auth__characters_character">
        <div class="box-column">
            <b>{charData.FirstName}</b>
            <div>{charData.LastName}</div>
        </div>
        <div class="auth__characters_circle UUID-{charData.UUID}" use:CreateProgressBar>
            <div class="auth__characters_circle_text">
                <b>{charData.LVL}</b>
                <div>LVL</div>
            </div>
        </div>
    </div>
    {#if charid <= 2}
    <div class="auth__characters_hover">
        {#if char.Data && char.Data.DeleteData === "-"}
            {#if !isDell}
                <div>{translateText('player2', 'Удалить персонажа')}</div>
                <div class="main__button_square large box-center" on:keypress={() => {}} on:click={(e) => onDell(e)}>
                    {translateText('player2', 'Удалить')}
                </div>
            {:else}
                <div>{translateText('player2', 'Вы уверены?')}</div>
                <div class="main__button_square large box-center" on:keypress={() => {}} on:click={(e) => onDell(e)}>
                    {translateText('player2', 'Удалить')}
                </div>
            {/if}
        {:else}
        <div>Удалится через {moment.utc($elapsed).format("DD") -1} дня, {moment.utc($elapsed).format("HH")} часов, {moment.utc($elapsed).format("mm")} минут.</div>
        <div class="main__button_square large box-center" on:keypress={() => {}} on:click={(e) => onDell(e, true)}>
            Отменить
        </div>
        {/if}
    </div>
    {/if}
</div> -->