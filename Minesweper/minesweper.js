let table = document.getElementById("table");
for (let y = 0; y < 9; y++) {
    let tr = document.createElement("tr");
    for (let x = 0; x < 9; x++) {
        let td = document.createElement("td");
        td.style.width = "50px";
        td.style.height = "50px";
        td.style.border = "solid 1px black";
        td.id = y + '-' + x;
        if (board[y][x] == 1) {
            td.style.backgroundColor = "white";
        } else {
            td.style.backgroundColor = "silver";
        }
        // 生成
        tr.appendChild(td);
    }
    BoardTable.appendChild(tr);
}