// canvas settings
const BLOCK_SIZE = 30;
const HOLD_SIZE = 15;
const PLAY_WIDTH = 10;
const PLAY_HEIGHT = 20;

const CANVAS = document.getElementById("canvas");
const CANVAS_2D = CANVAS.getContext('2d');

const FIELD_WIDTH = BLOCK_SIZE * PLAY_WIDTH;
const FIELD_HEIGHT = BLOCK_SIZE * PLAY_HEIGHT;
const SUB_WIDTH = FIELD_WIDTH + BLOCK_SIZE;
const SUB_TEXT = SUB_WIDTH + HOLD_SIZE / 2;
CANVAS.width = FIELD_HEIGHT;
CANVAS.height = FIELD_HEIGHT;

//draw Points
let points = 0;

CANVAS_2D.fillStyle = 'red';
CANVAS_2D.fillText(`${points}`, 100, 100);

//Game field
const screen = []; 

//kind of tetroMino
const TETRIS_SIZE = 4;
let mino_type = [
    [],
    [ // z mino
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [ // s mino
        [0,0,0,0],
        [0,0,1,1],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [ // l mino
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [ // j mino
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [ // i mino
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [ // t mino
        [0,0,0,0],
        [0,1,0,0],
        [1,1,1,0],
        [0,0,0,0]
    ],
    [ // o mino
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ]
];

const minoColors = ['','red','green','orange','blue','aqua','purple']

let blockArray = [1, 2, 3, 4, 5, 6, 7];
let ArrayNumber = 0;

// gets random tetroMino 
let randArray = Math.floor(Math.random() * 5040);
let nextMino = n_P_k(blockArray, blockArray.length);
let minoLoop = nextMino[randArray];
let crrentMino = minoLoop[ArrayNumber];
let nextMinoLoop = [];
let tetroMino = mino_type[crrentMino];

let beforeHoldMino = undefined;
let isHold = false;

// Move distance
tetroMinoMoveX = 0;
tetroMinoMoveY = 0;

// Mino's falling speed
const dropSpeed = 500;

// Is Game End?
let isGameOver = false;

function n_P_k(arr, n) 
{
    let ans = []
    if (n === 1) {
        for (let i = 0; i < arr.length; i++) {
            ans[i] = [arr[i]]
        }
    } else {
        for (let i = 0; i < arr.length; i++) {
            let parts = arr.slice(0)
            parts.splice(i, 1)[0]
            let row = n_P_k(parts, n - 1)
            for (let j = 0; j < row.length; j++) {
                ans.push([arr[i]].concat(row[j]))
            }
        }
    }
    return ans;
}

// draw static screen
function drawHoldScreen()
{
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(SUB_WIDTH, 0, (TETRIS_SIZE + 2) * HOLD_SIZE, (TETRIS_SIZE + 2) * HOLD_SIZE);
    CANVAS_2D.font = "bold 15px 'Meiryo UI'";
    CANVAS_2D.fillText("_HOLD_", SUB_TEXT, (TETRIS_SIZE + 3)* HOLD_SIZE);
}

function drawPointScreen()
{
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(SUB_WIDTH, (TETRIS_SIZE + 4)* HOLD_SIZE, (TETRIS_SIZE + 2) * HOLD_SIZE, HOLD_SIZE * 2);
    CANVAS_2D.font = "bold 15px 'Meiryo UI'";
    CANVAS_2D.fillText("_LINE_", SUB_TEXT, (TETRIS_SIZE + 7)* HOLD_SIZE);
    CANVAS_2D.fillStyle = 'white';
    CANVAS_2D.fillText(`${points}`, SUB_TEXT, (TETRIS_SIZE + 5.5)* HOLD_SIZE);
}

function drawnextMinoScreen()
{
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(SUB_WIDTH, (TETRIS_SIZE + 10) * HOLD_SIZE, (TETRIS_SIZE + 2)* HOLD_SIZE, (TETRIS_SIZE + 2)* HOLD_SIZE)
    CANVAS_2D.font = "bold 15px 'Meiryo UI'";
    CANVAS_2D.fillText("_NEXT_", SUB_TEXT, (TETRIS_SIZE + 15)* HOLD_SIZE);
}   

// draw dynamic screen 
function drawPlayScreen()
{
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
    // draw Field
    for(let y = 0; y < PLAY_HEIGHT; y++)
    {
        for(let x = 0; x < PLAY_WIDTH; x++)
        {
            if(screen[y][x])
            {
                drawBlock(x, y, screen[y][x]);
            }
        }
    }     
    // draw moving mino
    for(let y = 0; y < TETRIS_SIZE; y++)
    {
        for(let x = 0; x < TETRIS_SIZE; x++)
        {
            if(tetroMino[y][x])
            {
                drawBlock( tetroMinoMoveX + x, tetroMinoMoveY + y, crrentMino);
            }
        }
    }
    if(isGameOver)
        {
            const GAME_OVER_MESSAGE = 'GAME OVER';
            const width = CANVAS_2D.measureText(GAME_OVER_MESSAGE).width;
            const x = FIELD_WIDTH / 4 - width / 2;
            const y = FIELD_HEIGHT / 2 - 20;
            CANVAS_2D.font = "40px 'Meiryo UI'";
            CANVAS_2D.fillStyle = 'red';
            CANVAS_2D.fillText(GAME_OVER_MESSAGE, x, y);
        }
    
};

function drawBlock(x, y, color) {
    let drawX = x * BLOCK_SIZE;
    let drawY = y * BLOCK_SIZE;

    CANVAS_2D.fillStyle = minoColors[color];
    CANVAS_2D.fillRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
    CANVAS_2D.strokeStyle = 'black';
    CANVAS_2D.strokeRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
}

function drawHold(x, y, color)
{
    let drawX = x * HOLD_SIZE;
    let drawY = y * HOLD_SIZE;
    CANVAS_2D.fillStyle = minoColors[color];
    CANVAS_2D.fillRect(SUB_TEXT + drawX, drawY, HOLD_SIZE, HOLD_SIZE);
    CANVAS_2D.strokeStyle = 'black';
    CANVAS_2D.strokeRect(SUB_TEXT + drawX, drawY, HOLD_SIZE, HOLD_SIZE);
}

function drawNextMino(x, y, color)
{
    let drawX = x * HOLD_SIZE;
    let drawY = y * HOLD_SIZE;
    CANVAS_2D.fillStyle = minoColors[color];
    CANVAS_2D.fillRect(SUB_TEXT + drawX, drawY, HOLD_SIZE, HOLD_SIZE);
    CANVAS_2D.strokeStyle = 'black';
    CANVAS_2D.strokeRect(SUB_TEXT + drawX, drawY, HOLD_SIZE, HOLD_SIZE);
}

function canMove(moveX, moveY, newMino = tetroMino) {
    for(let y = 0; y < TETRIS_SIZE; y++ )
    {
        for(let x = 0; x < TETRIS_SIZE; x++ )
        {
            if(newMino[y][x])
            {
                let nextX = tetroMinoMoveX + x + moveX;
                let nextY = tetroMinoMoveY + y + moveY;
                // 当たり判定
                if(nextX < 0)
                {
                    return false;
                }
                if(nextY < 0)
                {
                    return false;
                }
                if(nextX >= PLAY_WIDTH)
                {
                    return false;
                }
                if(nextY >= PLAY_HEIGHT)
                {
                    return false;
                }
                if(screen[nextY][nextX])
                {
                    return false;
                }
            }
        }
    }
    return true;
}

function RightRotet() {
    let newMino = [];
    for(let y = 0; y < TETRIS_SIZE; y++ )
    {
        newMino[y] = [];
        for(let x = 0; x < TETRIS_SIZE; x++ )
        {
            newMino[y][x] = tetroMino[TETRIS_SIZE - 1 - x][y]
        }
    }
    return newMino;
}

// mino moving
document.onkeydown = (e) => {
    if(isGameOver) return;
    switch(e.code)
    {
        case 'ArrowLeft':
            if (canMove(-1, 0)) tetroMinoMoveX--;
            break;
        case 'ArrowRight':
            if (canMove(1, 0)) tetroMinoMoveX++;
            break;
        case 'ArrowDown':
            if (canMove(0, 1)) tetroMinoMoveY++;
            break;
        case 'ArrowUp':
            let newMino = RightRotet();
            if(canMove(0, 0, newMino))
            {
                tetroMino = newMino;
            }
            break;
        case 'KeyH':
            hasHold(crrentMino);
        break;
        case 'KeyO':
            isGameOver = true;
        break;
    }
    drawPlayScreen();
};

function hasHold(minoType)
{
    console.log(minoType);
    if(isHold) return;

    if(beforeHoldMino == undefined)
    {
        console.log("first");
        hold(minoType);
        ArrayNumber++;
        tetroMino = mino_type[minoLoop[ArrayNumber]];
    }
    else
    {    
        console.log("yeah");
        tetroMino = mino_type[beforeHoldMino];
        hold(minoType);
    }
    minoPosition();
    beforeHoldMino = minoType;
    isHold = true;
    drawPlayScreen();
}

function hold(minoType)
{
    drawHoldScreen();
    for(let y = 0; y < TETRIS_SIZE; y++)
    {
        for(let x = 0; x < TETRIS_SIZE; x++)
        {
            if(mino_type[minoType][y][x])
            {
                drawHold(x + 1, y + 1, minoType);
            }
        }
    }
}

function fixMino()
{
    for(let y = 0; y < TETRIS_SIZE; y++ )
    {
        for(let x = 0; x < TETRIS_SIZE; x++ )
        {
            if(tetroMino[y][x])
            {
                screen[tetroMinoMoveY + y][tetroMinoMoveX + x] = crrentMino;
            }
        }
    }
    ArrayNumber++;
    if(ArrayNumber == 7)
    {   
        randArray = Math.floor(Math.random() * 5040);
        nextMinoLoop = nextMino[randArray];
    }
    if(ArrayNumber <= 8)
    {
        ArrayNumber = 0;
        minoLoop = nextMinoLoop;
    }
    // draw NextMino
    for(let y = 0; y < TETRIS_SIZE; y++ )
    {
        for(let x = 0; x < TETRIS_SIZE; x++ )
        {
                drawNextMino(x, y, minoLoop[ArrayNumber + 1])
        }
    }
    
    
    isHold = false;
    console.log(isHold);
}

function clearLine() 
{
    for(let y = 0; y < PLAY_HEIGHT; y++ )
    {
        let isClearLine = true;
        for(let x = 0; x < PLAY_WIDTH; x++ )
        {
            if(screen[y][x] === 0)
            {
                console.log("a");
                isClearLine = false;
                break;
            }
        }
        if(isClearLine)
        {
            for (let newY = y; newY > 0; newY--)
            {
                for (let newX = 0; newX < PLAY_WIDTH; newX++) 
                {
                    screen[newY][newX] = screen[newY - 1][newX];
                }
            }
            points += 1;
            drawPointScreen();
        }
    }
}

function dropMino() 
{
    if(isGameOver) return;
    if(canMove(0, 1))
    {
        tetroMinoMoveY++;
    }
    else
    {
        fixMino();
        clearLine();
        ArrayNumber++;
        if(ArrayNumber == 7)
        {   
            randArray = Math.floor(Math.random() * 5040);
            nextMinoLoop = nextMino[randArray];
        }
        if(ArrayNumber <= 8)
        {
            ArrayNumber = 0;
            minoLoop = nextMinoLoop;
        }
        tetroMino = mino_type[crrentMino];
        minoPosition();

        if(!canMove(0, 0))
        {
            isGameOver = true;
        }
    }
    drawPlayScreen();
}

//canvas to center
const CONTAINER = document.getElementById('container');
CONTAINER.style.width = (FIELD_WIDTH * 2) + 'px';

function minoPosition(){
    tetroMinoMoveX = PLAY_WIDTH / 2 - TETRIS_SIZE / 2;
    tetroMinoMoveY = 0;
}

function init(){
    for(let y = 0; y < PLAY_HEIGHT; y++)
    {
        screen[y] = [];
        for(let x = 0; x < PLAY_WIDTH; x++)
        {
            screen[y][x] = 0;
        }
    }    
    
    console.log(nextMino[randArray]);
    console.log(minoLoop[ArrayNumber]);
    drawHoldScreen();
    drawPointScreen();
    drawnextMinoScreen();
    minoPosition();
    setInterval(dropMino, dropSpeed);
    drawPlayScreen();
}