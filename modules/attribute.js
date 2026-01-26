import { roll_dice_set, clamp } from "./util/utils.js";
import { attribute_table } from "./data/attribute_data.js";

function roll_attribute (name, short) {
    let attribute_roll = roll_dice_set(4, 6);

    return get_attribute(name, short, attribute_roll);
}

function get_empty_attribute(name, short) {
    return {
        "base_roll": undefined,
        "base_modification": 0,
        "name": name,
        "short": short,
        "value": "--",
        "mod": "--",
        "skill_base": "--",
        "skill_gain": "-",
        "damage_dice": [,,"-D-"],
        "goop": "--",
    }
}

function get_attribute(name, short, base_attribute, base_modification = 0) {
    if (base_attribute === -1) {
        return get_empty_attribute(name, short)
    }

    let modded_attribute = clamp(base_attribute.total + base_modification, 1, 30)
    let attribute = attribute_table[clamp(modded_attribute - 1, 0, 29)];
    let goop = attribute_table[clamp(base_attribute.total-1, 0, 29)][5]

    return {
        "base_roll": base_attribute,
        "base_modification": base_modification,
        "name": name,
        "short": short,
        "value": modded_attribute,
        "mod": attribute[1],
        "skill_base" : attribute[2],
        "skill_gain" : attribute[3],
        "damage_dice": attribute[4],
        "goop": goop,
        "roll": base_attribute.total,
    }
}

export {get_attribute, roll_attribute}