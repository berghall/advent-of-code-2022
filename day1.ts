const text = await Deno.readTextFile("./day1.txt");
const splittedValues: Array<string> = text.split("\n")

const newSequences: Array<Array<number>> = [];
let newSeqeuence: Array<number> = [];

for (const key in splittedValues) {
    const element = splittedValues[key];
    if (element !== "") {
        newSeqeuence.push(Number(element))
    } else {
        newSequences.push(newSeqeuence)
        newSeqeuence = [];
    }
}

const summedSequences = newSequences.map((sequence: Array<number>) => sequence.reduce((partialSum, a) => partialSum + a, 0));
const largestCalories = Math.max(...summedSequences);

// largestCalories = 70764


// Part two
const caloriesSortedDesc = summedSequences.sort((a, b) => b - a);
const topThreeCalories = caloriesSortedDesc[0] + caloriesSortedDesc[1] + caloriesSortedDesc[2];

// topThreeCalories = 203905