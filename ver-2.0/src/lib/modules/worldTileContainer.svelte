<script>
    import building_0 from '$lib/assets/building_0.png';
    import building_1 from '$lib/assets/building_1.png';
    import building_2 from '$lib/assets/building_2.png';
    import building_3 from '$lib/assets/building_3.png';
    import building_4 from '$lib/assets/building_4.png';
    import building_5 from '$lib/assets/building_5.png';

    import unit_0 from '$lib/assets/unit_0.png';
    import unit_1 from '$lib/assets/unit_1.png';
    import unit_2 from '$lib/assets/unit_2.png';
    import unit_3 from '$lib/assets/unit_3.png';
    import unit_4 from '$lib/assets/unit_4.png';
    import unit_5 from '$lib/assets/unit_5.png';

    import water from '$lib/assets/water.png';
    import ground from '$lib/assets/ground.png';
    import mountain from '$lib/assets/mountain.png';
    import fuel from '$lib/assets/fuel.png';
    import { getPositionStyle } from '$lib/utils/posFunctions';
    import { createEventDispatcher } from 'svelte';
    import { Lab } from '$lib/classes/buildings';

    export let game;

    const unitImgList = [unit_0, unit_1, unit_2, unit_3, unit_4, unit_5];
    const buildingImgList = [
        building_0,
        building_1,
        building_2,
        building_3,
        building_4,
        building_5,
    ];

    const playerTextColorList = [
        'white',
        'black',
        'white',
        'white',
        'white',
        'black',
    ];

    const line = Array.from(
        { length: 2 * game.world.size - 1 },
        (v, i) => i - game.world.size + 1
    );

    const dispatch = createEventDispatcher();

    function clickAir() {
        dispatch('air', {});
    }

    let clickedUnit = null;

    function clickUnit(unit) {
        if (clickedUnit !== unit) {
            clickedUnit = unit;
            dispatch('move', {
                unit: unit,
            });
        } else {
            clickedUnit = null;
            dispatch('move', {
                unit: null,
            });
        }
    }

    function getLabName(track) {
        if (track === 'material') {
            return '신소재';
        } else if (track === 'hydrogen') {
            return '수소';
        } else if (track === 'environment') {
            return '환경';
        } else if (track === 'grid') {
            return '그리드';
        } else if (track === 'ai') {
            return 'AI';
        }
    }

    function destroyBuilding(building) {
        let floor = 1;
        if (building.floor !== undefined) {
            floor = building.floor;
        }
        if (confirm(`이 건물을 파괴하시겠습니까? (${floor}층)`)) {
            game.playerList[building.player].energy += building.cost;
            game.buildingList.splice(game.buildingList.indexOf(building), 1);
            dispatch('game', {
                game: game.gameObj,
            });
        }
    }
</script>

{#each line as x}
    {#each line as y}
        {#each line as z}
            {#if x + y + z === 0}
                {#if game.world.getBiome([x, y, z]).en === 'water'}
                    <button
                        class="tile"
                        style={getPositionStyle([x, y, z], 'biome')}
                        on:click={clickAir}
                    >
                        <img src={water} alt="alt" />
                    </button>
                {:else if game.world.getBiome([x, y, z]).en === 'ground'}
                    <button
                        class="tile"
                        style={getPositionStyle([x, y, z], 'biome')}
                        on:click={clickAir}
                    >
                        <img src={ground} alt="alt" />
                    </button>
                {:else if game.world.getBiome([x, y, z]).en === 'mountain'}
                    <button
                        class="tile"
                        style={getPositionStyle([x, y, z], 'biome')}
                        on:click={clickAir}
                    >
                        <img src={mountain} alt="alt" />
                    </button>
                {:else}
                    <button
                        class="tile"
                        style={getPositionStyle([x, y, z], 'biome')}
                        on:click={clickAir}
                    >
                        <img src={fuel} alt="alt" />
                        <p
                            style="position: absolute; color: black; font-weight: bold; text-align: center; margin: 0; font-size: .3rem;"
                        >
                            {game.world.getBiome([x, y, z]).amount}
                        </p>
                    </button>
                {/if}
            {/if}
        {/each}
    {/each}
{/each}

{#each game.playerList as player}
    {#each player.unitList as unit}
        <button
            class="tile unit"
            style={getPositionStyle(unit.pos, 'unit')}
            on:click={() => clickUnit(unit)}
        >
            <p
                style="position: absolute; color: {playerTextColorList[
                    player.index
                ]}; text-align: center; margin: 0; font-size: .15rem;"
            >
                {unit.kr}
            </p>
            <img src={unitImgList[player.index]} alt="alt" />
        </button>
    {/each}

    {#each player.buildingList as building}
        {#if building instanceof Lab}
            <button
                class="tile building"
                style={getPositionStyle(building.pos, 'building')}
                on:click={() => {
                    destroyBuilding(building);
                }}
            >
                <p
                    style="position: absolute; color: {playerTextColorList[
                        player.index
                    ]}; text-align: center; margin: 0;"
                >
                    {getLabName(building.track)}
                </p>
                <img src={buildingImgList[player.index]} alt="alt" />
            </button>
        {:else}
            <button
                class="tile building"
                style={getPositionStyle(building.pos, 'building')}
                on:click={() => {
                    destroyBuilding(building);
                }}
            >
                <p
                    style="position: absolute; color: {playerTextColorList[
                        player.index
                    ]}; text-align: center; margin: 0;"
                >
                    {building.kr}
                </p>
                <img src={buildingImgList[player.index]} alt="alt" />
            </button>
        {/if}
    {/each}
{/each}

<style>
    button:focus {
        outline: none;
    }

    .tile {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        border: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
    }

    .tile > img {
        width: 3rem;
    }

    .tile > p {
        font-size: .15rem;
    }

    .unit > img,
    .building > img {
        width: 2rem;
        margin: 0.299rem 0.5rem;
    }
</style>
