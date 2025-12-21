// Maps form data from the persistent form to backend API json format.
// Handles the complex logic of selecting correct material codes based on
// execution type, wood type, and other interdependent fields.
import {
    EXECUTION_MAPPINGS,
    TREATMENT_MAPPINGS,
    PATCH_COLOR_MAPPINGS,
    NATURALNESS_MAPPINGS,
    WOOD_TYPE_MAPPINGS,
    HINGE_SIDE_MAPPINGS,
    SEALANT_GAP_MAPPINGS,
    HINGE_MAPPINGS,
    LOCK_MAPPINGS,
    DOOR_BOTTOM_MAPPINGS,
    isShelling
} from './constants/fieldMappings';

import {
    CORE_CODES,
    VENEER_CODES,
    SHELLING_CODES,
    FRAME_CODES,
    DEFAULT_FRAME_THICKNESS_CM,
    SEAL_CODE,
    DOOR_TYPES,
    OPENING_DIRECTIONS,
    WOOD_TYPES
} from './constants/materialCodes';
// Resolves "Som dørflade" to actual wood type returns (OAK or DOUGLAS)
function resolveWoodType(value, fallbackWoodType) {
    if (!value || value === "Som dørflade") {
        return fallbackWoodType;
    }
    return WOOD_TYPE_MAPPINGS[value] || fallbackWoodType;
}

// Determines the core code based on execution type
// SOLID_WOOD (Forskalling) uses 25mm core for shelling
// VENEER types use 38mm core
function determineCoreCode(executionValue) {
    if (isShelling(executionValue)) {
        return CORE_CODES.SHELLING; // CORE_LISOCORE_25MM
    }
    return CORE_CODES.VENEER; // CORE_LISOCORE_38MM
}

// Determines veneer/shelling code based on execution and wood type
// If SOLID_WOOD -> use MASSIVE_[woodType]_SHELL
// If VENEER_* -> use VENEER_[woodType]
function determineVeneerCode(executionValue, woodType) {
    if (isShelling(executionValue)) {
        // Shelling: MASSIVE_OAK_SHELL or MASSIVE_DOUGLAS_SHELL
        return SHELLING_CODES[woodType] || SHELLING_CODES.OAK;
    }
    // Veneer: VENEER_OAK or VENEER_DOUGLAS
    return VENEER_CODES[woodType] || VENEER_CODES.OAK;
}

// Determines frame material code based on karm selection and dørflade
function determineFrameCode(karmValue, doorfaceWoodType) {
    if (!karmValue || karmValue === "Som dørflade") {
        return FRAME_CODES[doorfaceWoodType] || FRAME_CODES.OAK;
    }
    const woodType = WOOD_TYPE_MAPPINGS[karmValue];
    return FRAME_CODES[woodType] || FRAME_CODES.OAK;
}

// Calculates frame offset from the two offset fields
// Only one should have a value; minus values are negative
function calculateFrameOffset(minusValue, plusValue) {
    if (minusValue && parseFloat(minusValue) > 0) {
        return -Math.abs(parseFloat(minusValue));
    }
    if (plusValue && parseFloat(plusValue) > 0) {
        return Math.abs(parseFloat(plusValue));
    }
    return 0;
}

// Determines door type based on selected door tab
function determineDoorType(selectedTab) {
    return selectedTab === "double" ? DOOR_TYPES.DOUBLE : DOOR_TYPES.SINGLE;
}

// Determines opening direction based on hinge side
function determineOpeningDirection(hingeSide) {
    const mappedHingeSide = HINGE_SIDE_MAPPINGS[hingeSide];

    if (mappedHingeSide === "RIGHT") {
        return OPENING_DIRECTIONS.OUTWARD;
    }
    return OPENING_DIRECTIONS.INWARD;  // Default to INWARD for LEFT
}

// Maps complete form data to API payload format
export function mapFormToApiPayload(formData, selectedStatus, selectedTab = "single") {
    // Get base wood type from dørflade selection
    const doorfaceWoodType = WOOD_TYPE_MAPPINGS[formData["dørflade"]] || WOOD_TYPES.OAK;

    // Resolve "Som dørflade" for dørkant
    const edgeWoodType = resolveWoodType(formData["dørkant"], doorfaceWoodType);

    // Determine core and veneer codes based on execution type AND wood type
    const executionValue = formData["udførsel"] || "Finér: Bookmatched";
    const coreCode = determineCoreCode(executionValue);
    const veneerCode = determineVeneerCode(executionValue, doorfaceWoodType);

    // Determine frame code
    const frameCode = determineFrameCode(formData["karm"], doorfaceWoodType);

    // Calculate frame offset
    const frameOffset = calculateFrameOffset(
        formData.karmOffsetMinus,
        formData.karmOffsetPlus
    );

    // Map sealant gap (mm to cm) - can only be 0.5 or 1.0
    const sealantGap = SEALANT_GAP_MAPPINGS[formData.fugeLuft] || 1.0;

    // Map door bottom selection to boolean pair
    // Default to "Ingen" (both false) if not specified
    const doorBottomSelection = formData["dørebund"] || "Ingen";
    const doorBottomConfig = DOOR_BOTTOM_MAPPINGS[doorBottomSelection] || DOOR_BOTTOM_MAPPINGS["Ingen"];

    // Determine hinge side and corresponding opening direction
    const hingeSide = HINGE_SIDE_MAPPINGS[formData.haengselSide] || "LEFT";
    const openingDirection = determineOpeningDirection(formData.haengselSide);

    // Build door configuration
    const doorConfiguration = {
        type: determineDoorType(selectedTab),
        sellerNote: formData.note || "",

        // Core: 25mm for shelling (SOLID_WOOD), 38mm for veneer
        coreCode: coreCode,

        // Veneer codes depend on execution type AND wood type
        // SOLID_WOOD -> MASSIVE_[woodType]_SHELL
        // VENEER_* -> VENEER_[woodType]
        frontVeneerCode: veneerCode,
        backVeneerCode: veneerCode,

        // Edge wood type from dørkant selection
        doorLeafEdgeWoodType: edgeWoodType,

        // Measurements from Hulmål section
        wallOpeningWidthCm: parseFloat(formData.hulmaalWidth) || 90.0,
        wallOpeningHeightCm: parseFloat(formData.hulmaalLength) || 200.0,
        wallOpeningDepthCm: parseFloat(formData.hulmaalThickness) || 12.5,

        // Frame settings - frameThicknessCm is ALWAYS 0.54
        frameThicknessCm: DEFAULT_FRAME_THICKNESS_CM,
        frameOffsetCm: frameOffset,
        sealantGapCm: sealantGap,
        frameMaterialCode: frameCode,

        // Door bottom from DOOR_BOTTOM_MAPPINGS
        // Possible combinations: [false,false], [true,false], [false,true]
        frameIncludesThreshold: doorBottomConfig.frameIncludesThreshold,
        hasBottomSeal:  doorBottomConfig.hasBottomSeal,

        // Hardware codes
        hingeCode: HINGE_MAPPINGS[formData["hængsel"]] || "HINGE_TECTUS",
        lockCode: LOCK_MAPPINGS[formData["låsekasse"]] || "LOCK_BODA2014",

        // sealCode is ALWAYS sent with this fixed value
        sealCode: SEAL_CODE,

        // Appearance settings
        execution: EXECUTION_MAPPINGS[formData["udførsel"]] || "VENEER_BOOKMATCHED",
        treatment: TREATMENT_MAPPINGS[formData["behandling"]] || "NATURAL",
        patchColor: PATCH_COLOR_MAPPINGS[formData["lappe farve"]] || "CARPENTERS_CHOICE",
        naturalness: NATURALNESS_MAPPINGS[formData["naturlighed"]] || "NATURAL_MEDIUM"
    };

    // Build complete API payload
    const payload = {
        customerId: formData.customerId || 1,
        dealStatus: selectedStatus?.toUpperCase() || "LEAD",
        doorItems: [
            {
                hingeSide:  hingeSide,
                openingDirection: openingDirection,
                doorConfiguration: doorConfiguration
            }
        ]
    };

    // Always send single doorItem to ensure proper case updates

    return payload;
}

// Updates threshold/seal logic which aremutually exclusive
export function updateSealThresholdLogic(doorConfig, doorBottomSelection) {
    const config = DOOR_BOTTOM_MAPPINGS[doorBottomSelection] || DOOR_BOTTOM_MAPPINGS["Ingen"];
    return {
        ...doorConfig,
        hasBottomSeal: config.hasBottomSeal,
        frameIncludesThreshold: config.frameIncludesThreshold
    };
}

// Validates form data before submission
export function validateFormData(formData) {
    const errors = [];

    if (!formData.customerId) {
        errors.push("Vælg venligst en kunde");
    }

    if (!formData.hulmaalWidth || !formData.hulmaalLength) {
        errors.push("Angiv venligst hulmål (bredde og længde)");
    }

    if (!formData.haengselSide) {
        errors.push("Vælg venligst hængselside");
    }

    if (!formData["dørflade"]) {
        errors.push("Vælg venligst dørflade træsort");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export default {
    mapFormToApiPayload,
    updateSealThresholdLogic,
    validateFormData
};
