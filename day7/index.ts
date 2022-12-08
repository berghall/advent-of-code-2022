const input: string[] = (await Deno.readTextFile("./example.txt")).split("\n");

const directorySizeMap = new Map<string, number>();
let previousDirectory = "";

const traverseDirectory = (currentDirectory: string = "", currentLine: number = 0) => {
    const currentCommand = input[currentLine];
    if (currentCommand === undefined) {
        return;
    }

    if (currentCommand.startsWith("$ cd")) {
        const newDirectory = currentCommand.slice(currentCommand.indexOf("cd") + 2);
        console.log(newDirectory)
        if (newDirectory.includes("..")) {
            // console.log("here")
            traverseDirectory(previousDirectory.trim(), currentLine + 1)
        }
        previousDirectory = currentDirectory;
        traverseDirectory(newDirectory.trim(), currentLine + 1)
    } else if (currentCommand.startsWith("$ ls")) {
        const filesAndDirectoriesInDirectoryRange = input.findIndex((v, i) => i > currentLine && v.startsWith("$"));
        const filesAndDirectoriesInDirectory = input.slice(currentLine + 1, filesAndDirectoriesInDirectoryRange)
        const allFilesInDirectory = filesAndDirectoriesInDirectory.filter((f) => !f.startsWith("dir"))
        const directorySize = allFilesInDirectory.map((x) => Number(x.split(" ")[0])).reduce((prev, curr) => prev + curr, 0);

        const hasParentDirectory = currentDirectory !== previousDirectory;
        if (hasParentDirectory) {
            // console.log()
            directorySizeMap.set(previousDirectory, directorySizeMap.get(previousDirectory) + directorySize)
            directorySizeMap.set(currentDirectory, directorySize);
        } else {
            directorySizeMap.set(currentDirectory, directorySize);
        }
        previousDirectory = currentDirectory;
        traverseDirectory(currentDirectory.trim(), currentLine + filesAndDirectoriesInDirectory.length + 1)
    }
}

traverseDirectory()

const directorySizes = Object.values(Object.fromEntries(directorySizeMap));
const directories100k = directorySizes.filter((f) => f < 100000);
const summed100kDirectories = directories100k.reduce((prev, curr) => prev + curr, 0)
console.log(directorySizeMap)
