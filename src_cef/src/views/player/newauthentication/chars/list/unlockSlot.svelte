<script>
    import { selectIndex, selectType, settings } from './../store.js';
    export let charid;

    const onSelectSlot = () => {
        selectIndex.set (charid);
        selectType.set (settings.buy);
    }

</script>

<div class="CharsHa" class:active={$selectIndex === charid} on:keypress={() => {}} on:click={onSelectSlot}>
    <div class="donatL">$</div>
    <div class="nameL">
        <p>Персонаж #{charid + 1}</p>
        <span>Заблокированный слот</span>
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