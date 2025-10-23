export type Npc = "Guide" | "Demolitionist" | "Party Girl" | "Tax Collector";

export type NpcName =
    // Guide
    | "Joe" | "Connor" | "Tanner" | "Wyatt" | "Cody" | "Levi" | "Luke" | "Jack"
    | "Scott" | "Logan" | "Cole" | "Asher" | "Bradley" | "Jacob" | "Garrett"
    | "Dylan" | "Maxwell" | "Steve" | "Brett" | "Andrew" | "Harley" | "Kyle"
    | "Jake" | "Ryan" | "Jeffrey" | "Seth" | "Marty" | "Brandon" | "Zach"
    | "Jeff" | "Daniel" | "Trent" | "Kevin" | "Brian" | "Colin" | "Jan"

    // Demolitionist
    | "Dolbere" | "Bazdin" | "Durim" | "Tordak" | "Garval" | "Morthal"
    | "Oten" | "Dolgen" | "Gimli" | "Gimut" | "Duerthen" | "Beldin" | "Jarut"
    | "Ovbere" | "Norkas" | "Dolgrim" | "Boften" | "Norsun" | "Dias" | "Fikod"
    | "Urist" | "Darur"

    // Party Girl
    | "Candy" | "Isis" | "Trixy" | "Destiny" | "Lexus" | "Bambi" | "Bailey"
    | "Glitter" | "Sparkle" | "Paris" | "Dazzle" | "Fantasy" | "Bunny"
    | "Sugar" | "Fantasia" | "Star" | "Cherry" | "Amanda"

    // Tax Collector
    | "McKinly" | "Millard" | "Fillmore" | "Rutherford" | "Chester" | "Grover"
    | "Cleveland" | "Theodore" | "Herbert" | "Warren" | "Lyndon" | "Ronald"
    | "Harrison" | "Woodrow" | "Tweed" | "Blanton" | "Dwyer" | "Carroll" | "Agnew";

export type NameRngMap = Record</*NpcName*/ string, number>;

export type NpcChoicesMap = Record<Npc, { value: NpcName; label: NpcName }[]>

export const WorldSize = {
    Small: 0,
    Medium: 1,
    Large: 2
} as const;

export type WorldSize = (typeof WorldSize)[keyof typeof WorldSize];