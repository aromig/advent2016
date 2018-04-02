// Advent of Code - Day 8
// http://adventofcode.com/2016/day/8

// screen is a 50x6 grid
let screen = [], row = [];
for (let y = 0; y < 6; y++) {
    screen[y] = [];
    for (let x = 0; x < 50; x++) {
        screen[y].push('.');
    }
}

const input = ``;

const ops = input.split('\n')
    .map(x => {
        let line = [];
        let parts = x.split(' ');
        if (parts[0] == 'rect') {
            line[0] = 'rect';
            line[1] = parseInt(parts[1].split('x')[0]);
            line[2] = parseInt(parts[1].split('x')[1]);
            // op = rect, width, height
        }
        if (parts[0] == 'rotate') {
            line[0] = 'rotate ' + parts[1];
            line[1] = parseInt(parts[2].split('=')[1]);
            line[2] = parseInt(parts[4]);
            // op = rotate row/column, row/column #, num
        }
        return line;
    });

ops.forEach(line => {
    doOp(line[0], line[1], line[2]);
});

const pixels = countCharInArray(screen, '#');

console.log('Part 1:', pixels);
console.log('Part 2:');
showScreen(screen);

/* ***** FUNCTIONS ***** */

function doOp(op, param1, param2) {
    let vals = null, val = null, new_vals = null, move = null, stop = null;
    switch (op) {
        case 'rect':            for (let y = 0; y < param2; y++) {
                                    for (let x = 0; x < param1; x++) {
                                        screen[y][x] = '#'
                                    }
                                    
                                }
                                break;
        case 'rotate row':      let row = param1;
                                move = param2;
                                vals = screen[row];
                                new_vals = [];
                                for (let v = 0; v < vals.length; v++) {
                                    val = vals[v];
                                    stop = v;
                                    for (let mv = 1; mv <= move; mv++) {
                                        stop = stop < vals.length - 1 ? stop + 1 : 0;
                                    }
                                    new_vals[stop] = val;
                                }
                                screen[row] = new_vals;
                                break;
        case 'rotate column':   let col = param1;
                                move = param2;
                                vals = screen.map(row => row[col]);
                                new_vals = [];
                                for (let v = 0; v < vals.length; v++) {
                                    val = vals[v];
                                    stop = v;
                                    for (let mv = 1; mv <= move; mv++) {
                                        stop = stop < vals.length - 1 ? stop + 1 : 0;
                                    }
                                    new_vals[stop] = val;
                                }
                                for (let y = 0; y < new_vals.length; y++) {
                                    screen[y][col] = new_vals[y];
                                }
                                break;
    }
}

function showScreen(screen) {
    screen.forEach(row => {
        console.log(row.join(''));
    });
}

function countCharInArray(arr, char) {
    let count = 0;
    arr.forEach(line => {
        count += (line.join('').match(new RegExp(char, "g")) || []).length;
    });
    return count;
}