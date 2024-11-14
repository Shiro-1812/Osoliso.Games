function permutation(arr, n) 
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
            let row = permutation(parts, n - 1)
            for (let j = 0; j < row.length; j++) {
                ans.push([arr[i]].concat(row[j]))
            }
        }
    }
    return ans;
}
