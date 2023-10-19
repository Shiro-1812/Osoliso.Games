const regex = /[^0-9]/g;

function main()
{
    document.getElementById("startBtn").disabled = true;
    document.getElementById("str1").style.display = "block";
    let seek = Math.floor(Math.random() * 5) + 1;
    console.log(seek)
}

function clk(elem)
{
    let pshelem = elem.id;
    console.log(pshelem)
    
    let result = pshelem.replace(regex, "");
    let number = parseInt(result);
    console.log(number)
}