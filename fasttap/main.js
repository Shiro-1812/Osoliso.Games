let isPlayNow = false; // Playing Game Now State

let randomNote = Math.floor( Math.random() * 3);

let combo = 0;

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
    drawMainScreen();
    
    isfall(); console.log("load isfall()");
    if(!isPlayNow)
    {
        gameOver();
    }
    else
    {
        drawNoteScreen(); console.log("load drawNoteScreen()");
        drawComboScreen();
    }
    
}

function drawComboScreen()
{
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.font = "40px serif";
    CANVAS_2D.fillText(`${combo}`, 450, 150);
}


function drawNoteScreen() // All Note View
{
    for(let y = 0; y < PLAY_HEIGHT; y++)
        {
            for(let x = 0; x < PLAY_WIDTH; x++)
            {
                if(NoteMap[y][x] == 1)
                {
                    drawNote(x, y);
                }
            }
        }  
}

function drawNote(x, y, Mode) // Mono Note View
{
    let drawX = x * (2 * BLOCK_SIZE) + NOTE_END_WIDTH;
    let drawY = y * (2 * BLOCK_SIZE) + NOTE_END_HEIGHT;

    CANVAS_2D.beginPath();
    CANVAS_2D.fillStyle = "#9EFD38";
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
        else if(sum < 0)
        {
            isPlayNow = false;
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
    randomNote = Math.floor( Math.random() * 3);
    NoteMap[0][randomNote] = 1;
}



document.onkeydown = (e) =>
{
    
        switch(e.code)
        {
            case 'KeyD':
                if(isPlayNow)
                {
                    console.log("push!");
                    NoteMap[7][0] = (NoteMap[7][0] == 1) ? 0 : -5;
                    if(NoteMap[7][0] == 0) combo++;
                }
                break;
            case 'KeyF':
                if(isPlayNow)
                {
                    console.log("push!");
                    NoteMap[7][1] = (NoteMap[7][1] == 1) ? 0 : -5;
                    if(NoteMap[7][1] == 0) combo++;
                }
                break;
            case 'KeyJ':
                if(isPlayNow)
                {
                    console.log("push!");
                    NoteMap[7][2] = (NoteMap[7][2] == 1) ? 0 : -5;
                    if(NoteMap[7][2] == 0) combo++;
                }
                break;
            case 'KeyK':
                if(isPlayNow)
                {
                    console.log("push!");
                    NoteMap[7][3] = (NoteMap[7][3] == 1) ? 0 : -5;
                    if(NoteMap[7][3] == 0) combo++;
                }
                break;
            case 'KeyR':
                console.log("push!R");
                init();
                break;
        }

        if(isPlayNow)
        {
            drawGameScreen();
        }
}

//=== PROGRAM INIT ==================================================================

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
    drawMainScreen()
    //drawStartScreenElem();

    
    for(let i = 0; i <= 7; i++)
    {   
        randomNote = Math.floor( Math.random() * 3);
        NoteMap[i][randomNote] = 1; 
        console.log(i);
    }
    
    isPlayNow = true;
    combo = 0;
    drawGameScreen(); 
}

function gameOver()
{
    drawMainScreen();
    // draw Result part Screen
    CANVAS_2D.fillStyle = '#C0C0C0';
    CANVAS_2D.fillRect(100, 350, 700, 400);
    // draw Text
    CANVAS_2D.fillStyle = 'red';
    CANVAS_2D.font = "60px serif";
    CANVAS_2D.fillText("MISS!!! GAME OVER!!!", 100, 300);
    CANVAS_2D.fillStyle = 'black';
    CANVAS_2D.fillText("-----------Result-----------", 110, 400);
    CANVAS_2D.fillText(`Point:  ${combo}`, 100, 550);
    CANVAS_2D.font = "30px serif";
    CANVAS_2D.fillText("ReStart: R", 390, 700);

}

//=== START SCREEN ===================================================================
function drawMainScreen()
{
    // Start Screen 
    CANVAS_2D.fillStyle = 'white';
    CANVAS_2D.fillRect(0, 0, 900, 900);
}

function drawStartScreenElem()
{
// Start Button
    CANVAS_2D.strokeStyle = '#005133';
    CANVAS_2D.lineWith = 10;
    CANVAS_2D.strokeRect(350, 500, 200, 50);
}