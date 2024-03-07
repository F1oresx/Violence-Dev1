<script>
    import { translateText } from 'lang'

    import { executeClient } from 'api/rage'
    import InputCustom from 'components/input/index.svelte'
    import { accountLogin } from 'store/account'
    import { onMount } from 'svelte'
    export let OnSelectViews;

    const onKeyUp = (event) => {

		const { keyCode } = event;
        if (keyCode === 13)
            onSubmitRestore ();
    }

    let restoretype = false,
        placeholder = "Логин",
        restorelength = 50,
        restoreInput = "";

	const SetStep = (step) => {        
        if(step == 0) {
			restoretype = false;
			placeholder = "Логин";
			restorelength = 50;
			restoreInput = "";
		} else if(step == 1) {
			restoretype = true;
            restorelength = 6;
            placeholder = "Код из письма";
			restoreInput = "";
		} else if(step == 2) {
            
        }
		
    }
    window.events.addEvent("cef.authentication.restoreStep", SetStep);
	
	import { onDestroy } from 'svelte';

    onDestroy(() => {
        window.events.removeEvent("cef.authentication.restoreStep", SetStep);
    });
	
    const onSubmitRestore = event => {
        if(restoreInput) {
            if (restoretype == false) {
                if (restoreInput.length != 0) {
					executeClient ('restorepass', 0, restoreInput);
					restorelength = 0;
					placeholder = "Отправка сообщения...";
					restoreInput = "";
                }
            } else {
                if (restoreInput.length == 6) {
                    executeClient ('restorepass', 1, restoreInput);
					restorelength = 0;
					placeholder = "Происходит авторизация";
					restoreInput = "";
                } else restoreInput = "";
            }
            return false;
        }
    }

</script>
<svelte:window on:keyup={onKeyUp} />

<div class="authtinkitwo">
    <div class="authlogo">
        <img src="https://imgur.com/LYVJcBQ.png" alt="" />
    </div>
    <div class="authleft">
        <h1>Восстановление</h1>
        <span>На вашу почту будет отправлено письмо с инструкцией по восстановлению аккаунта</span>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/lfRJyMG.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Email</b>
                <InputCustom setValue={(value) => restoreInput = value} value={restoreInput} placeholder="email" type="text"/>
            </div>
        </div>
        <div class="authbtn">
            <div class="authbut" on:keypress={() => {}} on:click={onSubmitRestore}>ОТПРАВИТЬ</div>
            <div class="authlink" on:keypress={() => {}} on:click={() => OnSelectViews("Authentication")}>Назад</div>
        </div>
    </div>
</div>

<!-- <div class="regstreet">
    <div class="mainstreet">
        <div class="headstreet">
            <div class="lefts">
            </div>
            <div class="rights">
                <div class="tops">
                    <h1>Account RESTORE</h1>
                    <p>Log in and start playing on Street RP.</p>
                </div>
                <div class="downs">
                    <p>If you have an account</p>
                    <div on:keypress={() => {}} on:click={() => OnSelectViews("Authentication")}>LOGIN</div>
                </div>
            </div>
        </div>
        <div class="downstreetreg">
            <div class="blocks">
                <h1>Email</h1>
                <div class="inf">
                    <InputCustom setValue={(value) => restoreInput = value} value={restoreInput} placeholder="email" type="text"/>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="butstreet" on:keypress={() => {}} on:click={onSubmitRestore}>
                <p>restore</p>
            </div>
        </div>
    </div>
</div> -->


<!-- <div class="reg">
    <div class="pass">
        <h1>Восстановить</h1>
        <div class="block">
            <div class="left">
                <img class="emailimg" src="../images/email.png" alt=""/>
            </div>
            <div class="right">
                <b>Email</b>
                <InputCustom setValue={(value) => restoreInput = value} value={restoreInput} placeholder={translateText('player2', 'Логин или почта')} type="text"/>
            </div>
        </div>
        <div class="but" on:keypress={() => {}} on:click={onSubmitRestore}>
                <p>Восстановить</p>
        </div>
    </div>
</div> -->