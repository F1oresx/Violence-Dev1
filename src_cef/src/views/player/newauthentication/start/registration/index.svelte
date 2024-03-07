<script>
    import { accountIsSession } from 'store/account'
    import { executeClient } from 'api/rage'
    import InputCustom from 'components/input/index.svelte'
    import { accountLogin } from 'store/account'
    import { onMount } from 'svelte'
    export let OnSelectViews;

    let regusername = "",
        regemail = "",
        regpass1 = "",
        regpass2 = "",
        regpromo = "";

    const onRegister = () => {
        if(
            regusername &&
            regemail &&
            regpass1 &&
            regpass2 && $accountLogin !== -99) {

            executeClient ('client:OnSignUpv2', regusername, regemail, regpromo, regpass1, regpass2);
        }
    }

    const onKeyUp = (event) => {        
        const { keyCode } = event;
        if (keyCode === 13)
            onRegister ();
    }
    let language = "?";
</script>
<svelte:window on:keyup={onKeyUp} />

<div class="authtinkitwo">
    <div class="authlogo">
        <img src="https://imgur.com/LYVJcBQ.png" alt="" />
    </div>
    <div class="authleft">
        <h1>Регистрация</h1>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/KjpNwbB.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Name</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regusername = value} value={regusername} placeholder="name" type="text"/>
            </div>
        </div>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/lfRJyMG.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Email</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regemail = value} value={regemail} placeholder="Email" type="email"/>
            </div>
        </div>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/BaotcIt.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Password</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpass1 = value} value={regpass1} placeholder="enter your passsword" type="password"/>
            </div>
        </div>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/BaotcIt.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Password</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpass2 = value} value={regpass2} placeholder="enter your passsword" type="password"/>
            </div>
        </div>
        <div class="authblock">
            <div class="authblockico">
                <img src="https://imgur.com/oZhwG9p.png" alt="" />
            </div>
            <div class="authblockinfo">
                <b>Promocode</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpromo = value} value={regpromo} placeholder="enter promocode" type="text"/>
            </div>
        </div>
        <div class="authbtn">
            <div class="authbut" on:keypress={() => {}} on:click={onRegister}>Зарегистрироваться</div>
            <div class="authhelp">Уже есть аккаунт? <b on:keypress={() => {}} on:click={() => OnSelectViews("Authentication")}>Авторизоваться</b></div>
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
                    <h1>Account registration</h1>
                    <p>Create a character of your own taste and start playing on Street RP.</p>
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
                    <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regemail = value} value={regemail} placeholder="Email" type="email"/>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="blocks">
                <h1>Username</h1>
                <div class="inf">
                    <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regusername = value} value={regusername} placeholder="name" type="text"/>
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
                    <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpass1 = value} value={regpass1} placeholder="enter your passsword" type="password"/>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7897 4.22031C16.8297 1.27031 12.0297 1.27031 9.08966 4.22031C7.01966 6.27031 6.39966 9.22031 7.19966 11.8203L2.49966 16.5203C2.16966 16.8603 1.93966 17.5303 2.00966 18.0103L2.30966 20.1903C2.41966 20.9103 3.08966 21.5903 3.80966 21.6903L5.98966 21.9903C6.46966 22.0603 7.13966 21.8403 7.47966 21.4903L8.29966 20.6703C8.49966 20.4803 8.49966 20.1603 8.29966 19.9603L6.35966 18.0203C6.06966 17.7303 6.06966 17.2503 6.35966 16.9603C6.64966 16.6703 7.12966 16.6703 7.41966 16.9603L9.36966 18.9103C9.55966 19.1003 9.87966 19.1003 10.0697 18.9103L12.1897 16.8003C14.7797 17.6103 17.7297 16.9803 19.7897 14.9303C22.7397 11.9803 22.7397 7.17031 19.7897 4.22031ZM14.4997 12.0003C13.1197 12.0003 11.9997 10.8803 11.9997 9.50031C11.9997 8.12031 13.1197 7.00031 14.4997 7.00031C15.8797 7.00031 16.9997 8.12031 16.9997 9.50031C16.9997 10.8803 15.8797 12.0003 14.4997 12.0003Z" fill="white"/>
                        </svg>                            
                    </div>
                </div>
            </div>
            <div class="blocks">
                <h1>Repeat Password</h1>
                <div class="inf">
                    <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpass2 = value} value={regpass2} placeholder="enter your passsword" type="password"/>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7897 4.22031C16.8297 1.27031 12.0297 1.27031 9.08966 4.22031C7.01966 6.27031 6.39966 9.22031 7.19966 11.8203L2.49966 16.5203C2.16966 16.8603 1.93966 17.5303 2.00966 18.0103L2.30966 20.1903C2.41966 20.9103 3.08966 21.5903 3.80966 21.6903L5.98966 21.9903C6.46966 22.0603 7.13966 21.8403 7.47966 21.4903L8.29966 20.6703C8.49966 20.4803 8.49966 20.1603 8.29966 19.9603L6.35966 18.0203C6.06966 17.7303 6.06966 17.2503 6.35966 16.9603C6.64966 16.6703 7.12966 16.6703 7.41966 16.9603L9.36966 18.9103C9.55966 19.1003 9.87966 19.1003 10.0697 18.9103L12.1897 16.8003C14.7797 17.6103 17.7297 16.9803 19.7897 14.9303C22.7397 11.9803 22.7397 7.17031 19.7897 4.22031ZM14.4997 12.0003C13.1197 12.0003 11.9997 10.8803 11.9997 9.50031C11.9997 8.12031 13.1197 7.00031 14.4997 7.00031C15.8797 7.00031 16.9997 8.12031 16.9997 9.50031C16.9997 10.8803 15.8797 12.0003 14.4997 12.0003Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="blocks">
                <h1>Promocode</h1>
                <div class="inf">
                    <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpromo = value} value={regpromo} placeholder="enter promocode" type="text"/>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12V18C20 20.21 18.21 22 16 22H8C5.79 22 4 20.21 4 18V12C4 11.45 4.45 11 5 11H6.97C7.52 11 7.97 11.45 7.97 12V15.14C7.97 15.88 8.38 16.56 9.03 16.91C9.32 17.07 9.64 17.15 9.97 17.15C10.35 17.15 10.73 17.04 11.06 16.82L12.01 16.2L12.89 16.79C13.5 17.2 14.28 17.25 14.93 16.9C15.59 16.55 16 15.88 16 15.13V12C16 11.45 16.45 11 17 11H19C19.55 11 20 11.45 20 12Z" fill="white"/>
                            <path d="M21.5 7V8C21.5 9.1 20.97 10 19.5 10H4.5C2.97 10 2.5 9.1 2.5 8V7C2.5 5.9 2.97 5 4.5 5H19.5C20.97 5 21.5 5.9 21.5 7Z" fill="white"/>
                            <path d="M11.6398 4.99945H6.11978C5.77978 4.62945 5.78978 4.05945 6.14978 3.69945L7.56978 2.27945C7.93978 1.90945 8.54978 1.90945 8.91978 2.27945L11.6398 4.99945Z" fill="white"/>
                            <path d="M17.8696 4.99945H12.3496L15.0696 2.27945C15.4396 1.90945 16.0496 1.90945 16.4196 2.27945L17.8396 3.69945C18.1996 4.05945 18.2096 4.62945 17.8696 4.99945Z" fill="white"/>
                            <path d="M13.9704 11C14.5204 11 14.9704 11.45 14.9704 12V15.13C14.9704 15.93 14.0804 16.41 13.4204 15.96L12.5204 15.36C12.1904 15.14 11.7604 15.14 11.4204 15.36L10.4804 15.98C9.82043 16.42 8.94043 15.94 8.94043 15.15V12C8.94043 11.45 9.39043 11 9.94043 11H13.9704Z" fill="white"/>
                        </svg>                            
                    </div>
                </div>
            </div>
            <div class="butstreet" on:keypress={() => {}} on:click={onRegister}>
                <p>register</p>
            </div>
        </div>
    </div>
</div> -->



<!-- <div class="reg">
    <div class="register">
        <h1>Регистрация</h1>
        <div class="block">
            <div class="left">
                <img class="loginimg" src="../images/login.png" alt=""/>
            </div>
            <div class="right">
                <b>Name</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regusername = value} value={regusername} placeholder={translateText('player2', 'Логин..')} type="text"/>
            </div>
        </div>
        <div class="block">
            <div class="left">
                <img class="emailimg" src="../images/email.png" alt=""/>
            </div>
            <div class="right">
                <b>Email</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regemail = value} value={regemail} placeholder={translateText('player2', 'Почта..')} type="email"/>
            </div>
        </div>
        <div class="block">
            <div class="left">
                <img class="passimg" src="../images/pass.png" alt=""/>
            </div>
            <div class="right">
                <b>Password</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpass1 = value} value={regpass1} placeholder={translateText('player2', 'Пароль..')} type="password"/>
            </div>
        </div>
        <div class="block">
            <div class="left">
                <img class="passimg" src="../images/pass.png" alt=""/>
            </div>
            <div class="right">
                <b>Password</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpass2 = value} value={regpass2} placeholder={translateText('player2', 'Повторите пароль..')} type="password"/>
            </div>
        </div>
        <div class="block">
            <div class="left">
                <img class="codeimg" src="../images/code.png" alt=""/>
            </div>
            <div class="right">
                <b>Promo Code</b>
                <InputCustom updateLang={(lang) => language = lang} setValue={(value) => regpromo = value} value={regpromo} placeholder={translateText('player2', 'Промокод..')} type="text"/>
            </div>
        </div>
        <div class="but" on:keypress={() => {}} on:click={onRegister}>
                <p>{translateText('player2', 'Создать')}</p>
        </div>
    </div>    
</div> -->