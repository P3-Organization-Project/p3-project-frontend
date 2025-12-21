// Reverse mapper: Converts API response to form state
// Uses inverted mappings from reverseMappings.js

import {
    REVERSE_EXECUTION,
    REVERSE_TREATMENT,
    REVERSE_PATCH_COLOR,
    REVERSE_NATURALNESS,
    REVERSE_WOOD_TYPE,
    REVERSE_HINGE_SIDE,
    REVERSE_SEALANT_GAP,
    REVERSE_HINGE,
    REVERSE_LOCK,
    REVERSE_VENEER_CODES,
    REVERSE_FRAME_CODES,
    reverseDoorBottom
} from './constants/reverseMappings';
// Resolves veneer code back to Danish wood type
function resolveWoodTypeFromVeneer(veneerCode) {
    const woodType = REVERSE_VENEER_CODES[veneerCode];
    return REVERSE_WOOD_TYPE[woodType] || "Eg";
}

// Resolves frame code back to Danish selection
function resolveFrameSelection(frameMaterialCode, doorfaceWoodType) {
    const frameWoodType = REVERSE_FRAME_CODES[frameMaterialCode];

    // If frame wood matches doorface, return "Som dørflade"
    if (frameWoodType === doorfaceWoodType) {
        return "Som dørflade";
    }
    return REVERSE_WOOD_TYPE[frameWoodType] || "Eg";
}

// Converts frame offset back to minus/plus fields
function resolveFrameOffset(offsetCm) {
    if (offsetCm < 0) {
        return { karmOffsetMinus: Math.abs(offsetCm).toString(), karmOffsetPlus: "" };
    }
    if (offsetCm > 0) {
        return { karmOffsetMinus: "", karmOffsetPlus: offsetCm.toString() };
    }
    return { karmOffsetMinus: "", karmOffsetPlus: "" };
}

// Main mapper function
export function mapApiToFormData(apiCase) {
    const doorItem = apiCase.doorItems?.[0];
    const config = doorItem?.doorConfiguration;

    if (!config) {
        return null;
    }

    // Resolve wood type from veneer code
    const doorfaceWoodType = resolveWoodTypeFromVeneer(config.frontVeneerCode);

    // Resolve frame offset
    const offsetFields = resolveFrameOffset(config.frameOffsetCm || 0);

    // Resolve door bottom selection from boolean pair
    const doorBottom = reverseDoorBottom(
        config.hasBottomSeal,  // let reverseDoorBottom handles the null case
        config.frameIncludesThreshold
    );

    // Hinge side from API  opening direction is derived, not stored in form
    const hingeSide = REVERSE_HINGE_SIDE[doorItem.hingeSide] || "venstre";

    return {
        // Customer reference
        customerId: apiCase.customerId,
        customerDetails: apiCase.customer || null,

        // Measurements - direct mapping
        hulmaalWidth: config.wallOpeningWidthCm?.toString() || "",
        hulmaalLength: config.wallOpeningHeightCm?.toString() || "",
        hulmaalThickness: config.wallOpeningDepthCm?.toString() || "",

        // Sealant gap - use reverse mapping
        fugeLuft: REVERSE_SEALANT_GAP[config.sealantGapCm] || "10mm",

        // Hinge side reverse mapping
        haengselSide: hingeSide,

        // Frame offsets - calculated from single value
        ...offsetFields,

        // Quantity hasn't been implemented quantity logic yet
        // Always default to "1" for now
        antal: "1",

        // Note
        note: config.sellerNote || "",

        // Wood selections - use reverse mappings
        "dørflade": doorfaceWoodType,
        "dørkant": REVERSE_WOOD_TYPE[config.doorLeafEdgeWoodType] || "Som dørflade",
        "karm": resolveFrameSelection(config.frameMaterialCode, config.frontVeneerCode),

        // Appearance - use reverse mappings
        "udførsel": REVERSE_EXECUTION[config.execution] || "Finér: Bookmatched",
        "naturlighed": REVERSE_NATURALNESS[config.naturalness] || "Naturlig: Mellem",
        "lappe farve": REVERSE_PATCH_COLOR[config.patchColor] || "Snedkerens Valg",
        "behandling": REVERSE_TREATMENT[config.treatment] || "Natural",

        // Hardware - use reverse mappings
        "hængsel": REVERSE_HINGE[config.hingeCode] || "Tectus TE 340 3D",
        "låsekasse": REVERSE_LOCK[config.lockCode] || "Boda 2014",
        "dørebund": doorBottom,

        // Door type (for tab selection)
        _doorType: config.type,
        _caseId: apiCase.id,
        _dealStatus: apiCase.dealStatus
    };
}

export default { mapApiToFormData };
