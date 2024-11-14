// canvas settings
const BLOCK_SIZE = 30;
const PLAY_WIDTH = 10;
const PLAY_HEIGHT = 20;

const CANVAS = document.getElementById("canvas");
const CANVAS_2D = CANVAS.getContext('2d');

const CANVAS_WIDTH = BLOCK_SIZE * PLAY_WIDTH;
const CANVAS_HEIGHT = BLOCK_SIZE * PLAY_HEIGHT;
CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;
//Game field
const screen = []; 
//kind of tetroMino
const TETRIS_SIZE = 4;
let mino_type = [
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
// gets random tetroMino 
let randMino = Math.floor(Math.random() * mino_type.length);
let tetroMino = mino_type[randMino];
// Move distance
tetroMinoMoveX = 0;
tetroMinoMoveY = 0;
// draw dynamic screen 
const drawPlayScreen = () => {
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    CANVAS_2D.fillStyle = 'blue'

    for(let y = 0; y < PLAY_HEIGHT; y++)
    {
        for(let x = 0; x < PLAY_WIDTH; x++)
        {
            if(screen[y][x])
            {
                drawBlock(x, y);
            }
        }
    }     

    for(let y = 0; y < TETRIS_SIZE; y++)
    {
        for(let x = 0; x < TETRIS_SIZE; x++)
        {
            if(tetroMino[y][x])
            {
                drawBlock( tetroMinoMoveX + x, tetroMinoMoveY + y);
            }
        }
    }
};

const drawBlock = (x, y) => {
    let drawX = x * BLOCK_SIZE;
    let drawY = y * BLOCK_SIZE;

    CANVAS_2D.fillStyle = 'blue';
    CANVAS_2D.fillRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
}

const canMove = () => {

}

// mino moving
document.onkeydown = (e) => {
    switch(e.code)
    {
        case 'ArrowLeft':
            tetroMinoMoveX--;
            break;
        case 'ArrowRight':
            tetroMinoMoveX++;
            break;
        case 'ArrowDown':
            tetroMinoMoveY++;
            break;
    }
    drawPlayScreen();
}

const __init__ = () => {
    for(let y = 0; y < PLAY_HEIGHT; y++)
        {
            screen[y] = [];
            for(let x; x < PLAY_WIDTH; x++)
            {
                screen[y][x] = 0;
            }
        }    

    drawPlayScreen();
};
