const input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,19,9,23,1,23,13,27,1,10,27,31,2,31,13,35,1,10,35,39,2,9," +
    "39,43,2,43,9,47,1,6,47,51,1,10,51,55,2,55,13,59,1,59,10,63,2,63,13,67,2,67,9,71,1,6,71,75,2,75,9,79,1,79,5,83," +
    "2,83,13,87,1,9,87,91,1,13,91,95,1,2,95,99,1,99,6,0,99,2,14,0,0";

// part 1
var data = input.split(',').map(Number);
data[1] = 12;
data[2] = 2;

function part1(data, mem1=12, mem2=2) {
    data = [...data];  // copy data before modifying
    data[1] = mem1;
    data[2] = mem2;
    for (let i = 0; i < data.length; i += 4) {
        let opcode = data[i];
        if (opcode == 1) {
            data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
        } else if (opcode == 2) {
            data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
        } else if (opcode == 99) {
            break;
        } else {
            throw new Error("Unexpected opcode encountered: " + String(opcode));
        }
    }
    return data[0]
}

var answer_1 = part1(data);
console.log(answer_1);

// part 2
function part2(data) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (part1(data, i, j) == 19690720) {
                return {noun: i, verb: j}
            }
        }
    }
}

var answer_2 = part2(data);
answer_2 = 100 * answer_2.noun + answer_2.verb;
console.log(answer_2)