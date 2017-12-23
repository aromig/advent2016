// Advent of Code - Day 3
// http://adventofcode.com/2016/day/3

var input = ``;

var sets = input.split('\n').map(x => x.trim().replace(/ +/g, ' ').split(' ').map(x => parseInt(x)));

function possibleTriangles(sets) {
    var possible_triangles = 0;
    sets.forEach(set => {
        if (set[0] + set[1] > set[2])
            if (set[1] + set[2] > set[0])
                if (set[0] + set[2] > set[1])
                    possible_triangles++;
    });
    return possible_triangles;
}

// Part 1

console.log('Part 1:', possibleTriangles(sets));

// Part 2

var groups = [];

for (var i = 0; i < sets.length; ) {
    var group = [sets[i][0], sets[i+1][0], sets[i+2][0]];
    groups.push(group);
    group = [sets[i][1], sets[i + 1][1], sets[i + 2][1]];
    groups.push(group);
    group = [sets[i][2], sets[i + 1][2], sets[i + 2][2]];
    groups.push(group);
    i += 3;
}

console.log('Part 2:', possibleTriangles(groups));