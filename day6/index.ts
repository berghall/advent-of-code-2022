const input: string[] = (await Deno.readTextFile("./input.txt")).split("");

const getSetChunks = (len) => (char, i) => {
    const chunk = new Set(input.slice(i, i + len))
    if (chunk.size === len) {
        return i + len;
    }
}

const partOne = input.map(getSetChunks(4)).filter(f => f)[0]
// partOne = 1210

const partTwo = input.map(getSetChunks(14)).filter(f => f)[0]
// partTwo = 3476
