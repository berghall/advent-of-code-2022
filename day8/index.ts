const input: string[] = (await Deno.readTextFile("./example.txt")).split("\n");
const firstAndLastWalls = [input[0].split(""), input[input.length - 1].split("")].flat();

const borderTreesBetweenFirstAndLastWall = input.slice(1, -1).map((x) => ([x.charAt(0).split(""), x.charAt(x.length - 1)])).flat(2).length - 1

const asd = input.map((x) => x.split("").map((x) => Number(x)));

const seenTrees: Pos[] = [];
for (const [ii, i] of asd.entries()) {
    for (const [ij, j] of i.entries()) {
        seenTrees.push({ treeHeight: j, x: ij, y: ii })
    }
}

for (const key in seenTrees) {
    const currentTree = seenTrees[key];
    console.log(currentTree)
}


interface Pos {
    x: number;
    y: number;
    treeHeight: number;
}