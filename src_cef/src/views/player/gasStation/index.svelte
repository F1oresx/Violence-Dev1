<script>
    import { executeClient } from 'api/rage'

    import './main.css';
    import exit from './exit.png';
    import icon from './icon.png'

    let input = "";

    window.petrol = {
        reset: () => {
            input = ""
        }        
    }  

    const gov = () => {
        executeClient ('petrol.gov');
    }

    const full = () => {
        executeClient ('petrol.full');
    }

    const yes = () => {
        executeClient ('petrol', parseInt(litersToFill));
    }

    const no = () => {
        executeClient ('closePetrol');
    }
    // const litersRange = document.getElementById('litersRange');
    // const selectedLiters = document.getElementById('selectedLiters');

    // litersRange.addEventListener('input', function() {
    // selectedLiters.textContent = `${litersRange.value} л.`;
    // });
    let litersToFill = 0;

    function handleSliderChange(event) {
        litersToFill = event.target.value;
    }
</script>

<!-- <div class="petrol-menu">
    <input maxLength="3" bind:value={input} />
    <div class="btns">
        <div class="btn gov" on:click={gov}></div>
        <div class="btn full" on:click={full}></div>
        <div class="btn yes" on:click={yes}></div>
        <div class="btn no" on:click={no}></div>
    </div>
</div> -->
<div class="petrol-menu">
    <div class="petrol__panel">
        <div class="petrol__header">
            <span style="margin-left: 12%;">Заправка</span>
            <img src={icon} alt="icon" style="margin-left: -33%;margin-top: 0.8%;">
            <img src={exit} alt="exit" style="margin-left: 77%;margin-top: 2%;" on:click={no}>
        </div>
        <div class="rielt__mainmenu">
            <div class="rielt__mainmenu_block">
        </div>
        <div class="rielt__mainmenu_center">
            <div class="rielt__rielt_info">
                <div class="rielt__rielt_stat">
                    <div class="rielt__rielt_element" style="width: 626px;height: 116px;margin-left: 17px;">
                        <div class="rielt__gray" style="font-size: 16px;margin-top: 27px;margin-left: 18px;font-weight: 600;">Кол-во литров</div>
                        <div>
                            <input type="range" min="1" max="100" id="litersRange" value={litersToFill} on:input={handleSliderChange} class="slider" style="margin-left: 20px;margin-top: 30px;">
                        </div>
                        <div style="font-size: 16px;margin-top: -20px;margin-left: 558px;font-weight: 600;" id="selectedLiters">{litersToFill} л.</div>
                    </div>
                    <div class="rielt__rielt_element2">
                        <div class="rielt__gray" style="font-size: 16px;margin-top: 65px;font-weight: 600;align-items: center;text-align: center;">Цена за литр</div>
                        <div style="font-size: 20px;font-weight:600;margin-top: -50px;color:#82D84D;align-items: center;text-align: center;">500$</div>
                    </div>
                    <div class="rielt__rielt_element3">
                        <div class="rielt__gray" style="font-size: 16px;margin-top: 65px;font-weight: 600;align-items: center;text-align: center;">Уже залито</div>
                        <div style="font-size: 20px;font-weight:600;margin-top: -50px;margin-left: 5px;color:#FF1E54;align-items: center;text-align: center;">15 л.</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rielt__mainmenu_block">
         
        </div>
    </div>
    <div class="box-between">
        <div class="house__bottom_left" style="display: grid;">
            <div class="house_bottom_buttons100" on:click={yes}>
                <div style="font-weight: 600;font-size: 22px;text-shadow: rgba(0,0,0.27) 0 0 20px;margin-top: 27px;margin-left: 30px;align-items:left;text-align:left;">Оплатить</div>
                <div style="font-weight: 600;font-size: 22px;text-shadow: rgba(0,0,0.27) 0 0 35px;vertical-align: middle;display:flex;margin-top: -35px;margin-left: 80%;color:#4CB943;background: #FFFFFF;border-radius: 5px;width: 103px;height: 45px;align-items: center;text-align: center;justify-content: center;">500$</div>
            </div>
            <div class="house_bottom_buttons200" on:click={gov}>
                <div style="font-weight: 600;font-size: 22px;text-shadow: rgba(0,0,0.27) 0 0 20px;margin-top: 27px;margin-left: 30px;align-items:left;text-align:left;">GOV Оплата</div>
                <div style="gap:5px;font-weight: 600;font-size: 22px;text-shadow: rgba(0,0,0.27) 0 0 35px;vertical-align: middle;display:flex;margin-top: -35px;margin-left: 73%;color:#4CB943;background: #FFFFFF;border-radius: 5px;width: 146px;height: 45px;align-items: center;text-align: center;justify-content: center;">0$ <a style="opacity:50%;text-decoration: line-through;"> 500$</a></div>
            </div>
        </div>
    </div>
    </div>
</div>