import NpcNames from "./npcNames.json";
import Choices from 'choices.js';
import computeAetherPositionData from "./rng.ts";
import {type Npc, type NpcChoicesMap, type NpcName, WorldSize} from "./types.ts";

let worldSize: WorldSize = WorldSize.Small;
let isJungleLeft: boolean = true;
let currentNpc: Npc = "Guide";
let npcName: NpcName = "Joe";

const coordinatesElement = document.getElementById("coordinates")!;
const screensOffsetElement = document.getElementById("screens-offset")!;
const worldRadios = document.querySelectorAll<HTMLInputElement>('input[name="world-size"]');
const jungleRadios = document.querySelectorAll<HTMLInputElement>('input[name="jungle-side"]');
const npcRadios = document.querySelectorAll<HTMLInputElement>('input[name="npc"]');

worldRadios.forEach(radio => radio.addEventListener('change', (event) => {
    worldSize = Number((event.target as HTMLInputElement).value) as WorldSize;
    updateOutput();
}));

jungleRadios.forEach(radio => radio.addEventListener('change', (event) => {
    isJungleLeft = (event.target as HTMLInputElement).value == "0";
    updateOutput();
}));

const nameSelect = document.getElementById("name") as HTMLSelectElement;
const nameChoice = new Choices(nameSelect, {
    searchEnabled: true,
    itemSelectText: '',
    // We sort them manually below
    shouldSort: false
});

// Please donald trump
const npcChoicesMap: NpcChoicesMap =
    Object.fromEntries(
        Object.entries(NpcNames).map(([npc, names]) => [
            npc as Npc,
            (names as NpcName[]).slice().sort().map(
                name => ({ value: name, label: name })
            )
        ])
    ) as NpcChoicesMap;

function updateNpcChoices() {
    nameChoice.clearInput();
    nameChoice.clearStore();

    const choices = npcChoicesMap[currentNpc];
    nameChoice.setChoices(
        choices,
        /*value*/ "value",
        /*label*/ "label",
        /* replaceChoices */ true
    );
    nameChoice.setChoiceByValue(choices[0].value);
}

npcRadios.forEach(radio => {
    radio.addEventListener("click", () => {
        if (radio.value != currentNpc) {
            currentNpc = radio.value as Npc;
            updateNpcChoices();

            npcName = nameChoice.getValue(/*valueOnly*/ true) as NpcName;
            updateOutput();
        }

        nameChoice.showDropdown();
        nameChoice.input.element.focus();
    });
});

nameSelect.addEventListener("change", () => {
    npcName = nameChoice.getValue(/*valueOnly*/ true) as NpcName;
    updateOutput();
});

function updateOutput() {
    const { coordinates, screensOffset } = computeAetherPositionData(worldSize, isJungleLeft, npcName);
    const moveDirection = screensOffset < 0 ?
        isJungleLeft ? "away from" : "into" :
        isJungleLeft ? "into" : "away from";

    coordinatesElement.textContent = `${coordinates}' ${isJungleLeft ? "West" : "East"}`;
    screensOffsetElement.textContent = `${Math.abs(screensOffset).toFixed(2)} screens ${moveDirection} the ocean biome.`;
}

updateNpcChoices();
updateOutput();