const input: string[] = (await Deno.readTextFile("./example.txt")).split("\n");

const headPositions: Position[] = [{ x: 0, y: 0 }];
const tailPositions: Position[] = [{ x: 0, y: 0 }];

let prevDirection;

const walkTail = (newHeadPosition: Position) => {
    const lastTailPosition = tailPositions[tailPositions.length - 1];
    const lastHeadPosition = headPositions[headPositions.length - 2];

    // if new head position is adjacent to tail, skip
    if (newHeadPosition.x === lastTailPosition.x && Math.abs(lastTailPosition.y - lastHeadPosition.y) > 1) {
        if (lastHeadPosition.y > lastTailPosition.y) {
            tailPositions.push({ x: lastTailPosition.x, y: lastTailPosition.y + 1 });
        } else {
            tailPositions.push({ x: lastTailPosition.x, y: lastTailPosition.y - 1 });
        }
    }


    if (newHeadPosition.y == lastTailPosition.y && Math.abs(lastTailPosition.y - newHeadPosition.y) > 1) {
        if (newHeadPosition.x > lastTailPosition.x) {
            tailPositions.push({ x: lastTailPosition.x + 1, y: lastTailPosition.y });
        }
        else {
            tailPositions.push({ x: lastTailPosition.x - 1, y: lastTailPosition.y })
        }
    }

    if (newHeadPosition.x != lastTailPosition.x && newHeadPosition.y != lastTailPosition.y && !(Math.abs(lastTailPosition.x - newHeadPosition.x) == 1 && Math.abs(lastTailPosition.y - newHeadPosition.y) == 1)) {
        if (Math.abs(lastTailPosition.y - newHeadPosition.y) == 1) {
            if (newHeadPosition.x > lastTailPosition.x) tailPositions.push({ x: lastTailPosition.x + 1, y: lastTailPosition.y });
            else tailPositions.push({ x: lastTailPosition.x - 1, y: lastTailPosition.y });
            tailPositions[tailPositions.length -1].y = newHeadPosition.y;
        }

        if (Math.abs(lastTailPosition.x - newHeadPosition.x) == 1) {
            if (newHeadPosition.y > lastTailPosition.y) tailPositions.push({ x: lastTailPosition.x, y: lastTailPosition.y + 1 });
            else tailPositions.push({ x: lastTailPosition.x, y: lastTailPosition.y - 1 })
            // tailPosition[0] = xh;
            tailPositions[tailPositions.length -1].x = newHeadPosition.x;

        }
    }

    // const isLeft = newHeadPosition.x === lastTailPosition.x
    // const isRight = newHeadPosition.x + 1 === lastTailPosition.x

    // const isDown = newHeadPosition.y - 1 === lastTailPosition.y
    // const isUp = newHeadPosition.y + 1 === lastTailPosition.y

    // const isAdjacent = (isRight || isLeft || isDown || isUp || (isRight && isUp) || (isRight && isDown) || (isLeft && isUp) || (isLeft && isDown));
    // if (isAdjacent) return;
    // // if tail is adjacent to newhead then dont update position
    // // console.log(isLeft)
    // // const newTailPosition =
    // // Tail is not adjacent to head, move tail
    // // if (lastTailPosition !== newHeadPosition) {
    // // console.log(newHeadPosition)
    // tailPositions.push(lastHeadPosition)

}

const walkHead = (direction: string, steps: number) => {
    for (let i = 0; i < steps; i++) {
        const lastHeadPosition = headPositions[headPositions.length - 1];
        let newHeadPosition
        switch (direction) {
            case "R": {
                newHeadPosition = { x: lastHeadPosition.x + 1, y: lastHeadPosition.y }
                headPositions.push(newHeadPosition);
                break;
            }
            case "U": {
                newHeadPosition = { x: lastHeadPosition.x, y: lastHeadPosition.y + 1 };
                headPositions.push(newHeadPosition)
                break;
            }
            case "L": {
                newHeadPosition = { x: lastHeadPosition.x - 1, y: lastHeadPosition.y };
                headPositions.push(newHeadPosition)
                break;
            }
            case "D": {
                newHeadPosition = { x: lastHeadPosition.x, y: lastHeadPosition.y - 1 };
                headPositions.push(newHeadPosition);
                break;
            }
            default:
                break;
        }
        // if (headPositions.length > 2)
        walkTail(newHeadPosition)
    }
}

for (const directionWithSteps in input) {
    const element = input[directionWithSteps];
    const [direction, steps] = element.split(" ");
    walkHead(direction, Number(steps));
}

// console.log(headPositions)
const distinctTailPositions = tailPositions.filter((value, index, self) =>
    index === self.findIndex((t) => (
        t.x === value.x && t.y === value.y
    ))
)
// console.log(tailPositions.length)
console.log(tailPositions.length)

interface Position {
    x: number;
    y: number;
}