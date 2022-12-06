const input: string[] = (await Deno.readTextFile("./example.txt")).split("\n");

const stackRows = input.slice(0, 3);
const instructions = input.slice(5);

interface Stack {
  [stackNumber: number]: string[];
}

const stackMap: Stack[] = [];

for (const key in stackRows) {
  const element = stackRows[key];
  const getCratePositions = Array.from({ length: (element.length - 1) / 1 }, (_, i) => 1 + i * 1)
    .filter((_, i) => i % 4 === 0)

  for (const cratePos in getCratePositions) {
    const cratePosElement = getCratePositions[cratePos];
    const charAtCratePosition = element.charAt(cratePosElement)
    if (charAtCratePosition !== " ") {
      const crate = Number(cratePos) + 1;
      const prev = stackMap[crate];
      const newCharToStack: Stack = { [crate]: [charAtCratePosition] }
      stackMap[crate] = [prev, newCharToStack].flat().filter((f) => f != undefined)
    }
  }
}

for (const key in instructions) {
  const element = instructions[key];
  const [nCratesToMove, from, to] = element.match(/([0-9])+/g);

  const fromMap = Number(from);
  const toMap = Number(to);
  const totalItemsFrom = stackMap.get(fromMap);
  const totalItemsTo = stackMap.get(toMap);

  for (let i = 0; i < nCratesToMove?.length; i++) {  // push each crate to new array
    const crateKind = totalItemsFrom[i];
    // console.log(crateKind, nCratesToMove, fromMap, toMap)
    // stackMap.set(toMap, [...totalItemsTo, ...totalItemsTo?.push(crateKind)])
  }
  // if (Array.isArray(totalItemsFrom) && Array.isArray(totalItemsTo))
  // stackMap.set(toMap, totalItemsTo?.push(totalItemsFrom?.shift()))
  // }
  // stackMap.set(toMap, [...totalItemsFrom?.splice(-nCratesToMove)])
  // stackMap.set(fromMap, moving)
  // stackMap.set(toMap, totalItemsTo)
  console.log(stackMap)
}