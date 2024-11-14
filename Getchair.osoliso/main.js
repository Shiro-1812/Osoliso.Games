//初期設定
let Besttime = 100000;
let click_num = Math.floor(Math.random() * 3) + 4;
let oneclick = false;　//答えを一回しかクリック出来ない
let isEndGame = false; //ゲームが終わった後も答えをクリック出来ないようにする
let ranking = Array(10);
ranking.fill();

// getElementById
const startbutton = document.getElementById("startbutton");
const p = document.getElementById('p');
const gettime = document.getElementById("time");
const mybestTime = document.getElementById("mybestTime");

//開始がクリックされた
function main()
{
    isEndGame = true;
    //css 追加
    startbutton.style =
    ` 
        opacity:0.2;
        pointer-events:none;
    `;
    p.innerHTML = "よーい";
    //1秒間時間を止め、処理を行う
    setTimeout(() => {
        lightBoxNumber = Math.floor(Math.random() * 16) + 1;
        execution(lightBoxNumber);
        p.innerHTML = "スタート";
        startTime = new Date(); 
    },1000);
}

//答えに合わせて画像を差し替える
function execution(lightBoxNumber)
{
    let anwer_box = `box${lightBoxNumber}`;
    for(i = 1; i < 17; i++)
    {
        let box = `box${i}`;
        if(anwer_box != box)
        {
            document.getElementById(box).src = "images/chair_sit.png";  
        }
    }
}

//椅子がクリックされた
function clk(elem)
{
    let pshElem = elem.id;
    light_click(pshElem, lightBoxNumber);
}

//椅子がクリックされた処理、ぶっちゃけclk()に書いてもよかった気がする。
function light_click(pshElem, lightBoxNumber)
{
    let answer_box = `box${lightBoxNumber}`;
    if( pshElem == answer_box && !oneclick && isEndGame)
    {
        oneclick = true;
        endTime  = new Date();
        document.getElementById(answer_box).src = "images/chair_sit_me.png";
        let time = endTime - startTime;
        gettime.innerHTML = `Before:${time}[ms]`;
        isBestTime(time);
        //0.5秒経ったらリセットする
        setTimeout(() => {
            oneclick = false;
            isEndGame = false;
            reset(time);
            p.innerHTML = "*バグったらリセットしてください";
        },500);
    }
}

function isBestTime(time)
{
  //今回のタイムがベストタイムなら書き換える
    if(time < Besttime)
    {
        Besttime = time;
        mybestTime.innerHTML = `Best:${Besttime}[ms]`;
    }
}

//リセットする
function reset(time)
{
    makeRanking(time);
    for(i = 1; i < 17; i++)
    {
        box = `box${i}`;
        document.getElementById(box).src = "images/chair.png";
    }
    click_num = Math.floor(Math.random() * 3) + 4;
    //css 削除
    startbutton.style -= ` 
        opacity:0.2;
        pointer-events:none;
    `;
}

//ここからランキング作製
//配列管理で
function makeRanking(time)
{
for(i = 0; i < 10; i++)
{
    if(ranking[i] == undefined)
    {
        ranking[i] = time;
        break;
    }
    else if(ranking[i] < time)
    {
        continue;
    }
    else if(ranking[i] > time)
    {
        ranking.splice(i, 0, time);
        break;
    }
}
if(ranking.length != 10)
    ranking.length = 10;

drawRanking()
}

function drawRanking()
{
for(i = 0; i < 10; i++)
{
    if(ranking[i] == undefined) 
        continue;
    document.getElementById(`${i + 1}th`).textContent = `${i + 1}th:${ranking[i]}[ms]`
}

}



