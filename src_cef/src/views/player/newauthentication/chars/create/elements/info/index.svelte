<script>
    import { gender, updateGender, customization, updateParents, updateShapeMix, updateSkinTone, FirstName, updateFirstName, LastName, updateLastName } from 'store/customization';;
    import ParentsButton from './parentsbutton.svelte';
    import InputBlock from './../input_item.svelte';
    import InputCustom from 'components/input/oneInput.svelte'
    import { selectIndex, selectType, settings } from './../../../store.js';

    const onSelectSlot = () => {
        selectIndex.set (charid);
        selectType.set (settings.buy);
    }
    
    // updateGender (true);

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

    let activeItem = 0;
    const handleKeyUp = (event) => {
        const { keyCode } = event;
        switch(keyCode) {
            case 38: // up
                if(--activeItem < 0)
                    activeItem = 1;
                break;
            case 40: // down
                if(++activeItem >= 2)
                    activeItem = 0;
                break;
        }
    }

    let customization_image_use = 1;
    $: if (activeItem === 0 || activeItem === 1) {
        customization_image_use = activeItem;
    }
</script>

<svelte:window on:keyup={handleKeyUp} />


<div class="CharsHa">          
    <div class="nameR">
        <p>Придумайте имя</p>
        <span><InputCustom cl="createchar_input" setValue={(value) => FirstNameLocal = value} value={FirstNameLocal} placeholder="Имя" type="text" /></span>
    </div>
</div>

<div class="CharsHa">          
    <div class="nameR">
        <p>Придумайте фамилию</p>
        <span><InputCustom cl="createchar_input" setValue={(value) => LastNameLocal = value} value={LastNameLocal} placeholder="Фамилия" type="text" /></span>
    </div>
</div>

<div class="CharsHa">          
    <div class="nameR">
        <p>Выберите пол</p>
        <div class="genderlist">
            <div class="genderman" class:active={$gender} on:keypress={() => {}} on:click={() => updateGender ($selectIndex, true)}><span></span>Мужской </div>
            <div class="genderfem" class:active={!$gender} on:keypress={() => {}} on:click={() => updateGender ($selectIndex, false)}><span></span>Женский</div>
        </div>
    </div>
</div>

<div class="CharsSHa">                
    <div class="nameR">
        <span>Мать / Отец</span><p>Родители</p>
    </div>   
    <div class="imgSR">
        <img class="left" src="{document.cloud + `img/parents/${$customization.motherId}.png`}" alt=""/>
        <img class="right" src="{document.cloud + `img/parents/${$customization.fatherId}.png`}" alt=""/>
    </div>
    <div class="selectSR">
        <div class="left" class:active={activeItem === 0} on:keypress={() => {}} on:click={() => activeItem = 0}>
            <ParentsButton
                gender={false}
                value={$customization.motherId}
                active={activeItem === 1}
                onChange={newparent => updateParents($gender, newparent, $customization.fatherId)} />    
        </div>
        <div class="right" class:active={activeItem === 1} on:keypress={() => {}} on:click={() => activeItem = 1}>
            <ParentsButton
                gender={true}
                value={$customization.fatherId}
                active={activeItem === 0}
                onChange={newparent => updateParents($gender, $customization.motherId, newparent)} />
        </div>
    </div>
</div>

<div class="CharsHa">          
    <div class="nameR">
        <p>Схожесть</p>
        <InputBlock
            id="shapemix"
            leftIcon="auth-mother"
            rightIcon="auth-father"
            step={0.1}
            min={0}
            max={1}
            value={$customization.shapeMix}
            callback={newvalue => updateShapeMix($gender, newvalue)} />
    </div>
</div>