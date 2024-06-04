interface PointDetails {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  id: number;
  x?: number;
  y?: number;
  key: string;
}
interface ImageDetail {
  key: string;
  image: ImageBitmap;
  v: PointDetails;
  useIn: string;
}
interface shapeStatus {
  imageKey: string;
  positionKey: string;
  index: number;
  key: string;
  image: ImageBitmap;
}

enum Move {
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
  "NONE",
}
function shuffle<k>(array: k[]): k[] {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
function multiShuffle(...arr: unknown[][]): unknown[][] {
  if (arr.length) {
    let array = arr[0];
    const arrLength = arr.length;
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

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
    const elNum = random(length - index);
    const element = arr[elNum];
    arr.splice(elNum, 1);
    newArray.push(element);
  }
  return newArray;
}
function random(num: number): number {
  return Math.floor(Math.random() * num);
}
function moveDirection(
  x: number,
  y: number,
  xRect: number,
  yRect: number
): Move {
  const xCheck = x == xRect;
  const yCheck = y == yRect;

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
window.onload = function () {
  let numWB = 4;
  let numHB = 4;
  let panel = document.querySelector("canvas") as HTMLCanvasElement;
  let xAxisInput = document.querySelector("#x") as HTMLInputElement;
  let yAxisInput = document.querySelector("#y") as HTMLInputElement;
  xAxisInput.value = numWB + "";
  yAxisInput.value = numHB + "";
  xAxisInput.addEventListener("input", function (event: Event) {
    let xAxisValue = +xAxisInput.value;
    if (!isNaN(xAxisValue)) {
      xAxisValue = Math.floor(xAxisValue);
      if (+xAxisInput.value != xAxisValue) {
        xAxisInput.value = xAxisValue + "";
      }
      numWB = xAxisValue;
      reload();
    }
  });
  yAxisInput.addEventListener("input", function (event: Event) {
    let yAxisValue = +yAxisInput.value;
    if (!isNaN(yAxisValue)) {
      yAxisValue = Math.floor(yAxisValue);
      if (+yAxisInput.value != yAxisValue) {
        yAxisInput.value = yAxisValue + "";
      }
      numHB = yAxisValue;
      reload();
    }
  });
  const imageElement = document.querySelector(
    "#uploadedImage"
  ) as HTMLImageElement;
  var ctx = panel.getContext("2d");
  const path = "./1.png";
  let image = new Image();
  image.src = path;
  let isDone = false;
  let inCorrectPosition = 0;
  let points: PointDetails[] = [];
  let mainPoints: PointDetails[] = [];
  let images: ImageDetail[] = [];
  let eachPeaceWidth = 0;
  let eachPeaceHeight = 0;
  let positionMap: Record<string, shapeStatus> = {};
  function checkWin() {
    let allpass = true;
    Object.keys(positionMap).forEach((v, index) => {
      allpass = allpass && positionMap[v].positionKey == images[index].key;
    });
    isDone = allpass;
    if (allpass) {
      alert("you are win");
      ctx?.drawImage(image, 0, 0);
    }
  }
  let currentRect: string;

  (document.querySelector("input#file") as HTMLInputElement)?.addEventListener(
    "input",
    function ($event: Event) {
      if ($event.target) {
        const event = $event.target as HTMLInputElement;
        if (event.files) {
          const file = event.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            if (e.target) {
              const imageBlob = new Blob([e.target.result!], {
                type: file.type,
              });
              const imageURL = URL.createObjectURL(imageBlob);
              image.src = imageURL;
              imageElement.src = imageURL;
            }
          };

          if (file) {
            reader.readAsArrayBuffer(file);
          }
        }
      }
    }
  );
  panel.addEventListener("click", function (e: MouseEvent) {
    if (isDone) {
      return;
    }
    const x = Math.floor(e.offsetX / eachPeaceWidth);
    const y = Math.floor(e.offsetY / eachPeaceHeight);
    let rect = { ...positionMap[currentRect] };
    let rectPoint = points[rect.index];
    const xRect = Math.floor(rectPoint.sx / eachPeaceWidth);
    const yRect = Math.floor(rectPoint.sy / eachPeaceHeight);
    const direction = moveDirection(x, y, xRect, yRect);
    if (direction == Move.NONE) {
      return;
    }
    const element = { ...positionMap[x + "-" + y] };
    const pointEl = points[element.index];
    ctx?.clearRect(pointEl.sx, pointEl.sy, eachPeaceWidth, eachPeaceHeight);
    ctx?.clearRect(rectPoint.sx, rectPoint.sy, eachPeaceWidth, eachPeaceHeight);
    ctx?.drawImage(images[element.index].image, rectPoint.sx, rectPoint.sy);
    ctx?.fillRect(pointEl.sx, pointEl.sy, eachPeaceWidth, eachPeaceHeight);
    [images[element.index], images[rect.index]] = [
      images[rect.index],
      images[element.index],
    ];
    currentRect = x + "-" + y;
    checkWin();
  });
  function reload() {
    isDone = false;
    inCorrectPosition = 0;
    points = [];
    mainPoints = [];
    images = [];
    eachPeaceWidth = 0;
    eachPeaceHeight = 0;
    positionMap = {};
    let withB = image.width / numWB;
    let heightB = image.height / numHB;
    eachPeaceHeight = heightB;
    eachPeaceWidth = withB;
    for (let index = 0; index < numWB; index++) {
      for (let indexH = 0; indexH < numHB; indexH++) {
        points.push({
          sx: withB * index,
          sy: heightB * indexH,
          sw: withB,
          sh: heightB,
          id: index * numWB + indexH,
          x: index,
          y: indexH,
          key: index + "-" + indexH,
        });
      }
    }

    panel.setAttribute("height", image.height + "");

    panel.setAttribute("width", image.width + "");

    Promise.all([
      ...points.map(async (v) => {
        return {
          key: v.key,
          v: v,
          useIn: "",
          image: await createImageBitmap(image, v.sx, v.sy, v.sw, v.sh),
        };
      }),
    ]).then((sprites) => {
      let keepImage = random(numHB * numWB);
      shuffle(points);
      images = sprites;
      const shuffleValueLength = sprites.length;
      for (let index = 0; index < shuffleValueLength; index++) {
        const element = sprites[index];
        const pointM = points[index];
        const isRect = keepImage == index;
        const keyObj = pointM.key;
        positionMap[keyObj] = {
          image: element.image,
          imageKey: element.key,
          positionKey: pointM.key,
          index,
          key: keyObj,
        };

        if (isRect) {
          currentRect = keyObj;
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
    });
  }
  image.onload = () => {
    reload();
  };
};
