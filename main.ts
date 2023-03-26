let panel = document.querySelector("canvas")! as HTMLCanvasElement;
interface PointDetails {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  id: number;
  // x: number;
  // y: number;
}
const numWB = 3;
const numHB = 3;
let inCorrectPosition = 0;
let points: PointDetails[] = [];
let images: ImageBitmap[] = [];
let eachPeaceWidth = 0;
let eachPeaceHeight = 0;
function shuffle<k>(array: k[]): k[] {
  // debugger;
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
function multihuffle(...arr: any[][]): any[][] {
  // debugger;
  if (arr.length) {
    let array = arr[0];
    const arrLength = arr.length;
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      for (let index = 0; index < arrLength; index++) {
        [arr[index][currentIndex], arr[index][randomIndex]] = [
          arr[index][randomIndex],
          arr[index][currentIndex],
        ];
      }
    }

    return arr;
  } else {
    return [];
  }
}
function myShuffle<k>(arr: k[]): k[] {
  const length = arr.length;

  let newArray: k[] = [];
  for (let index = 0; index < length; index++) {
    // const element = arr[index];
    const elNum = random(length - index);
    const element = arr[elNum];
    arr.splice(elNum, 1);
    newArray.push(element);
  }
  return newArray;
}
interface StatusShape {
  mainId: number;
  currId: number;
  isReact: boolean;
  index: number;
  key: string;
}
let positionMap: {
  [key: string]: StatusShape;
} = {};

let currentRect: PointDetails & StatusShape = {
  id: -1,
  sh: -1,
  sw: -1,
  sx: -1,
  sy: -1,
  currId: -1,
  index: -1,
  isReact: false,
  mainId: -1,
  key: "",
};
let a = [1, 2, 3, 5, 5, 6, 7, 8, 9, 0];

let aa = ["11", "23", "34", "55", "56", "67", "78", "89", "90", "1"];
console.log(multihuffle(a, aa));
console.log(a);
console.log(aa);

function random(num: number): number {
  return Math.floor(Math.random() * num);
}
enum Move {
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
  "NONE",
}
function moveDirection(x: number, y: number): Move {
  // const pointRect = points[currentRect.currId];
  // console.log(pointRect, points, currentRect, x, y);
  const xRect = currentRect.sx;
  const yRect = currentRect.sy;
  const xCheck = x == xRect;
  const yCheck = y == yRect;
  // console.log(xCheck, yCheck);
  if (!yCheck && !xCheck) {
    return Move.NONE;
  } else {
    if (xCheck) {
      if (y + eachPeaceHeight == yRect) {
        return Move.DOWN;
      } else if (y - eachPeaceHeight == yRect) {
        return Move.UP;
      } else {
        return Move.NONE;
      }
    } else {
      if (x + eachPeaceWidth == xRect) {
        return Move.RIGHT;
      } else if (x - eachPeaceWidth == xRect) {
        return Move.LEFT;
      } else {
        return Move.NONE;
      }
    }
  }
}
function checkWin() {
  let allpass = true;
  Object.keys(positionMap).forEach((v) => {
    allpass = allpass && positionMap[v].currId == positionMap[v].mainId;
  });
  console.log(allpass);
}
panel.addEventListener("click", function (e: MouseEvent) {
  console.log(
    "***",
    Math.floor(e.clientX / eachPeaceWidth),
    Math.floor(e.clientY / eachPeaceHeight)
  );
  const endX = Math.ceil(e.clientX / eachPeaceWidth) * eachPeaceWidth;
  const startX = endX - eachPeaceWidth;
  const endY = Math.ceil(e.clientY / eachPeaceHeight) * eachPeaceHeight;
  const startY = endY - eachPeaceHeight;
  const element = positionMap[startX + "-" + endX + "-" + startY + "-" + endY];
  console.log(
    element
    // startX + "-" + endX + "-" + startY + "-" + endY,
    // positionMap
  );
  if (!element.isReact) {
    const direction = moveDirection(startX, startY);
    // console.log(MO)
    console.log(direction, Move.NONE);
    if (direction == Move.NONE) {
      return;
    }
    ctx?.clearRect(startX, startY, eachPeaceWidth, eachPeaceHeight);
    if (Move.UP == direction) {
      ctx?.drawImage(images[element.currId], startX, startY - eachPeaceHeight);
      // positionMap[currentRect.key].
      currentRect.sy += eachPeaceHeight;
    } else if (Move.DOWN == direction) {
      ctx?.drawImage(images[element.currId], startX, startY + eachPeaceHeight);
      currentRect.sy -= eachPeaceHeight;
    } else if (Move.RIGHT == direction) {
      ctx?.drawImage(images[element.currId], startX + eachPeaceWidth, startY);
      currentRect.sx -= eachPeaceWidth;
    } else if (Move.LEFT == direction) {
      ctx?.drawImage(images[element.currId], startX - eachPeaceWidth, startY);
      currentRect.sx += eachPeaceWidth;
    }
    positionMap[currentRect.key] = {
      ...currentRect,
      isReact: false,
      currId: element.currId,
      index: element.index,
    };

    currentRect.key = element.key;

    positionMap[element.key] = {
      ...element,
      isReact: true,
      currId: currentRect.currId,
      index: currentRect.index,
    };
    // console.log(positionMap);
    ctx?.fillRect(
      currentRect.sx,
      currentRect.sy,
      eachPeaceWidth,
      eachPeaceHeight
    );
    checkWin();
  } else {
  }
  // images.forEach((value, index) => {
  //   ctx?.drawImage(value, points[index].sx, points[index].sy);
  //   console.log(value.width, value.height);
  // });
});
console.log(panel);
var ctx = panel.getContext("2d");
const image = new Image();
image.src = "./test5.png";
image.onload = () => {
  console.log(image.width, image.height);

  let withB = image.width / numWB;
  let heightB = image.height / numHB;
  eachPeaceHeight = heightB;
  eachPeaceWidth = withB;
  // let indexKeeper: number[] = [];
  for (let index = 0; index < numWB; index++) {
    for (let indexH = 0; indexH < numHB; indexH++) {
      // indexKeeper.push();
      points.push({
        sx: withB * index,
        sy: heightB * indexH,
        sw: withB,
        sh: heightB,
        id: index * numWB + indexH,
        // index:index * numWB + indexH
      });
    }
  }
  // console.log(points, indexKeeper);
  panel.setAttribute("height", image.height + "");

  panel.setAttribute("width", image.width + "");

  //   panel.style.width = image.width + "px";
  //   panel.style.height =  + "px";
  //   ctx?.drawImage(image, 0, 0);
  Promise.all([
    // Cut out two sprites from the sprite sheet
    ...points.map((v) => {
      return createImageBitmap(image, v.sx, v.sy, v.sw, v.sh);
    }),
    // createImageBitmap(image, 32, 0, 32, 32),
  ]).then((sprites) => {
    images = sprites;
    const mainPoints = [...points];
    let keepImage = random(numHB * numWB);
    multihuffle(points, sprites);
    console.log(points);
    const shuffleValueLength = sprites.length;
    for (let index = 0; index < shuffleValueLength; index++) {
      const element = sprites[index];
      const pointC = mainPoints[index];
      const pointM = points[index];
      const isReact = keepImage == index;
      const keyObj =
        pointC.sx +
        "-" +
        (pointC.sx + pointC.sw) +
        "-" +
        pointC.sy +
        "-" +
        (pointC.sy + pointC.sh);
      positionMap[keyObj] = {
        mainId: pointM.id,
        currId: pointC.id,
        index,
        isReact,
        key: keyObj,
      };
      if (pointM.id == pointC.id) {
        inCorrectPosition++;
      }

      if (isReact) {
        currentRect = {
          ...mainPoints[index],
          mainId: pointM.id,
          currId: pointC.id,
          index,
          isReact,
          key: keyObj,
        };
        // ctx?.drawImage(element, mainPoints[index].sx, mainPoints[index].sy);

        ctx?.fillRect(
          mainPoints[index].sx,
          mainPoints[index].sy,
          mainPoints[index].sw,
          mainPoints[index].sh
        );
      } else {
        ctx?.drawImage(element, mainPoints[index].sx, mainPoints[index].sy);
      }
    }
    // console.log(positionMap);
    // setTimeout(() => {
    //   Object.keys(positionMap).forEach((v) => {
    //     const mainId = positionMap[v].mainId;
    //     ctx?.drawImage(images[mainId], points[mainId].sx, points[mainId].sy);
    //   });
    // }, 1000);
    // sprites.forEach((value, index) => {
    //   ctx?.drawImage(value, points[index].sx, points[index].sy);
    //   console.log(value.width,value.height)
    // });
    // Draw each sprite onto the canvas
    // ctx?.drawImage(image,0,0)
    // points.forEach((v) => {});
    // ctx?.drawImage(
    //   sprites[0],
    //   0,
    //   0,
    //   sprites[0].width,
    //   sprites[0].height,
    //   points[0].sx,
    //   points[0].sy,
    //   points[0].sw,
    //   points[0].sh
    // );
    // ctx?.drawImage(
    //   sprites[1],
    //   0,
    //   0,
    //   sprites[0].width,
    //   sprites[0].height,
    //   points[1].sx,
    //   points[1].sy,
    //   points[1].sw,
    //   points[1].sh
    // );
    // ctx?.drawImage(
    //   sprites[2],
    //   0,
    //   0,
    //   sprites[0].width,
    //   sprites[0].height,
    //   points[2].sx,
    //   points[2].sy,
    //   points[2].sw,
    //   points[2].sh
    // );
    // ctx?.drawImage(
    //   sprites[3],
    //   0,
    //   0,
    //   sprites[0].width,
    //   sprites[0].height,
    //   points[3].sx,
    //   points[3].sy,
    //   points[3].sw,
    //   points[3].sh
    // );
    // ctx?.drawImage(sprites[0], points[0].sx, points[0].sy);
    // ctx?.drawImage(sprites[1], points[2].sx, points[2].sy);
    // ctx?.drawImage(sprites[2], points[1].sx, points[1].sy);
    // ctx?.drawImage(sprites[3], points[3].sx, points[3].sy);
  });
};
// fetch("./s.png")
//   .then((res) => {
//     console.log(res.body);

//     // ctx.drawImage(res.body,10,10)
//     return res.body;
//     //   var b = new Blob(res, { type: "image/png" });
//   })
//   .then((res) => {
//     console.log(res);
//   });
// ctx.drawImage("./s.png", 10, 10);
