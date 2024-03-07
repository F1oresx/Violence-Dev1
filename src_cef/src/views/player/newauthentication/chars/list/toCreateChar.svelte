<script>
    import { translateText } from 'lang'
    export let charid;

    import InputCustom from 'components/input/oneInput.svelte'
    import { selectIndex, selectType, settings } from './../store.js';
    import { gender, updateGender, updateIndex, FirstName, updateFirstName, LastName, updateLastName } from 'store/customization';
    
    let FirstNameLocal = "";
    $: if (FirstNameLocal) {
        updateFirstName (FirstNameLocal)
    }

    FirstName.subscribe(value => {
        FirstNameLocal = value;
    });

    let LastNameLocal = "";
    $: if (LastNameLocal) {
        updateLastName (LastNameLocal)
    }

    LastName.subscribe(value => {
        LastNameLocal = value;
    });

    const onSelectChar = () => {
        updateIndex (charid);
        selectIndex.set (charid);
        selectType.set (settings.create);
    }
    
</script>

<div class="CharsHa" class:active={$selectIndex === charid} on:keypress={() => {}} on:click={onSelectChar}>
    <div class="freeL">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.00765 12.2393C1.84246 3.67143 4.3244 1.78476 12.242 2.01864" stroke="white" stroke-width="3" stroke-linecap="round"></path>
            <path d="M33 23H13" stroke="white" stroke-width="2" stroke-linecap="round"></path>
            <path d="M23 33V13" stroke="white" stroke-width="2" stroke-linecap="round"></path>
            <path d="M33.758 2.02718C42.3281 1.86203 44.2153 4.34333 43.9814 12.2588" stroke="white" stroke-width="3" stroke-linecap="round"></path>
            <path d="M43.9924 33.7607C44.1575 42.3286 41.6756 44.2152 33.758 43.9814" stroke="white" stroke-width="3" stroke-linecap="round"></path>
            <path d="M12.2498 43.9924C3.67968 44.1575 1.79252 41.6762 2.02646 33.7607" stroke="white" stroke-width="3" stroke-linecap="round"></path>
        </svg>
    </div>
    <div class="nameL">
        <p>Персонаж #{charid + 1}</p>
        <span>Свободный слот</span>
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