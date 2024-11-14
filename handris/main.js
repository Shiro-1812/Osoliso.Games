// canvas settings
const BLOCK_SIZE = 30;
const HOLD_SIZE = 15;
const PLAY_WIDTH = 10;
const PLAY_HEIGHT = 20;

const CANVAS = document.getElementById("canvas");
const CANVAS_2D = CANVAS.getContext('2d');

const FIELD_WIDTH = BLOCK_SIZE * PLAY_WIDTH;
const FIELD_HEIGHT = BLOCK_SIZE * PLAY_HEIGHT;
CANVAS.width = FIELD_HEIGHT;
CANVAS.height = FIELD_HEIGHT;

//draw Points
let points = 0;
CANVAS_2D.font = "40px 'Meiryo UI'";
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

// gets random tetroMino 
let randMino = Math.floor(Math.random() * (mino_type.length - 1)) + 1;
let tetroMino = mino_type[randMino];

let beforeHoldMino = undefined;
let isHold = false;

// Move distance
tetroMinoMoveX = 0;
tetroMinoMoveY = 0;

// Mino's falling speed
const dropSpeed = 500;

// Is Game End?
let isGameOver = false;

// draw static screen
function draw_init_()
{
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect( FIELD_WIDTH + BLOCK_SIZE, 0, (TETRIS_SIZE + 2)* HOLD_SIZE, (TETRIS_SIZE + 2) * HOLD_SIZE);
}

// draw dynamic screen 
function drawPlayScreen()
{
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

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

    for(let y = 0; y < TETRIS_SIZE; y++)
    {
        for(let x = 0; x < TETRIS_SIZE; x++)
        {
            if(tetroMino[y][x])
            {
                drawBlock( tetroMinoMoveX + x, tetroMinoMoveY + y, randMino);
            }
        }
    }

    if(isGameOver)
        {
            const GAME_OVER_MESSAGE = 'GAME OVER';
            const width = CANVAS_2D.measureText(GAME_OVER_MESSAGE).width;
            const x = FIELD_WIDTH / 2 - width / 2;
            const y = FIELD_HEIGHT / 2 - 20;
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
    CANVAS_2D.fillRect(FIELD_WIDTH + BLOCK_SIZE + drawX, drawY, HOLD_SIZE, HOLD_SIZE);
    CANVAS_2D.strokeStyle = 'black';
    CANVAS_2D.strokeRect(FIELD_WIDTH + BLOCK_SIZE + drawX, drawY, HOLD_SIZE, HOLD_SIZE);
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
            hasHold(randMino);
        break;

    }
    drawPlayScreen();
};

function hasHold(minoType)
{
    if(isHold) return;

    if(beforeHoldMino == undefined)
    {
        console.log("first");
        hold(minoType);
        randMino =  Math.floor(Math.random() * (mino_type.length - 1)) + 1;
        tetroMino = mino_type[randMino];
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
    draw_init_();
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
                screen[tetroMinoMoveY + y][tetroMinoMoveX + x] = randMino;
            }
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
            points += 1000;
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
        randMino =  Math.floor(Math.random() * (mino_type.length - 1)) + 1;
        tetroMino = mino_type[randMino];
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

    draw_init_();

    minoPosition();
    setInterval(dropMino, dropSpeed);
    drawPlayScreen();
}