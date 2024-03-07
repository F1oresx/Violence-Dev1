<script>
    import { translateText } from 'lang'
    import { accountIsSession } from 'store/account'
    import { executeClient } from 'api/rage'
    import InputCustom from 'components/input/index.svelte'
    import { accountLogin } from 'store/account'
    import { onMount } from 'svelte'

    export let OnSelectViews;
    let loginInput;
    let loginIsFocus = false;
    let passwordInput;
    let passwordIsFocus = false;

    onMount (() => {
        accountLogin.subscribe((value) => {
            if (value == -99) return;
            if (value == -1 || value == "-1") loginIsFocus = true;
            else {
                passwordIsFocus = true;
                loginInput = value;
            }
        });
    });

    const onLogin = () => {
        if (loginInput && passwordInput && !$accountIsSession && loginInput.length && passwordInput.length && $accountLogin !== -99) 
            executeClient ("client:OnSignInv2", loginInput, passwordInput);
    }


    let language = "?";

    const onKeyUp = (event) => {

		const { keyCode } = event;
        if (keyCode === 13)
            onLogin ();
    }
</script>
<svelte:window on:keyup={onKeyUp} />
<div class="authtinkitwo">
    <div class="authlogo">
        <img src="https://imgur.com/LYVJcBQ.png" alt="" />
    </div>
    <div class="authleft">
        <h1>АВТОРИЗАЦИЯ</h1>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/KjpNwbB.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Name</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => loginInput = value} value={loginInput} isFocus={loginIsFocus} placeholder="name"type="text"/>
            </div>
        </div>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/BaotcIt.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Password</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => passwordInput = value} value={passwordInput} isFocus={passwordIsFocus} placeholder="enter your passsword" type="password"/>
            </div>
        </div>
        <div class="authbtn">
            <div class="authbut" on:keypress={() => {}} on:click={onLogin}>Войти</div>
            <div class="authhelp">Ещё нет аккаунта? <b on:keypress={() => {}} on:click={() => OnSelectViews("Registration")}>Зарегистрироваться</b></div>
            <div class="authlink" on:keypress={() => {}} on:click={() => OnSelectViews("Restore")}>Забыли пароль?</div>
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
                    <h1>Account Authorization</h1>
                    <p>Log in and start playing on Street RP.</p>
                </div>
                <div class="downs">
                    <p>If you don't have an account</p>
                    <div on:keypress={() => {}} on:click={() => OnSelectViews("Registration")}>REGISTRATION</div>
                </div>
            </div>
        </div>
        <div class="downstreetlog">
            <div class="blocks">
                <h1>Name</h1>
                <div class="inf">
                    <InputCustom updateLang={(lang) => language = lang} setValue={(value) => loginInput = value} value={loginInput} isFocus={loginIsFocus} placeholder="name"type="text"/>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="white"/>
                        </svg> 
                    </div>
                </div>
            </div>
            <div class="blocks">
                <h1>Password</h1>
                <div class="inf">
                    <InputCustom updateLang={(lang) => language = lang} setValue={(value) => passwordInput = value} value={passwordInput} isFocus={passwordIsFocus} placeholder="enter your passsword" type="password"/>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7897 4.22031C16.8297 1.27031 12.0297 1.27031 9.08966 4.22031C7.01966 6.27031 6.39966 9.22031 7.19966 11.8203L2.49966 16.5203C2.16966 16.8603 1.93966 17.5303 2.00966 18.0103L2.30966 20.1903C2.41966 20.9103 3.08966 21.5903 3.80966 21.6903L5.98966 21.9903C6.46966 22.0603 7.13966 21.8403 7.47966 21.4903L8.29966 20.6703C8.49966 20.4803 8.49966 20.1603 8.29966 19.9603L6.35966 18.0203C6.06966 17.7303 6.06966 17.2503 6.35966 16.9603C6.64966 16.6703 7.12966 16.6703 7.41966 16.9603L9.36966 18.9103C9.55966 19.1003 9.87966 19.1003 10.0697 18.9103L12.1897 16.8003C14.7797 17.6103 17.7297 16.9803 19.7897 14.9303C22.7397 11.9803 22.7397 7.17031 19.7897 4.22031ZM14.4997 12.0003C13.1197 12.0003 11.9997 10.8803 11.9997 9.50031C11.9997 8.12031 13.1197 7.00031 14.4997 7.00031C15.8797 7.00031 16.9997 8.12031 16.9997 9.50031C16.9997 10.8803 15.8797 12.0003 14.4997 12.0003Z" fill="white"/>
                        </svg> 
                    </div>
                </div>
            </div>
            <div class="restore" on:keypress={() => {}} on:click={() => OnSelectViews("Restore")}>Forgot password?</div>
            <div class="butstreet" on:keypress={() => {}} on:click={onLogin}>
                <p>login</p>
            </div>
        </div>
    </div>
</div> -->



<!-- <div class="reg">
    <div class="login">
        <h1>Авторизация</h1>
        <div class="block">
            <div class="left">
                <img class="loginimg" src="../images/login.png" alt=""/>
            </div>
            <div class="right">
                <b>Name</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => loginInput = value} value={loginInput} isFocus={loginIsFocus} placeholder={translateText('player2', 'Логин или почта')} type="text"/>
            </div>
        </div>
        <div class="block">
            <div class="left">
                <img class="passimg" src="../images/pass.png" alt=""/>
            </div>
            <div class="right">
                <b>Password</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => passwordInput = value} value={passwordInput} isFocus={passwordIsFocus} placeholder={translateText('player2', 'Пароль')} type="password"/>
            </div>
        </div>
        <div class="but" on:keypress={() => {}} on:click={onLogin}>
                <p>{translateText('player2', 'Войти')}</p>
        </div>
    </div>
</div> -->