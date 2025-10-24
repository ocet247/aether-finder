import NpcNames from "./npcNames.json";
import {type NameRngMap, type NpcName, WorldSize} from "./types.ts";

const namesRng: NameRngMap = {};
function addNamesToRng(names: NpcName[]): void{
    const step = 1.0 / names.length;
    let current = step / 2;
    for (const name of names) {
        namesRng[name] = current;
        current += step;
    }
}

for (const singleNpcNames of Object.values(NpcNames) as NpcName[][]) {
    addNamesToRng(singleNpcNames);
}


export default function computeAetherPositionData(worldSize: WorldSize, isJungleLeft: boolean, npcName: NpcName): { coordinates: number, screensOffset: number } {
    const coordinates = getAetherCoordinates(worldSize, isJungleLeft, npcName);
    const screensOffset = getOceanScreenOffset(worldSize, coordinates);

    return { coordinates, screensOffset }
}


function getAetherCoordinates(worldSize: WorldSize, isJungleLeft: boolean, npcName: NpcName): number {
    const rngValue = namesRng[npcName];

    switch (worldSize) {
    case WorldSize.Small:
        return Math.round(isJungleLeft ?
                3800 - 524 * rngValue :
                3276 + 524 * rngValue);
    case WorldSize.Medium:
        return Math.round(isJungleLeft ?
                6000 - 1008 * rngValue :
                4992 + 1008 * rngValue);
    case WorldSize.Large:
        return Math.round(isJungleLeft ?
                8000 - 1448 * rngValue :
                6552 + 1448 * rngValue);
    default:
        return NaN;
    }
}

function getOceanScreenOffset(worldSize: WorldSize, aetherCoordinates: number) {
    const screenLength = 242;

    switch (worldSize) {
    case WorldSize.Small:  return (aetherCoordinates - 3440) / screenLength;
    case WorldSize.Medium: return (aetherCoordinates - 5640) / screenLength;
    case WorldSize.Large:  return (aetherCoordinates - 7640) / screenLength;
    default: return NaN;
    }
}