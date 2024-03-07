<script>
    import { translateText } from 'lang'
    import { executeClient } from 'api/rage'
    import { charLVL, charWorkID } from 'store/chars';

    import icon from './icon.png'
    import lock from './lock.png'
    import taxi from './taxi.png'
    import exit from './exit.png'
    import PadUnlock from './assets/images/padlock-unlock.svg';
    import PadLock from './assets/images/lock.svg';
    import './style.css'
    import {hasJsonStructure} from "api/functions";


    export let viewData;

    if (hasJsonStructure (viewData))
        viewData = JSON.parse(viewData);

    let list = [
            {class: "electro", name: translateText('player', 'Электрик'), level: 0, jobid: 1},
            {class: "kosilka", name: translateText('player', 'Газонокосильщик'), level: 0, jobid: 5},
            {class: "pochta", name: translateText('player', 'Почтальон'), level: 0, jobid: 2},
            {class: "taxi", name: translateText('player', 'Таксист'), level: 0, jobid: 3},
            {class: "bus", name: translateText('player', 'Водитель автобуса'), level: 0, jobid: 4},
            {class: "mechanic", name: translateText('player', 'Автомеханик'), level: 0, jobid: 8},
            {class: "truck", name: translateText('player', 'Дальнобойщик'), level: 1, jobid: 6},
            {class: "inkos", name: translateText('player', 'Инкассатор'), level: 1, jobid: 7},
        ];

    const selectJob = (selectedjob) => {
        executeClient ("selectJob", selectedjob);
    }
    const closeJobMenu = () => {
        executeClient ("closeJobMenu");
    }
    
</script> 

<!-- <div class="joblist">
    <div class="adaptive">
        <div class="boxtop">
            <div class="box">
                <div class="header"> 
                    <div on:click={closeJobMenu} class="arrow"></div>
                    <p class="txtheader">{translateText('player', 'Устроиться на работу')}</p>
                </div>
                <div class="workbox">
                    {#each list as forjob, index}
                    <div key={index} class={"workboxes " + forjob.class}>
                        <div class="inkoslvl">
                            <p class="textlvl">LVL</p>
                            <p class="textlvl2">{viewData[forjob.jobid]}</p>
                        </div>
        
                        <div class="worktoptxt ">
                            <p class="textboxwork"></p> {forjob.name}
        
                            {#if viewData[forjob.jobid] <= $charLVL}
                            <div class="jobstatus">
                                <img class="workimg" src={PadUnlock} alt="PadUnlock"/>
                                <p class="worktextopen">{translateText('player', 'Открыто')}</p>
                            </div>   
                            {:else}
                            <div class="jobstatus">
                                <img class="workimg" src={PadLock} alt="PadLock"/>
                                <p class="worktextopen">{translateText('player', 'Закрыто')}</p>
                            </div>
                            {/if}
                        </div>

                        {#if (viewData[forjob.jobid] <= $charLVL)}
                            {#if (forjob.jobid == $charWorkID)}
                                <div>
                                    <div class="buttongetsettledred" on:click={() => selectJob(-1)}>
                                        <p сlass="buttontxtgetsettled">{translateText('player', 'Уволиться')}</p>
                                    </div>
                                </div>
                            {:else}
                                <div>
                                    <div class="buttongetsettled" on:click={() => selectJob(forjob.jobid)}>
                                        <div сlass="buttontxtgetsettled">{translateText('player', 'Устроиться')}</div>
                                    </div>
                                </div>
                            {/if}
                        {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div> -->
<div class="jobselector-menu">
    <div class="jobselector__panel">
        <div class="jobselector__header">
            <div style="margin-left: -12%;white-space: nowrap;width:700px">ТРУДОУСТРОЙСВО</div>
            <img src={icon} alt="icon" style="margin-left: -54%;margin-top: 0.8%;">
            <img src={exit} alt="exit" style="margin-left: 85%;margin-top: 2%;" on:click={closeJobMenu}>
        </div>
        <div class="jobselector__mainmenu">
            <div class="jobselector__mainmenu_block">
        </div>
        <div class="scrollable-container">
        <div class="jobselector__mainmenu_center">
            <div class="jobselector__jobselector_info">
                <div class="jobselector__jobselector_stat" style="display: grid;max-width: 300px;">
                    <div class="jobselector__jobselector_element">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Электрик</div>
                        <div class="batton" on:click={() => selectJob(1)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
                    <div class="jobselector__jobselector_element2">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Газонокосильщик</div>
                        <div class="batton" on:click={() => selectJob(5)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
                    <div class="jobselector__jobselector_element">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Таксист</div>
                        <div class="batton" on:click={() => selectJob(3)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
                    <div class="jobselector__jobselector_element2">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Водитель автобуса</div>
                        <div class="batton" on:click={() => selectJob(4)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
                    <div class="jobselector__jobselector_element3">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Почтальон</div>
                        <div class="batton" on:click={() => selectJob(2)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
                    <div class="jobselector__jobselector_element4">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Автомеханик</div>
                        <div class="batton" on:click={() => selectJob(8)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
                    <div class="jobselector__jobselector_element">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Дальнобойщик</div>
                        <div class="batton" on:click={() => selectJob(6)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
                    <div class="jobselector__jobselector_element2">

                        <div class="container2">
                            <img src={lock} alt="lock" class="image2">
                        </div>
                        <div class="container">
                            <img src={taxi} alt="texi" class="image">
                        </div>
                        <div class="jobselector__gray" style="font-size: 20px;margin-top: -165px;margin-left: 49px;font-weight: 700;">Инкассатор</div>
                        <div class="batton" on:click={() => selectJob(7)} style="gap:5px;font-size: 14px;margin-top: 200px;margin-left: 42%;font-weight: 700;width: 158px;height: 40px;border-radius: 6px;text-align: center;align-items: center;display: flex;justify-content: center;letter-spacing: 0.5px;"><a> УСТРОИТЬСЯ</a></div>
                    </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
</div>