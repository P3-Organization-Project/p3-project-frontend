
// Material codes mapping to backend database entries.
// These codes correspond to the 'code' field in the materials database.


// Cores: CORE_LISOCORE_38MM (veneer), CORE_LISOCORE_25MM (shelling)
// Veneers: VENEER_OAK, VENEER_DOUGLAS
// Shellings: MASSIVE_OAK_SHELL, MASSIVE_DOUGLAS_SHELL
// Frames: FRAME_OAK_54MM, FRAME_DOUGLAS_54MM
// Hardware: HINGE_TECTUS, HINGE_HAMBORG, LOCK_BODA2014, LOCK_ARRONE3313, BOTTOM_SEAL_SCHALL

// Core materials - selected based on execution type
export const CORE_CODES = {
    VENEER: "CORE_LISOCORE_38MM",      // 38mm for veneered doors
    SHELLING: "CORE_LISOCORE_25MM"     // 25mm for massive shell doors
};

// Veneer materials by wood type
export const VENEER_CODES = {
    OAK: "VENEER_OAK",
    DOUGLAS: "VENEER_DOUGLAS"
};

// Shelling (massive shell) materials by wood type
export const SHELLING_CODES = {
    OAK: "MASSIVE_OAK_SHELL",
    DOUGLAS: "MASSIVE_DOUGLAS_SHELL"
};

// Frame materials by wood type
export const FRAME_CODES = {
    OAK: "FRAME_OAK_54MM",
    DOUGLAS: "FRAME_DOUGLAS_54MM"
};

// Hardware codes
export const HINGE_CODES = {
    "Tectus TE 340 3D": "HINGE_TECTUS",
    "Hamborghængsel": "HINGE_HAMBORG"
};

export const LOCK_CODES = {
    "Boda 2014": "LOCK_BODA2014",
    "Arrone AR3313": "LOCK_ARRONE3313"
};

// Seal code - always required, single option
export const SEAL_CODE = "BOTTOM_SEAL_SCHALL";

// Frame thickness - always 0.54, no variation
export const DEFAULT_FRAME_THICKNESS_CM = 0.54;

// Wood type enum for internal use
export const WOOD_TYPES = {
    OAK: "OAK",
    DOUGLAS: "DOUGLAS"
};

// Door type enum
export const DOOR_TYPES = {
    SINGLE: "SINGLE",
    DOUBLE: "DOUBLE"
};

// Hinge side enum
export const HINGE_SIDES = {
    LEFT: "LEFT",
    RIGHT: "RIGHT"
};

// Opening direction enum
export const OPENING_DIRECTIONS = {
    INWARD: "INWARD",
    OUTWARD: "OUTWARD"
};

// Deal status enum
export const DEAL_STATUS = {
    LEAD: "LEAD",
    PERFORMA: "PERFORMA",
    FINISH: "FINISH"
};
