let panel = document.querySelector("canvas");

const numWB = 2;
const numHB = 2;
let inCorrectPosition = 0;
let points = [];
let mainPoints = [];
let images = [];
let eachPeaceWidth = 0;
let eachPeaceHeight = 0;
function shuffle(array) {
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
function multihuffle(...arr) {
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
function myShuffle(arr) {
  const length = arr.length;

  let newArray = [];
  for (let index = 0; index < length; index++) {
    // const element = arr[index];
    const elNum = random(length - index);
    const element = arr[elNum];
    arr.splice(elNum, 1);
    newArray.push(element);
  }
  return newArray;
}

let positionMap = {};

let currentRect;
let a = [1, 2, 3, 5, 5, 6, 7, 8, 9, 0];

let aa = ["11", "23", "34", "55", "56", "67", "78", "89", "90", "1"];
console.log(multihuffle(a, aa));
console.log(a);
console.log(aa);

function random(num) {
  return Math.floor(Math.random() * num);
}
const Move = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  NONE: "NONE",
};
function moveDirection(x, y, xRect, yRect) {
  // const pointRect = points[currentRect.currId];
  // console.log(pointRect, points, currentRect, x, y);

  const xCheck = x == xRect;
  const yCheck = y == yRect;
  // console.log(xCheck, yCheck);
  if ((!yCheck && !xCheck) || (xCheck && yCheck)) {
    return Move.NONE;
  } else {
    if (xCheck) {
      if (y + 1 == yRect) {
        return Move.DOWN;
      } else if (y - 1 == yRect) {
        return Move.UP;
      } else {
        return Move.NONE;
      }
    } else {
      if (x + 1 == xRect) {
        return Move.RIGHT;
      } else if (x - 1 == xRect) {
        return Move.LEFT;
      } else {
        return Move.NONE;
      }
    }
  }
}
function checkWin() {
  // let allpass = true;
  // Object.keys(positionMap).forEach((v) => {
  //   allpass = allpass && positionMap[v].currId == positionMap[v].mainId;
  // });
  // console.log(allpass);
}
panel.addEventListener("click", function (e) {
  debugger;
  // console.log(
  //   "***",
  //   Math.floor(e.clientX / eachPeaceWidth),
  //   Math.floor(e.clientY / eachPeaceHeight)
  // );
  const x = Math.floor(e.clientX / eachPeaceWidth);
  const y = Math.floor(e.clientY / eachPeaceHeight);

  // console.log(
  //   element
  //   // startX + "-" + endX + "-" + startY + "-" + endY,
  //   // positionMap
  // );
  // currentRect = {
  //   ...currentRect,
  //   ...positionMap[currentRect.currId],
  // };
  let rect = { ...positionMap[currentRect] };
  let rectPoint = points[rect.index];
  const xRect = Math.floor(rectPoint.sx / eachPeaceWidth);
  const yRect = Math.floor(rectPoint.sy / eachPeaceHeight);
  const direction = moveDirection(x, y, xRect, yRect);
  // debugger;
  console.log("is passed");
  // console.log(MO)
  // console.log(direction, Move.NONE);
  if (direction == Move.NONE) {
    return;
  }
  // const rectElement = positionMap[rectPoint.x + "-" + rectPoint.y];
  const element = { ...positionMap[x + "-" + y] };
  const pointEl = points[element.index];
  // const pointsRect = points[rectElement.currId];
  ctx?.clearRect(pointEl.sx, pointEl.sy, eachPeaceWidth, eachPeaceHeight);
  ctx?.clearRect(rectPoint.sx, rectPoint.sy, eachPeaceWidth, eachPeaceHeight);
  ctx?.drawImage(images[element.imageKey].image, rectPoint.sx, rectPoint.sy);
  ctx?.fillRect(pointEl.sx, pointEl.sy, eachPeaceWidth, eachPeaceHeight);
  // console.log(element, rect);
  // debugger;
  // positionMap[currentRect].currId = element.currId;
  // positionMap[x + "-" + y].currId = rect.currId;
  // [positionMap[currentRect], positionMap[rect.key]] = [
  //   { ...element, mainId: positionMap[currentRect].mainId, },
  //   { ...rect, mainId: positionMap[currentRect].mainId },
  // ];
  currentRect = element.key;
  // if (Move.UP == direction) {
  //   ctx?.drawImage(images[element.currId], pointsRect.x, pointsRect.y);
  //   // positionMap[currentRect.key].
  //   currentRect.sy += eachPeaceHeight;
  // } else if (Move.DOWN == direction) {
  //   ctx?.drawImage(images[element.currId], startX, startY + eachPeaceHeight);
  //   currentRect.sy -= eachPeaceHeight;
  // } else if (Move.RIGHT == direction) {
  //   ctx?.drawImage(images[element.currId], startX + eachPeaceWidth, startY);
  //   currentRect.sx -= eachPeaceWidth;
  // } else if (Move.LEFT == direction) {
  //   ctx?.drawImage(images[element.currId], startX - eachPeaceWidth, startY);
  //   currentRect.sx += eachPeaceWidth;
  // }
  // debugger;
  // let t={...positionMap[currentRect.key]}
  // positionMap[currentRect.key] = {
  //   ...element,
  //   currId: element.currId,
  //   index: element.index,
  // };

  // // currentRect.key = element.key;
  // currentRect = {
  //   ...currentRect,
  //   ...t,
  //   currId: t.currId,
  //   index: t.index,
  //   sx: pointEl.sx,
  //   sy: pointEl.sy,
  //   key: element.key,
  // };
  // // currentRect.x = x;
  // // currentRect.y = y;

  // positionMap[element.key] = {
  //   ...t,
  //   currId: t.currId,
  //   index: t.index,
  // };
  // debugger
  // console.log(positionMap);
  // checkWin();
  // images.forEach((value, index) => {
  //   ctx?.drawImage(value, points[index].sx, points[index].sy);
  //   console.log(value.width, value.height);
  // });
});
console.log(panel);
var ctx = panel.getContext("2d");
const image = new Image();
image.src = "./num.png";
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
        x: index,
        y: indexH,
        key: index + "-" + indexH,
        // index:index * numWB + indexH
      });
      console.log(points);
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
    ...points.map(async (v) => {
      return {
        key: v.key,
        v: v,
        image: await createImageBitmap(image, v.sx, v.sy, v.sw, v.sh),
      };
    }),
    // createImageBitmap(image, 32, 0, 32, 32),
  ]).then((sprites) => {
    // console.log(points);
    // mainPoints = [...points];

    let keepImage = random(numHB * numWB);
    // let yf = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    shuffle(points);
    images = sprites;
    console.log(points);
    const shuffleValueLength = sprites.length;
    for (let index = 0; index < shuffleValueLength; index++) {
      const element = sprites[index];
      // const pointC = mainPoints[index];
      const pointM = points[index];
      const isRect = keepImage == index;
      const keyObj = pointM.key;
      positionMap[keyObj] = {
        image: element.image,
        imageKey: element.key,
        positionKey: pointM.key,
        // mainId: pointC.id,
        // currId: pointM.id,
        index,
        key: keyObj,
      };
      // if (pointM.id == pointC.id) {
      //   inCorrectPosition++;
      // }

      if (isRect) {
        currentRect = keyObj;
        // = {
        //   ...pointM,
        //   image: element,
        //   mainId: pointM.id,
        //   currId: index,
        //   index,
        //   key: keyObj,
        // };
        // ctx?.drawImage(element, mainPoints[index].sx, mainPoints[index].sy);

        ctx?.fillRect(
          points[index].sx,
          points[index].sy,
          eachPeaceWidth,
          eachPeaceHeight
        );
      } else {
        ctx?.drawImage(element.image, points[index].sx, points[index].sy);
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
