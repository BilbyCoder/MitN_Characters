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
    let total = 0;
    let dice_set = [];
    
    for (let i = 0; i < number; i++) {
        let result = roll_die(sides);
        total += result;
        dice_set.push(result)
    }

    return {
        number: number,
        sides: sides,
        total: total,
        results: dice_set
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

export {clamp, roll_die, roll_dice_set, roll_percent}