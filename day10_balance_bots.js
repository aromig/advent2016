// Advent of Code - Day 10
// http://adventofcode.com/2016/day/10

const input = ``; // insert from day10_input.txt

let bots = {};
let outputs = {};
let buffer = [];
let part_1;

input.split('\n').forEach(x => {
    let match = x.match(/value ([0-9]*) goes to bot ([0-9]*)/);
    if (match) {
        if (!bots[match[2]*1])
            bots[match[2]*1] = [];
        bots[match[2]*1].push(match[1]*1);
        return;
    }
    buffer.push(x.match(/bot ([0-9]*) gives low to (output|bot) ([0-9]*) and high to (output|bot) ([0-9]*)/));
});

while (buffer.length != 0)
    buffer = buffer.filter(x => !(bots[x[1]] && bots[x[1]].length == 2 && !doInstruction(x)));

function doInstruction(match) {
    if (bots[match[1]].includes(61) && bots[match[1]].includes(17) && !part_1) part_1 = match[1];
    if (!eval(match[2] + 's')[match[3]]) eval(match[2] + 's')[match[3]] = [];
    eval(match[2] + 's')[match[3]].push(Math.min(...bots[match[1]]));
    if (!eval(match[4] + 's')[match[5]]) eval(match[4] + 's')[match[5]] = [];
    eval(match[4] + 's')[match[5]].push(Math.max(...bots[match[1]]));
    bots[match[1]] = [];
}

console.log('Part 1:', part_1);

let part_2 = outputs[0] * outputs[1] * outputs[2];

console.log('Part 2:', part_2);
