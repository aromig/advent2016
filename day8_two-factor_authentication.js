// Advent of Code - Day 8
// http://adventofcode.com/2016/day/8

// screen is a 50x6 grid
var screen = [], row = [];
for (var y = 0; y < 6; y++) {
    screen[y] = [];
    for (var x = 0; x < 50; x++) {
        screen[y].push('.');
    }
}

var input = ``;

var ops = input.split('\n')
    .map(x => {
        var line = [];
        var parts = x.split(' ');
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

var pixels = countCharInArray(screen, '#');

console.log('Part 1:', pixels);
console.log('Part 2:');
showScreen(screen);

/* ***** FUNCTIONS ***** */

function doOp(op, param1, param2) {
    switch (op) {
        case 'rect':            for (var y = 0; y < param2; y++) {
                                    for (var x = 0; x < param1; x++) {
                                        screen[y][x] = '#'
                                    }
                                    
                                }
                                break;
        case 'rotate row':      var row = param1, move = param2;
                                var vals = screen[row];
                                var new_vals = [];
                                for (var v = 0; v < vals.length; v++) {
                                    var val = vals[v], stop = v;
                                    for (var mv = 1; mv <= move; mv++) {
                                        stop = stop < vals.length - 1 ? stop + 1 : 0;
                                    }
                                    new_vals[stop] = val;
                                }
                                screen[row] = new_vals;
                                break;
        case 'rotate column':   var col = param1, move = param2;
                                var vals = screen.map(row => row[col]);
                                var new_vals = [];
                                for (var v = 0; v < vals.length; v++) {
                                    var val = vals[v], stop = v;
                                    for (var mv = 1; mv <= move; mv++) {
                                        stop = stop < vals.length - 1 ? stop + 1 : 0;
                                    }
                                    new_vals[stop] = val;
                                }
                                for (var y = 0; y < new_vals.length; y++) {
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
    var count = 0;
    arr.forEach(line => {
        count += (line.join('').match(new RegExp(char, "g")) || []).length;
    });
    return count;
}