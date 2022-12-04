const input: string[] = (await Deno.readTextFile("./input.txt")).split("\n");

const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const upperCases = [...Array(26)].map((_, i) =>
  String.fromCharCode(i + 97).toUpperCase()
);
const mergedAlphabets = [...alphabet, ...upperCases];

const summedPriorizations: number[] = [];

for (const key in input) {
  const x = input[key];

  const firstHalf = x.slice(0, x.length / 2).split("");
  const secondHalf = x.slice(x.length / 2);

  const sharedCharacter = firstHalf.find((f) => secondHalf.includes(f));

  if (sharedCharacter !== undefined) {
    const index = mergedAlphabets.indexOf(sharedCharacter) + 1;
    summedPriorizations.push(index);
  }
}

const summed = summedPriorizations.reduce((partialSum, a) => partialSum + a, 0);
// summed = 7785

// Part two
const result = input
  .map((_, i) => {
    return i % 3 ? [] : [input.slice(i, i + 3)];
  })
  .flat();

const summedGroupPriorizations: number[] = []

for (const key in result) {
  const x = result[key];
  const allItems = x.map((m) => m.split(""))
  const [sharedCharacter] = allItems.reduce((p,c) => p.filter(e => c.includes(e)));
  const index = mergedAlphabets.indexOf(sharedCharacter) + 1
  summedGroupPriorizations.push(index);
}

const summedGroupPrioritization = summedGroupPriorizations.reduce((partialSum, a) => partialSum + a, 0);
// summedGroupPrioritization = 2633
