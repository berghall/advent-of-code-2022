const input: string[] = (await Deno.readTextFile("./input.txt")).split("\n");

const wantedCycles = [20, 60, 100, 140, 180, 220];
let totalCycleValues = 0;
let currentCycle = 0;
let currentCycleValue = 1;

const checkCycleWithValue = () => {
    if (wantedCycles.includes(currentCycle)) {
        totalCycleValues += currentCycleValue * currentCycle;
    }
}

for (const [_, instruction] of input.entries()) {
    const [action, getParam] = instruction.split(" ");
    const param = Number(getParam);
    currentCycle += 1;
    checkCycleWithValue()

    if (action !== "noop") {
        currentCycle += 1;
        checkCycleWithValue()
        currentCycleValue += Number(param);
    }
}

// totalCycleValues = 14860


