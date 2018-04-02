// Advent of Code - Day 6
// http://adventofcode.com/2016/day/6

const input = ``; // insert from day6_input.txt

const signals = input.split('\n');
const signal_len = signals[0].length;
let message = '', reversed_message = '';

for (let i = 0; i < signal_len; i++) {
    let letters = signals.map(x => x[i]).join('');
    let frequency = {};
    for (let j = 0; j < letters.length; j++) {
        let letter = letters[j];
        let count = (letters.match(new RegExp(letter, "g")) || []).length;
        frequency[letter] = count;
    }
    let sorted = [];
    for (let val in frequency)
        sorted.push([val, frequency[val]]);
    sorted.sort((a, b) => {
        return b[1] < a[1] ? -1
            : b[1] == a[1] ?
                b[0] > a[0] ? -1
                    : 1
                : 1;
    });
    
    // Part 1
    message += sorted[0][0];

    // Part 2
    let reversed = sorted.reverse();
    reversed_message += reversed[0][0];
}

console.log('Part 1:', message);
console.log('Part 2:', reversed_message);