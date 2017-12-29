// Advent of Code - Day 6
// http://adventofcode.com/2016/day/6

var input = ``; // insert from day6_input.txt

var signals = input.split('\n');
var signal_len = signals[0].length;
var message = reversed_message = '';

for (var i = 0; i < signal_len; i++) {
    var letters = signals.map(x => x[i]).join('');
    var frequency = {};
    for (var j = 0; j < letters.length; j++) {
        var letter = letters[j];
        var count = (letters.match(new RegExp(letter, "g")) || []).length;
        frequency[letter] = count;
    }
    var sorted = [];
    for (var val in frequency)
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
    var reversed = sorted.reverse();
    reversed_message += reversed[0][0];
}

console.log('Part 1:', message);
console.log('Part 2:', reversed_message);