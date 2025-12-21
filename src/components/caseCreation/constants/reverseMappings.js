// creates reverse mappings from existing forward mappings
// e.g., { "Eg": "OAK" } becomes { "OAK": "Eg" }

import {
    EXECUTION_MAPPINGS,
    TREATMENT_MAPPINGS,
    PATCH_COLOR_MAPPINGS,
    NATURALNESS_MAPPINGS,
    WOOD_TYPE_MAPPINGS,
    HINGE_SIDE_MAPPINGS,
    SEALANT_GAP_MAPPINGS,
    HINGE_MAPPINGS,
    LOCK_MAPPINGS
} from './fieldMappings';

import {
    VENEER_CODES,
    SHELLING_CODES,
    FRAME_CODES
} from './materialCodes';

// function to  Invert any mapping object
function invertMapping(mapping) {
    return Object.entries(mapping).reduce((acc, [key, value]) => {
        if (value !== null) {
            acc[value] = key;
        }
        return acc;
    }, {});
}

// Inverted mappings the API values to Danish UI values
export const REVERSE_EXECUTION = invertMapping(EXECUTION_MAPPINGS);
// { "SOLID_WOOD": "Forskalling", "VENEER_BOOKMATCHED": "Finér: Bookmatched", ... }

export const REVERSE_TREATMENT = invertMapping(TREATMENT_MAPPINGS);
export const REVERSE_PATCH_COLOR = invertMapping(PATCH_COLOR_MAPPINGS);
export const REVERSE_NATURALNESS = invertMapping(NATURALNESS_MAPPINGS);
export const REVERSE_WOOD_TYPE = invertMapping(WOOD_TYPE_MAPPINGS);
export const REVERSE_HINGE_SIDE = invertMapping(HINGE_SIDE_MAPPINGS);
export const REVERSE_HINGE = invertMapping(HINGE_MAPPINGS);
export const REVERSE_LOCK = invertMapping(LOCK_MAPPINGS);

// Special case: Sealant gap (cm back to mm string)
export const REVERSE_SEALANT_GAP = {
    0.5: "5mm",
    1.0: "10mm"
};

// Material code to wood type (for veneer/frame resolution)
export const REVERSE_VENEER_CODES = invertMapping(VENEER_CODES);
export const REVERSE_SHELLING_CODES = invertMapping(SHELLING_CODES);
export const REVERSE_FRAME_CODES = invertMapping(FRAME_CODES);
