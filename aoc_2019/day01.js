let fs = require("fs");
let path = require("path");

function load(file, converter=Number) {
    return String(fs.readFileSync(path.join(__dirname, "../data/", file)))
        .trimEnd()
        .split(require("os").EOL)
        .map(converter)
}

const data = load('../data/day01.txt');

// part 1
var answer_1 = data.map(num => Math.floor(num / 3) - 2).reduce((a, b) => a + b, 0);
console.log(answer_1);

// part 2
function totalFuel(mass) {
    let fuel = Math.max(Math.floor(mass / 3) - 2, 0);
    if (fuel == 0) return fuel;
    return fuel + totalFuel(fuel)
}

var answer_2 = data.map(totalFuel).reduce((a, b) => a + b, 0);
console.log(answer_2);