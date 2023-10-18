//初期設定
let Besttime = 100000;
let click_num = Math.floor(Math.random() * 3) + 4
let oneclick = false;
let ranking = Array(10);
let playerName
ranking.fill();
//開始がクリックされた
function main()
{
    document.getElementById("startBtn").disabled = true;
    //1秒間時間を止め、処理を行う
    setTimeout(() => {
        lightBoxNumber = Math.floor(Math.random() * 12) + 1;
        execution(lightBoxNumber);  
        startTime = new Date(); 
    },1000);
}

//答えに合わせて画像を差し替える
function execution(lightBoxNumber)
{
    let anwer_box = "box" + String(lightBoxNumber);
    for(i = 1; i < 13; i++)
    {
        let box = "box" + String(i)
        if(anwer_box != box)
        {
            document.getElementById(box).src = "images/chair_sit.png";  
        }
    }
    console.log("answer is " + anwer_box);
    console.log(document.getElementById("box1").src);
}

//椅子がクリックされた
function clk(elem)
{
    playerName = document.getElementById("playername").value
    let pshElem = elem.id;
    console.log(pshElem);
    light_click(pshElem, lightBoxNumber);
}

//椅子がクリックされた処理、ぶっちゃけclk()に書いてもよかった気がする。
function light_click(pshElem, lightBoxNumber)
{
    let anwer_box = "box" + String(lightBoxNumber);
    if( pshElem == anwer_box && document.getElementById("startBtn").disabled == true && oneclick != true)
    {
        oneclick = true;
        endTime  = new Date();
        playerName = document.getElementById("playername").value 
        document.getElementById(anwer_box).src = "images/chair_sit_me.png";
        let time = endTime - startTime;
        document.getElementById("time").textContent = "前回 " + String(time) + "ミリ秒";
        isBestTime(time);

        //1秒経ったらリセットする
        setTimeout(() => {
            oneclick = false;
            reset(time);
        },1000);
    }
    //4~6回クリックすると座っている人を蹴落とせる
    else if(document.getElementById("startBtn").disabled == true)
    {
      click_num -= 1;
      if(click_num < 0 && oneclick != true)
      { 
        oneclick = true;
        endTime = new Date();
        playerName = document.getElementById("playername").value
        document.getElementById(pshElem).src = "images/chair_drop.png"
        let time = endTime - startTime;
        document.getElementById("time").textContent = "前回 " + String(time) + "ミリ秒";
        //1秒経ったらベストタイムか判定する
        setTimeout(() => {
          isBestTime(time);
          oneclick = false;
          reset(time);

        },1000);
      }
    }
}
function isBestTime(time)
{
  //今回のタイムがベストタイムなら書き換える
  if(time < Besttime)
  {
      Besttime = time;
      console.log(Besttime);
      document.getElementById("mybestTime").textContent = "ベスト " + String(Besttime) + "ミリ秒";
  }
}

//リセットする
function reset(time)
{
  makeRanking(time);
  for(i = 1; i < 13; i++)
  {
    box = "box" + String(i);
    document.getElementById(box).src = "images/chair.png";
  }
  click_num = Math.floor(Math.random() * 3) + 4
  document.getElementById("startBtn").disabled  = false;
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
  {
    ranking.length = 10;
  }
  drawRanking()
}

//jsonファイルへ変換する
function drawRanking()
{
  for(i = 0; i < 10; i++)
  {
    rank = String(i + 1) + "th"
    if(ranking[i] == undefined) continue
    document.getElementById(rank).textContent = rank + " " + String(ranking[i]) + " ミリ秒"
  }
  
}



