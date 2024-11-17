// canvas settings
const BLOCK_SIZE = 30;
const HOLD_SIZE = 15;
const PLAY_WIDTH = 10;
const PLAY_HEIGHT = 20;
const SUB_WIDTH = PLAY_WIDTH * 3;

const CANVAS = document.getElementById("canvas");
const CANVAS_2D = CANVAS.getContext('2d');

const FIELD_WIDTH = BLOCK_SIZE * PLAY_WIDTH;
const FIELD_HEIGHT = BLOCK_SIZE * PLAY_HEIGHT;

const SUB_FIELD_WIDTH = BLOCK_SIZE * SUB_WIDTH;
const SUB_FIELD_HEIGHT = BLOCK_SIZE * PLAY_HEIGHT;

const TO_FIELD = FIELD_WIDTH / 2

const SUB_TEXT = HOLD_SIZE + BLOCK_SIZE;
CANVAS.width = FIELD_HEIGHT;
CANVAS.height = FIELD_HEIGHT;

const screen = [];

// MINO
const MINO_SIZE = 4;
const minoType = 
    [
        [0,0,0,0],
        [0,1,0,0],
        [1,1,1,0],
        [0,0,0,0]
    ];

let minoMoveX = 0;
let minoMoveY = 0;

let nowMino = minoType;

function drawSubScreen()
{
    //SubScreen
    CANVAS_2D.fillStyle = 'gray';
    CANVAS_2D.fillRect(0, 0, SUB_FIELD_WIDTH, SUB_FIELD_HEIGHT);
    //HoldScreen
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(HOLD_SIZE, 0, BLOCK_SIZE * MINO_SIZE, BLOCK_SIZE * MINO_SIZE);
    CANVAS_2D.font = "bold 15px 'Meiryo UI'";
    CANVAS_2D.fillText("_HOLD_",  SUB_TEXT, BLOCK_SIZE * (MINO_SIZE + 0.5))
    //NextScreen
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect( FIELD_WIDTH * 1.5 + HOLD_SIZE, 0, BLOCK_SIZE * MINO_SIZE, BLOCK_SIZE * MINO_SIZE);
    CANVAS_2D.fillText("_Next_", FIELD_WIDTH * 1.5 + SUB_TEXT, BLOCK_SIZE * (MINO_SIZE + 0.5))
}

function drawGasmeScreen()
{
    //MainScreen
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(FIELD_WIDTH / 2, 0, FIELD_WIDTH, FIELD_HEIGHT);
    CANVAS_2D.fillStyle = 'red';

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
    
    // draw Block
    for(let y = 0; y < MINO_SIZE; y++)
    {
        for(let x = 0; x < MINO_SIZE; x++)
        {
            if(nowMino[y][x])
            {
                drawBlock(minoMoveX + x, minoMoveY + y);
            }
        }
    }
}

function drawBlock(x, y)
{
    let drawX = x * BLOCK_SIZE + TO_FIELD;
    let drawY = y * BLOCK_SIZE;

    CANVAS_2D.fillStyle = 'red';
    CANVAS_2D.fillRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.strokeRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE)
}

function canMove(moveX, moveY, newMino = nowMino)
{
    for(let y = 0; y < MINO_SIZE; y++)
    {
        for(let x = 0; x < MINO_SIZE; x++)
        {
            if(newMino[y][x])
            {
                let nextX = minoMoveX + x + moveX;
                let nextY = minoMoveY + y + moveY;
                if(nextX < 0)
                {
                    return false;
                }
                if(nextY < 0)
                {
                    return false
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

document.onkeydown = (e) =>
{
    let newMino = [];
    switch(e.code)
    {
        case 'ArrowLeft':
            if(canMove(-1, 0)) minoMoveX--;
            break;
        case 'ArrowRight':
            if(canMove(1, 0)) minoMoveX++;
            break;
        case 'ArrowDown':
            if(canMove(0, 1)) minoMoveY++;
            break;
        case 'KeyX':
            newMino = rotate(1);
            if(canMove(0, 0))
            {
                nowMino = newMino;
            }
        break;
        case 'KeyZ':
            newMino = rotate(0);
            if(canMove(0, 0))
            {
                nowMino = newMino;
            }
        break;
    }
    drawGasmeScreen();
}

function rotate(direction)
{
    let newMino = [];
    for(let y = 0; y < MINO_SIZE; y++)
    {
        newMino[y] = [];
        for(let x = 0; x < MINO_SIZE; x++)
        {
            if(direction)
            {
                newMino[y][x] = nowMino[MINO_SIZE - 1 - x][y];
            }
            else
            {
                newMino[y][x] = nowMino[x][MINO_SIZE - 1 - y];
            }
        }
    }
    console.log('a')
    return newMino;
}


function init()
{
    for(let y = 0; y < PLAY_HEIGHT; y++)
    {
        screen[y] = [];
        for(let x = 0; x < PLAY_WIDTH; x++)
        {
            screen[y][x] = 0;
        }
    }    
    
    screen[5][5] = 1;
    drawSubScreen();
    drawGasmeScreen();
}