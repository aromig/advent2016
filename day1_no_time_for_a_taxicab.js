// Advent of Code - Day 1
// http://adventofcode.com/2016/day/1

const input = 'L4, L1, R4, R1, R1, L3, R5, L5, L2, L3, R2, R1, L4, R5, R4, L2, R1, R3, L5, R1, L3, L2, R5, L4, L5, R1, R2, L1, R5, L3, R2, R2, L1, R5, R2, L1, L1, R2, L1, R1, L2, L2, R4, R3, R2, L3, L188, L3, R2, R54, R1, R1, L2, L4, L3, L2, R3, L1, L1, R3, R5, L1, R5, L1, L1, R2, R4, R4, L5, L4, L1, R2, R4, R5, L2, L3, R5, L5, R1, R5, L2, R4, L2, L1, R4, R3, R4, L4, R3, L4, R78, R2, L3, R188, R2, R3, L2, R2, R3, R1, R5, R1, L1, L1, R4, R2, R1, R5, L1, R4, L4, R2, R5, L2, L5, R4, L3, L2, R1, R1, L5, L4, R1, L5, L1, L5, L1, L4, L3, L5, R4, R5, R2, L5, R5, R5, R4, R2, L1, L2, R3, R5, R5, R5, L2, L1, R4, R3, R1, L4, L2, L3, R2, L3, L5, L2, L2, L1, L2, R5, L2, L2, L3, L1, R1, L4, R2, L4, R3, R5, R3, R4, R1, R5, L3, L5, L5, L3, L2, L1, R3, L4, R3, R2, L1, R3, R1, L2, R4, L3, L3, L3, L1, L2';

const directions = input.split(', ');

let facing = 'N';
let pos = { 'x': 0, 'y': 0 };

// Part 1

directions.forEach(dir => {
    let turn = dir[0], steps = parseInt(dir.substr(1));

    switch (facing) {
        case 'N':   pos.x += (turn == 'R') ? steps : (-1 * steps);
                    facing = (turn == 'R') ? 'E' : 'W';
                    break;
        case 'E':   pos.y += (turn == 'R') ? (-1 * steps) : steps;
                    facing = (turn == 'R') ? 'S' : 'N';
                    break;
        case 'S':   pos.x += (turn == 'R') ? (-1 * steps) : steps;
                    facing = (turn == 'R') ? 'W' : 'E';
                    break;
        case 'W':   pos.y += (turn == 'R') ? steps : (-1 * steps);
                    facing = (turn == 'R') ? 'N' : 'S';
                    break;
    }
});

let mDist = Math.abs(pos.x) + Math.abs(pos.y);

console.log('Part 1:', mDist);

// Part 2

pos = { 'x': 0, 'y': 0 };
facing = 'N';
let seen = [];
let hq = [];
let found = false;

function isInArray(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1])
            return true;
    }
    return false;
}

function takeSteps(stepX, stepY, neg) {
    if (stepX != 0) {
        for (let x = 1; x <= stepX; x++) {
            pos.x += (!neg) ? 1 : -1;
            let coords = [pos.x, pos.y];
            if (!found) {
                if (isInArray(seen, coords)) {
                    hq = coords;
                    found = true;
                }
            }
            seen.push(coords);
        }
    } else {
        for (let y = 1; y <= stepY; y++) {
            pos.y += (!neg) ? 1 : -1;
            let coords = [pos.x, pos.y];
            if (!found) {
                if (isInArray(seen, coords)) {
                    hq = coords;
                    found = true;
                }
            }
            seen.push(coords);
        }
    }
}

directions.forEach(dir => {
    let turn = dir[0], steps = parseInt(dir.substr(1));

    switch (facing) {
        case 'N':   if (turn == 'R') {
                        facing = 'E'; takeSteps(steps, 0, false);
                    } else {
                        facing = 'W'; takeSteps(steps, 0, true);
                    }
                    break;
        case 'E':   if (turn == 'R') {
                        facing = 'S'; takeSteps(0, steps, true);
                    } else {
                        facing = 'N'; takeSteps(0, steps, false);
                    }
                    break;
        case 'S':   if (turn == 'R') {
                        facing = 'W'; takeSteps(steps, 0, true);
                    } else {
                        facing = 'E'; takeSteps(steps, 0, false);
                    }
                    break;
        case 'W':   if (turn == 'R') {
                        facing = 'N'; takeSteps(0, steps, false);
                    } else {
                        facing = 'S'; takeSteps(0, steps, true);
                    }
                    break;
    }
});

let hqDist = Math.abs(hq[0]) + Math.abs(hq[1]); 

console.log('Part 2:', hqDist);