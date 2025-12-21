//Mappings between Danish UI field values and backend API enum values.
// These correspond to the form fields in practical.jsx and catalogue.jsx.

// Execution type mapping (Udseende - Vælg Udførsel)
// Determines if door uses veneer (38mm core) or shelling (25mm core)
export const EXECUTION_MAPPINGS = {
    "Forskalling": "SOLID_WOOD",
    "Finér: Bookmatched": "VENEER_BOOKMATCHED",
    "Finér: Kaotisk": "VENEER_CHAOTIC"
};

// Treatment type mapping (Udseende - Vælg Behandling)
export const TREATMENT_MAPPINGS = {
    "Pure": "PURE",
    "Natural": "NATURAL",
    "White 5%": "WHITE_5_PERCENT"
};

// Patch color mapping (Udseende - Vælg Lappe Farve)
export const PATCH_COLOR_MAPPINGS = {
    "Sort": "BLACK",
    "Valnød": "WALNUT",
    "Snedkerens Valg": "CARPENTERS_CHOICE"
};

// Naturalness level mapping (Udseende - Vælg Naturlighed)
export const NATURALNESS_MAPPINGS = {
    "Ren": "PURE",
    "Naturlig: Mild": "NATURAL_MILD",
    "Naturlig: Mellem": "NATURAL_MEDIUM",
    "Naturlig: Høj": "NATURAL_HIGH"
};

// Door bottom selection mapping (renamed from Tætningsbånd)
// Maps to hasBottomSeal and hasThreshold booleans
export const DOOR_BOTTOM_MAPPINGS = {
    "Ingen": { hasBottomSeal: false, hasThreshold: false },
    "Bundliste": { hasBottomSeal: true, hasThreshold: false },
    "Bundstykke": { hasBottomSeal: false, hasThreshold: true }
};

// Wood type mapping (Træsort selections)
export const WOOD_TYPE_MAPPINGS = {
    "Eg": "OAK",
    "Douglas": "DOUGLAS"
};

// Hinge side mapping (Hængselside)
export const HINGE_SIDE_MAPPINGS = {
    "venstre": "LEFT",
    "hojre": "RIGHT"
};

// Sealant gap mapping (Fuge luft) - converts mm to cm
export const SEALANT_GAP_MAPPINGS = {
    "5mm": 0.5,
    "10mm": 1.0
};

// Hinge mapping (Hardware - Vælg Hængsel)
export const HINGE_MAPPINGS = {
    "Tectus TE 340 3D": "HINGE_TECTUS",
    "Hamborghængsel": "HINGE_HAMBORG"
};

// Lock mapping (Hardware - Vælg Låsekasse)
export const LOCK_MAPPINGS = {
    "Boda 2014": "LOCK_BODA2014",
    "Arrone AR3313": "LOCK_ARRONE3313"
};

// Frame material mapping (Træsort - Vælg Karm)
export const FRAME_MATERIAL_MAPPINGS = {
    "Eg": "FRAME_OAK_54MM",
    "Douglas": "FRAME_DOUGLAS_54MM",
    "Som dørflade": null  // Will be resolved based on dørflade selection
};

// Door edge mapping (Træsort - Vælg Dørkant)
export const DOOR_EDGE_MAPPINGS = {
    "Eg": "OAK",
    "Douglas": "DOUGLAS",
    "Som dørflade": null  // Will be resolved based on dørflade selection
};

// Field labels for display in OrderSummary
// Moved from orderoverview.jsx fieldLabels object
export const FIELD_LABELS = {
    // Practical measurements
    hulmaalLength: "Hulmål Længde",
    hulmaalWidth: "Hulmål Bredde",
    hulmaalThickness: "Hulmål Tykkelse",
    fugeLuft: "Fuge luft",
    haengselSide: "Hængselside",
    karmOffsetMinus: "Karm Offset Minus",
    karmOffsetPlus: "Karm Offset Plus",
    antal: "Antal",
    note: "Note",

    // Wood selections
    "dørflade": "Dørflade",
    "dørkant": "Dørkant",
    "karm": "Karm",

    // Appearance
    "udførsel": "Udførsel",
    "naturlighed": "Naturlighed",
    "lappe farve": "Lappe farve",
    "behandling": "Behandling",

    // Hardware
    "hængsel": "Hængsel",
    "låsekasse": "Låsekasse",
    "dørebund": "Døre Bund"
};

// Field groups for organized display
// Moved from orderoverview.jsx groups object
export const FIELD_GROUPS = {
    door: {
        title: "Dørvalg:",
        fields: [
            "dørflade",
            "udførsel",
            "dørkant",
            "karm",
            "naturlighed",
            "lappe farve",
            "behandling",
        ],
    },
    hardware: {
        title: "Beslag & Hardware:",
        fields: ["hængsel", "låsekasse", "dørebund"],
    },
    practical: {
        title: "Praktiske Mål:",
        fields: [
            "hulmaalLength",
            "hulmaalWidth",
            "hulmaalThickness",
            "fugeLuft",
            "haengselSide",
            "karmOffsetMinus",
            "karmOffsetPlus",
            "antal",
            "note",
        ],
    },
};


// Check if execution type uses shelling (SOLID_WOOD) vs veneer
export function isShelling(executionValue) {
    const mapped = EXECUTION_MAPPINGS[executionValue];
    return mapped === "SOLID_WOOD";
}
