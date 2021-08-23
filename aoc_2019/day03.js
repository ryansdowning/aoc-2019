let fs = require("fs");
let path = require("path");

const data = String(fs.readFileSync(path.join(__dirname, "..", "data", "day03.txt"))).trimEnd().split("\n").map((path) => path.split(','));


class Instruction {
    constructor(instruction) {
        this.direction = instruction.charAt(0);
        this.distance = Number(instruction.substring(1));
        this.vertical = this.direction == "U" || this.direction == "D";
        if (this.direction == "D" || this.direction == "L") this.distance *= -1;
    }
}


class Path {
    constructor(instructions) {
        this.instructions = instructions;
        this.path = [];

        let last = {x: 0, y: 0};
        for(let instruction of this.instructions) {
            let x = last.x;
            let y = last.y;
            let step = Math.sign(instruction.distance);
            if (instruction.vertical) {
                last = {x: x, y: y + instruction.distance};
                for (let i = y + step; i != last.y; i += step) {
                    this.path.push({x, y: i})
                }
            } else {
                last = {x: x + instruction.distance, y: y};
                for (let i = x + step; i != last.x; i += step) {
                    this.path.push({x: i, y: y});
                }
            }
        }
    }
}

var paths = data.map((path) => new Path(path.map((instruction) => new Instruction(instruction))));
var path1 = new Set(paths[0].path.map(JSON.stringify));
var path2 = new Set(paths[1].path.map(JSON.stringify));
var intersections = [...path2].filter(coord => path1.has(coord)).map(JSON.parse);
var intersectionDistances = intersections.map(coord => Math.abs(coord.x) + Math.abs(coord.y));
intersectionDistances.sort((a, b) => a - b);
var answer_1 = intersectionDistances[0]
console.log(answer_1);