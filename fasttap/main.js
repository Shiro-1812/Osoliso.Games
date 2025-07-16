// Canvas settings
const BLOCK_SIZE = 50; // TAP BLOCK
BLOCK_LINE = 4

const CANVAS = document.getElementById("canvas");
const CANVAS_2D = CANVAS.getContext('2d');

const PLAY_HEIGHT = 8; // Note height line 
const PLAY_WIDTH  = 4; // Note width line
const NOTE_END_WIDTH = 300; // draw Note start 
const NOTE_END_HEIGHT = 50;
let NoteMap = [];
let NextMap = [0, 0, 0, 0];

CANVAS.width = 900;
CANVAS.height = 900;

function drawGameScreen() // Game Screen View
{
    CANVAS_2D.fillStyle = 'grey';
    CANVAS_2D.fillRect(0, 0, 900, 900);
    
    isfall(); console.log("load isfall()");
    drawNoteScreen(); console.log("load drawNoteScreen()");
}

function drawNoteScreen() // All Note View
{
    for(let y = 0; y < PLAY_HEIGHT; y++)
        {
            for(let x = 0; x < PLAY_WIDTH; x++)
            {
                if(NoteMap[y][x])
                {
                    drawNote(x, y, NoteMap[y][x]);
                }
            }
        }  
}

function drawNote(x, y) // Mono Note View
{
    let drawX = x * (2 * BLOCK_SIZE) + NOTE_END_WIDTH;
    let drawY = y * (2 * BLOCK_SIZE) + NOTE_END_HEIGHT;

    CANVAS_2D.beginPath();
    CANVAS_2D.fillStyle = "#9EFD38"
    CANVAS_2D.arc( drawX, drawY, BLOCK_SIZE, 0, 2 * Math.PI);
    CANVAS_2D.fill();
}

function isfall()
{
    for( i = 7; i >= 0; i--)
    {
        let sum = NoteMap[i][0] + NoteMap[i][1] + NoteMap[i][2] + NoteMap[i][3];
        console.log(`sum[${i}]:${sum}`);
        if(!sum)
        {
            fallNote(i);
        } 
        else
        {
            break;
        }
    }
}

function fallNote(fallLine)
{
    for( i = fallLine; i >= 1; i--)
    {
        for( j = 0; j <= 3; j++)
        {
            NoteMap[i][j] = NoteMap[i - 1][j];
            NoteMap[i - 1][j] = 0;
        }
    }
}



document.onkeydown = (e) =>
{
    switch(e.code)
    {
        case 'KeyD':
            console.log("push!");
            NoteMap[7][0] = 0;
            break;
        case 'KeyF':
            console.log("push!");
            NoteMap[7][1] = 0;
            break;
        case 'KeyJ':
            console.log("push!");
            NoteMap[7][2] = 0;
            break;
        case 'KeyK':
            console.log("push!");
            NoteMap[7][3] = 0;
            break;
    }
    drawGameScreen();
}

function init()
{
    for(let y = 0; y < PLAY_HEIGHT; y++)
    {
        NoteMap[y] = [];
        for(let x = 0; x < PLAY_WIDTH; x++)
        {
            NoteMap[y][x] = 0;
        }
    }    
    NoteMap[7][1] = 1; NoteMap[7][2] = 1;
    NoteMap[6][3] = 1;
    NoteMap[5][2] = 1;
    NoteMap[4][1] = 1;
    NoteMap[3][0] = 1;
    drawGameScreen();
}