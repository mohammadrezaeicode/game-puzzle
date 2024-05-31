"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Move;
(function (Move) {
    Move[Move["UP"] = 0] = "UP";
    Move[Move["DOWN"] = 1] = "DOWN";
    Move[Move["LEFT"] = 2] = "LEFT";
    Move[Move["RIGHT"] = 3] = "RIGHT";
    Move[Move["NONE"] = 4] = "NONE";
})(Move || (Move = {}));
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
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
function multiShuffle(...arr) {
    if (arr.length) {
        let array = arr[0];
        const arrLength = arr.length;
        let currentIndex = array.length, randomIndex;
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
    }
    else {
        return [];
    }
}
function myShuffle(arr) {
    const length = arr.length;
    let newArray = [];
    for (let index = 0; index < length; index++) {
        const elNum = random(length - index);
        const element = arr[elNum];
        arr.splice(elNum, 1);
        newArray.push(element);
    }
    return newArray;
}
function random(num) {
    return Math.floor(Math.random() * num);
}
function moveDirection(x, y, xRect, yRect) {
    const xCheck = x == xRect;
    const yCheck = y == yRect;
    if ((!yCheck && !xCheck) || (xCheck && yCheck)) {
        return Move.NONE;
    }
    else {
        if (xCheck) {
            if (y + 1 == yRect) {
                return Move.DOWN;
            }
            else if (y - 1 == yRect) {
                return Move.UP;
            }
            else {
                return Move.NONE;
            }
        }
        else {
            if (x + 1 == xRect) {
                return Move.RIGHT;
            }
            else if (x - 1 == xRect) {
                return Move.LEFT;
            }
            else {
                return Move.NONE;
            }
        }
    }
}
window.onload = function () {
    var _a;
    let panel = document.querySelector("canvas");
    const imageElement = document.querySelector("#uploadedImage");
    var ctx = panel.getContext("2d");
    const path = "./1.png";
    let image = new Image();
    image.src = path;
    const numWB = 4;
    const numHB = 4;
    let isDone = false;
    let inCorrectPosition = 0;
    let points = [];
    let mainPoints = [];
    let images = [];
    let eachPeaceWidth = 0;
    let eachPeaceHeight = 0;
    let positionMap = {};
    function checkWin() {
        let allpass = true;
        Object.keys(positionMap).forEach((v, index) => {
            allpass = allpass && positionMap[v].positionKey == images[index].key;
        });
        isDone = allpass;
        if (allpass) {
            alert("you are win");
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, 0, 0);
        }
    }
    let currentRect;
    (_a = document.querySelector("input#file")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", function ($event) {
        if ($event.target) {
            const event = $event.target;
            if (event.files) {
                const file = event.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        const imageBlob = new Blob([e.target.result], {
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
    });
    panel.addEventListener("click", function (e) {
        if (isDone) {
            return;
        }
        const x = Math.floor(e.offsetX / eachPeaceWidth);
        const y = Math.floor(e.offsetY / eachPeaceHeight);
        let rect = Object.assign({}, positionMap[currentRect]);
        let rectPoint = points[rect.index];
        const xRect = Math.floor(rectPoint.sx / eachPeaceWidth);
        const yRect = Math.floor(rectPoint.sy / eachPeaceHeight);
        const direction = moveDirection(x, y, xRect, yRect);
        if (direction == Move.NONE) {
            return;
        }
        const element = Object.assign({}, positionMap[x + "-" + y]);
        const pointEl = points[element.index];
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(pointEl.sx, pointEl.sy, eachPeaceWidth, eachPeaceHeight);
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(rectPoint.sx, rectPoint.sy, eachPeaceWidth, eachPeaceHeight);
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(images[element.index].image, rectPoint.sx, rectPoint.sy);
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(pointEl.sx, pointEl.sy, eachPeaceWidth, eachPeaceHeight);
        [images[element.index], images[rect.index]] = [
            images[rect.index],
            images[element.index],
        ];
        currentRect = x + "-" + y;
        checkWin();
    });
    image.onload = () => {
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
            ...points.map((v) => __awaiter(this, void 0, void 0, function* () {
                return {
                    key: v.key,
                    v: v,
                    useIn: "",
                    image: yield createImageBitmap(image, v.sx, v.sy, v.sw, v.sh),
                };
            })),
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
                    ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(points[index].sx, points[index].sy, eachPeaceWidth, eachPeaceHeight);
                }
                else {
                    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(element.image, points[index].sx, points[index].sy);
                }
            }
        });
    };
};
