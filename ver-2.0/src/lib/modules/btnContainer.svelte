<script>
    import { Buildings, Lab } from '$lib/classes/buildings';
    import { checkTech } from '$lib/classes/tech';
    import { Units } from '$lib/classes/units';
    import { createEventDispatcher } from 'svelte';

    export let game;

    $: nowPlayer = game.playerList[game.turn];

    let showBuildDiv = false;

    function toggleBuildDiv() {
        showBuildDiv = !showBuildDiv;
    }

    let showProduceDiv = false;

    function toggleProduceDiv() {
        showProduceDiv = !showProduceDiv;
    }

    const dispatch = createEventDispatcher();

    function clickProduceBtn(produceEn) {
        dispatch('produce', {
            produceEn: produceEn,
        });
    }

    function clickBuildBtn(buildEn, labTrack = null) {
        dispatch('build', {
            buildEn: buildEn,
            labTrack: labTrack,
        });
    }
</script>

<div id="btnContainer">
    <button on:click={toggleBuildDiv}>건설</button>
    <button on:click={toggleProduceDiv}>생산</button>
</div>

{#if showBuildDiv}
    <div class="layer" on:keypress={() => {}} on:click={toggleBuildDiv}>
        <div>
            {#if nowPlayer.units['일꾼'] >= 1}
                {#if Buildings['factory'].cost <= nowPlayer.energy}
                    <button
                        on:click={() => {
                            clickBuildBtn('factory');
                        }}>공장</button
                    >
                {/if}
                {#if Buildings['thermalPower'].cost <= nowPlayer.energy}
                    <button
                        on:click={() => {
                            clickBuildBtn('thermalPower');
                        }}>화력 발전소</button
                    >
                {/if}
                {#if checkTech(nowPlayer.tech, 6) && Buildings['windPower'].cost <= nowPlayer.energy}
                    <button
                        on:click={() => {
                            clickBuildBtn('windPower');
                        }}>풍력 발전소</button
                    >
                {/if}
                {#if checkTech(nowPlayer.tech, 10) && Buildings['solarPower'].cost <= nowPlayer.energy}
                    <button
                        on:click={() => {
                            clickBuildBtn('solarPower');
                        }}>태양광 발전소</button
                    >
                {/if}
                {#if checkTech(nowPlayer.tech, 14) && Buildings['atomicPower'].cost <= nowPlayer.energy}
                    <button
                        on:click={() => {
                            clickBuildBtn('atomicPower');
                        }}>원자력 발전소</button
                    >
                {/if}
            {/if}
        </div>

        <div>
            {#if Buildings['lab'].cost <= nowPlayer.energy}
                <button
                    on:click={() => {
                        clickBuildBtn('lab', 'material');
                    }}>신소재 연구소</button
                >
                <button
                    on:click={() => {
                        clickBuildBtn('lab', 'hydrogen');
                    }}>수소 연구소</button
                >
                <button
                    on:click={() => {
                        clickBuildBtn('lab', 'grid');
                    }}>그리드 연구소</button
                >
                <button
                    on:click={() => {
                        clickBuildBtn('lab', 'environment');
                    }}>환경기후 연구소</button
                >
                <button
                    on:click={() => {
                        clickBuildBtn('lab', 'ai');
                    }}>AI 연구소</button
                >
            {/if}
        </div>
    </div>
{/if}

{#if showProduceDiv}
    <div class="layer" on:keypress={() => {}} on:click={toggleProduceDiv}>
        {#if nowPlayer.unitList.length < nowPlayer.unitStorage && nowPlayer.buildings['공장'] >= 1}
            {#if Units['probe'].cost <= nowPlayer.energy && nowPlayer.units['일꾼'] < 3}
                <button
                    on:click={() => {
                        clickProduceBtn('probe');
                    }}>일꾼</button
                >
                <!-- {:else if checkTech(nowPlayer.tech, 9) && Units['probe'].cost <= nowPlayer.energy && nowPlayer.units['일꾼'] < 4}
                <button
                    on:click={() => {
                        clickProduceBtn('probe');
                    }}>Probe</button
                > -->
            {/if}
            {#if checkTech(nowPlayer.tech, 7) && Units['windUnit'].cost <= nowPlayer.energy}
                <button
                    on:click={() => {
                        clickProduceBtn('windUnit');
                    }}>재블린</button
                >
            {/if}
            {#if checkTech(nowPlayer.tech, 11) && Units['solarUnit'].cost <= nowPlayer.energy}
                <button
                    on:click={() => {
                        clickProduceBtn('solarUnit');
                    }}>윈체스터</button
                >
            {/if}
            {#if checkTech(nowPlayer.tech, 15) && Units['atomicUnit'].cost <= nowPlayer.energy}
                <button
                    on:click={() => {
                        clickProduceBtn('atomicUnit');
                    }}>트리니티</button
                >
            {/if}
            {#if checkTech(nowPlayer.tech, 17) && Units['missile'].cost <= nowPlayer.energy}
                <button
                    on:click={() => {
                        clickProduceBtn('missile');
                    }}>ICBM</button
                >
            {/if}
        {/if}
    </div>
{/if}

<style>

    #btnContainer {
        position: fixed;
        bottom: 0;
        left: 40%;
        z-index: 1;
        margin: .5rem;
    }

    button {
        font-size: 2rem;
        padding: .8rem 2.2rem;
        margin: .5rem;
        background-color: rgba(255, 255, 255, 0.9);
        border: black solid .2rem;
        border-radius: .5rem;
    }

    button:hover {
        background-color: rgba(230, 230, 230, 0.9);
        cursor: pointer;
    }

    .layer {
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .layer > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
