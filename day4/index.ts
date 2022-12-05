const input: string[] = (await Deno.readTextFile("./input.txt")).split("\n");


const getRanges = (sections: string[]) => {
    const getRange = (stop: number, start: number, step: number = 1) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    const getStartRange = (section) => Number(section?.substring(0, section?.indexOf("-")))
    const getEndRage = (section) => Number(section?.substring(section?.indexOf("-") + 1))

    const firstRange = getRange(getEndRage(sections[0]), getStartRange(sections[0]))
    const secondRange = getRange(getEndRage(sections[1]), getStartRange(sections[1]))

    return {
        firstRange,
        secondRange
    }
}

const containsAllConstraint: boolean[] = []
const containsSomeContstraint: boolean[] = [];

for (const key in input) {
    const element = input[key];
    const sections = element.split(",").filter((f) => f)

    const ranges = getRanges(sections);

    // Part one
    const secondRangeContainsFirst = ranges.secondRange.every((e) => ranges.firstRange.some((s) => s === e))
    const firstRangeContainsSecond = ranges.firstRange.every((e) => ranges.secondRange.some((s) => s === e))

    if (secondRangeContainsFirst || firstRangeContainsSecond) {
        containsAllConstraint.push(true);
    }

    // Part two
    const secondRangeContainsSomeFirst = ranges.secondRange.some((e) => ranges.firstRange.some((s) => s === e))
    const firstRangeContainsSomeSecond = ranges.firstRange.some((e) => ranges.secondRange.some((s) => s === e))

    if (secondRangeContainsSomeFirst || firstRangeContainsSomeSecond) {
        containsSomeContstraint.push(true);
    }
}

// containsAllConstraint.length - 1 = 569

// containsSomeContstraint.length = 936
