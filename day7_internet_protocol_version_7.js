// Advent of Code - Day 7
// http://adventofcode.com/2016/day/7

const input = ``; // insert from day7_input.txt

const IPs = input.split('\n');

const supportTLS_count = IPs.reduce((count, IP) => supportsTLS(IP) ? ++count : count, 0);

console.log('Part 1:', supportTLS_count);

const supportSSL_count = IPs.reduce((count, IP) => supportsSSL(IP) ? ++count : count, 0);

console.log('Part 2:', supportSSL_count);

/* ***** FUNCTIONS ***** */

function supportsTLS(IP) {
    const netArrays = parseIP(IP);
    const supernetArray = netArrays[0], hypernetArray = netArrays[1];

    return (supernetArray.some(x => hasABBA(x)) && !hypernetArray.some(x => hasABBA(x)));
}

function supportsSSL(IP) {
    const netArrays = parseIP(IP);
    const supernetArray = netArrays[0], hypernetArray = netArrays[1];
    const supernetABAs = findNetArrayABAs(supernetArray);
    const hypernetABAs = findNetArrayABAs(hypernetArray);
    
    return supernetABAs.some(s => hypernetABAs.some(h => correspondingABAs(s, h)));
}

function parseIP(IP) {
    let supernetArray = [], hypernetArray = [];
    let split1 = IP.split('[');
    split1.forEach(x => {
        let split2 = x.split(']');
        if (split2.length == 1) {
            split2[0] && supernetArray.push(split2[0]);
        } else {
            split2[1] && supernetArray.push(split2[1]);
            split2[0] && hypernetArray.push(split2[0]);
        }
    });
    let netArrays = [supernetArray, hypernetArray];
    return netArrays;
}

function hasABBA(str) {
    if (str.length < 4) return false;
    for (let i = 0; i < str.length; i++) {
        if (!str[i]) break;
        if (isABBA(str.slice(i, i + 4))) return true;
    }
    return false;
}

function isABBA(str) {
    if (str.length !== 4) return false;
    if (str[0] == str[1]) return false;
    return str == str.split('').reverse().join('');
}

function findNetArrayABAs(netArray) {
    return netArray.reduce((acc, str) => {
        //console.log(acc, findABAs);
        let abaArray = acc.concat(findABAs(str));
        return abaArray;
    }, []);
}

function findABAs(str) {
    let result = [];

    if (str.length < 3) return result;
    for (let i = 0; i < str.length; i++) {
        if (!str[i]) break;
        let slice = str.slice(i, i + 3)
        if (isABA(slice)) {
            result.push(slice);
        }
    }
    return result;
}

function isABA(str) {
    if (str.length !== 3) return false;
    if (str[0] == str[1]) return false;
    return str === str.split('').reverse().join('');
}

function correspondingABAs(aba1, aba2) {
    return (aba1[0] === aba2[1] && aba1[1] === aba2[0]);
}