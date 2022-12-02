import { match } from "https://deno.land/x/match/mod.ts";
const input: Array<[their: string, mine: string]> = (await Deno.readTextFile("./input.txt")).split("\n").map((x) => x.split(" ")).slice(0, -1);

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const WIN = 6;
const DRAW = 3;
const LOSS = 0;

const scores: number[] = [];

const getPointMap = (element: [their: string, mine: string], partTwo: boolean = false): number => {
    return match<[their: string, mine: string]>(element)(
        [([their, mine]) => their === "A" && mine === "X", () => partTwo ? SCISSORS + LOSS : ROCK + DRAW],
        [([their, mine]) => their === "A" && mine === "Y", () => partTwo ? ROCK + DRAW : PAPER + WIN],
        [([their, mine]) => their === "A" && mine === "Z", () => partTwo ? PAPER + WIN : SCISSORS + LOSS],

        [([their, mine]) => their === "B" && mine === "Y", () => partTwo ? PAPER + DRAW : PAPER + DRAW],
        [([their, mine]) => their === "B" && mine === "Z", () => partTwo ? SCISSORS + WIN : SCISSORS + WIN],
        [([their, mine]) => their === "B" && mine === "X", () => partTwo ? ROCK + LOSS : ROCK + LOSS],

        [([their, mine]) => their === "C" && mine === "Z", () => partTwo ? ROCK + WIN : SCISSORS + DRAW],
        [([their, mine]) => their === "C" && mine === "X", () => partTwo ? PAPER + LOSS : ROCK + WIN],
        [([their, mine]) => their === "C" && mine === "Y", () => partTwo ? SCISSORS + DRAW : PAPER + LOSS],
    )().value;
}

// Part 1
for (const key in input) {
    const element = input[key];
    const point = getPointMap(element);
    scores.push(point)
}

const summedScores = scores.reduce((partialSum, a) => partialSum + a, 0);
// summedScores = 8933

// Part two
const indicatedScores: number[] = [];

for (const key in input) {
    const element = input[key];
    const point = getPointMap(element, true);
    indicatedScores.push(point)
}

const summedIndicatedScores = indicatedScores.reduce((partialSum, a) => partialSum + a, 0);
// summedIndicatedScores = 11998

