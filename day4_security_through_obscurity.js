// Advent of Code - Day 4
// http://adventofcode.com/2016/day/4

var input = ``; // insert from day4_input.txt

var rooms = input.split('\n')
    .map(x => {
        var room = {};
        room.name = x.substr(0, x.lastIndexOf('-'));
        room.sectorID = parseInt(x.substr(x.indexOf('[')-3, 3));
        room.checksum = x.substr(x.indexOf('[')+1, 5);
        return room;
    });

// Part 1

var sum = 0;
var validRooms = [];

rooms.forEach(room => {
    if (generate_checksum(room) == room.checksum) {
        sum += room.sectorID;
        validRooms.push(room);
    }
});

console.log('Part 1:', sum);

// Part 2

var room_npos = validRooms.filter(room => decrypt(room) == 'northpole object storage');
console.log('Part 2:', room_npos[0].sectorID);

/* ***** FUNCTIONS ***** */

function generate_checksum(room) {
    var frequency = {};

    for (var i = 0; i < room.name.length; i++) {
        var letter = room.name[i];
        if (letter == '-') continue;
        var count = (room.name.match(new RegExp(letter, "g")) || []).length;
        frequency[letter] = count;
    }

    // sort by count desc, then by letter alphabetically if values are equal
    var sorted = [];
    for (var val in frequency)
        sorted.push([val, frequency[val]]);
    sorted.sort((a, b) => {
        return b[1] < a[1] ?
            -1
            : b[1] == a[1] ?
                b[0] > a[0] ? -1
                    : 1
                : 1;
    });
    var checksum = sorted.map(x => x[0]).join('').slice(0, 5); // only need top 5

    return checksum;
}

function decrypt(room) {
    var decrypted = '';
    for (var i = 0; i < room.name.length; i++) {
        var letter = room.name[i];
        if (letter == '-') {
            letter = ' ';
        } else {
            for (var j = 0; j < room.sectorID; j++) {
                letter = String.fromCharCode(letter.charCodeAt(0) < 122 ? letter.charCodeAt(0) + 1 : 97);
                //letter = String.fromCharCode(letter.charCodeAt(0)+1);
            }
        }
        decrypted += letter;
    }
    return decrypted;
}