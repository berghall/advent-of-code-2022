const input: string[] = (await Deno.readTextFile("./example.txt")).split("\n").filter((f) => f);
const chunkArray = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map(begin => array.slice(begin, begin + chunk_size));

const monkeys = chunkArray(input, 6)
const monkeyIdWithItems = new Map<number, {}>()
for (const key in monkeys) {
    const monkey: string = monkeys[key];
    const numberMatch = /([0-9])\w+/g;

    const monkeyId = monkey[0].match(/([0-9])/g)?.map((x) => Number(x))[0]
    const monkeyStartingItems = monkey[1].match(numberMatch)?.map((x) => Number(x))
    const meta = {
        items: monkeyStartingItems,
        operation: monkey[2].slice(monkey[2].length - 4).trim(),
        test: monkey[3].match(numberMatch)?.map((x) => Number(x))[0],
        ifDivisible: monkey[4].match(/([0-9])/g)?.map((x) => Number(x))[0],
        ifNotDivisible: monkey[5].match(/([0-9])/g)?.map((x) => Number(x))[0]
    }
    monkeyIdWithItems.set(monkeyId, meta)

    // const testDivisibleBy = monkey[3].match(numberMatch)?.map((x) => Number(x))
    // const ifDivisible = monkey[4].match(/([0-9])/g)?.map((x) => Number(x))
    // const ifNotDivisible = monkey[5].match(/([0-9])/g)?.map((x) => Number(x))

    // const operation = monkey[2].slice(monkey[2].length - 4).trim()
    // const newValues = monkeyStartingItems?.map((x) => operation === "old" ? `${x} * ${x}` : `${x} ${operation}`);
    // for (const [index, val] of monkeyStartingItems?.entries()) {
    //     const newVal = eval(newValues[index]);
    //     const dividedByThree = Number(newVal) / 3;
    //     const isDivisible = parseInt(dividedByThree) % testDivisibleBy[0] === 0;
    //     if (isDivisible) {
    //         monkeys[ifDivisible[0]][1] += `, ${val}`
    //         monkey[1].replace(String(val), "")
    //     } else {
    //         monkeys[ifNotDivisible[0]][1] += `, ${val}`
    //         monkey[1].replace(String(val), "")
    //     }
    //     // console.log(isDivisible)
    // }

}

for (const [monkeyId, meta] of monkeyIdWithItems.entries()) {
    // if (Object.prototype.hasOwnProperty.call(object, key)) {
    for (const key in meta["items"]) {
        const element = meta[key];
        console.log(meta["items"])
    }

    // }
    // console.log(meta)
}
// console.log(monkeyIdWithItems)