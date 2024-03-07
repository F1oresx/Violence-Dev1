<script>
    import { selectChar } from './../store.js';
    import { format } from 'api/formatter'
    import fraction from 'json/fraction.js'
    import { translateText } from 'lang'
    import Spawn from './spawn.svelte'


</script>

<Spawn {...$selectChar.Data} isBan={$selectChar.ban} />

<div class="rightchars">
    <div class="HeadR">
        <h1>Статистика<br><b>{$selectChar.Data.FirstName} {$selectChar.Data.LastName}</b></h1> 
    </div>
    <div class="ListR">   
        <div class="CharsHa">
            <div class="nameR">
                <p>Денег на руках</p>
                <span>{format("money", $selectChar.Data.Money)} $</span>
            </div>
        </div>
        <div class="CharsHa">
            <div class="nameR">
                <p>Денег в банке</p>
                <span>{format("money", $selectChar.Data.BankMoney)} $</span>
            </div>
        </div>
        <div class="CharsHa">
            <div class="nameR">
                <p>Фракция</p>
                <span>{fraction[$selectChar.Data.FractionID]}</span>
            </div>
        </div>
        {#if $selectChar.ban && $selectChar.ban.Reason}
            <div class="CharsHa">
                <div class="nameR">
                    <p>Причина</p>
                    <span>{$selectChar.ban.Reason}</span>
                </div>
            </div>
            <div class="CharsHa">
                <div class="nameR">
                    <p>Забанил</p>
                    <span>{$selectChar.ban.Admin}</span>
                </div>
            </div>
            <div class="CharsHa">
                <div class="nameR">
                    <p>Дата бана</p>
                    <span>{$selectChar.ban.Time}</span>
                </div>
            </div>
            <div class="CharsHa">
                <div class="nameR">
                    <p>Дата разбана</p>
                    <span>{$selectChar.ban.Until}</span>
                </div>
            </div>
        {/if}
    </div>
</div>