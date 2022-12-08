const input: string[] = (await Deno.readTextFile("./example.txt")).split("\n");
const firstAndLastWalls = [input[0].split(""), input[input.length - 1].split("")].flat();

const borderTreesBetweenFirstAndLastWall = input.slice(1, -1).map((x) => ([x.charAt(0).split(""), x.charAt(x.length - 1)])).flat(2).length

const asd = input.map((x) => x.split("").map((x) => Number(x)));

// const innerTrees = input.slice(1, -1).map((x) => x.slice(1, -1).split("").map((x) => Number(x)))

let visibleTrees = 0;

const seenTrees: Pos[] = [];
for (const [ii, i] of asd.entries()) {
    for (const [ij, j] of i.entries()) {
        seenTrees.push({ treeHeight: j, x: ij, y: ii })
    }
}

for (const key in seenTrees) {
    const currentTree = seenTrees[key];
    const leftTree = seenTrees.find((tree) => tree.x === currentTree.x - 1 && tree.y === currentTree.y);
    const rightTree = seenTrees.find((tree) => tree.x === currentTree.x + 1 && tree.y === currentTree.y);
    const treeAbove = seenTrees.find((tree) => tree.y === currentTree.y - 1 && tree.x === currentTree.x);
    const treeBelow = seenTrees.find((tree) => tree.y === currentTree.y + 1 && tree.x === currentTree.x);

    const isBorder = currentTree.y === Math.max(...seenTrees.map((x) => x.y))
        || currentTree.y === Math.min(...seenTrees.map((x) => x.y))
        || currentTree.x === Math.max(...seenTrees.map((x) => x.x))
        || currentTree.x === Math.min(...seenTrees.map((x) => x.x))

    if (isBorder) {
        continue;
    }

    if (leftTree && currentTree.treeHeight > leftTree.treeHeight) {
        visibleTrees++;
    } else if (rightTree && currentTree.treeHeight > rightTree.treeHeight) {
        visibleTrees++;
    } else if (treeAbove && currentTree.treeHeight > treeAbove.treeHeight) {
        visibleTrees++;
    } else if (treeBelow && currentTree.treeHeight > treeBelow.treeHeight) {
        visibleTrees++;
    }
}
// console.log(visibleTrees)
// // console.log(input.slice(1, -1).map((x) => ([x.charAt(0).split(""), x.charAt(x.length - 1)])))
console.log(firstAndLastWalls.length + borderTreesBetweenFirstAndLastWall + visibleTrees - 1)

interface Pos {
    x: number;
    y: number;
    treeHeight: number;
}