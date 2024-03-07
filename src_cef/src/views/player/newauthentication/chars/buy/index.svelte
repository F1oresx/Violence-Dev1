<script>
    import { translateText } from 'lang'
    import { executeClient } from 'api/rage'
    import { selectIndex } from './../store.js';

    const onBuy = () => {
        executeClient('buyNewSlot', $selectIndex);
    }

    const MouseUse = (toggled) => {
        executeClient ("client.camera.toggled", toggled);
    }
    const onKeyUp = (event) => {
		const { keyCode } = event;

        switch (keyCode) {
            case 13:
                onBuy ();
                break;
        }
    }
</script>

<svelte:window on:keyup={onKeyUp} />

<div class="auth__center">

    <div class="auth__buttons" style="justify-content: center;" on:mouseenter={() => MouseUse (false)} on:mouseleave={() => MouseUse (true)}>
        <div class="createbut" style="margin-right: 0" on:keypress={() => {}} on:click={onBuy}>
            Разблокировать
        </div>
    </div>
</div>