function clamp(value, min, max) {
    if (value < min) {
        return min
    }
    
    if (value > max) {
        return max
    }

    return value
}

// Roll a single dice between 1 and sides (inclusive)
function roll_die(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// Roll a set of dice of the same sides.  Returns a total, and the individual results
function roll_dice_set(number, sides) {
    let dice_set = [];
    
    for (let i = 0; i < number; i++) {
        dice_set.push(roll_die(sides))
    }

    return restore_dice_set(dice_set, sides)
}

function restore_dice_set(results, sides) {
    let total = results.reduce((current_total, current_value) => current_total + current_value);

    return {
        number: results.length,
        sides: sides,
        total: total,
        results: results
    }
}

function roll_percent() {
    let percent = roll_dice_set(2, 10)
    percent.results[0] = percent.results[0] % 10
    percent.results[1] = percent.results[1] % 10
    percent.total = percent.results[0] * 10 + percent.results[1]

    if (percent.total === 0) percent.total = 100

    return percent
}

export {clamp, roll_die, roll_dice_set, restore_dice_set, roll_percent}