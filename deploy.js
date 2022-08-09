/**
 * run `node deploy.js` to deploy or update siyuan note
 */
const cp = require('child_process')
function update_siyuanNote() {
    let ans = cp.execSync("sudo docker ps").toString().split("\n").map(v => v.split(/\s\s+/)).filter(v => v[1] === "b3log/siyuan")
    let step = ""
    if (ans.length === 1) {
        let id = ans[0][0]
        step = "get siyuanNote id : ${id}"
        console.log(step)

        step = cp.execSync(`sudo docker stop ${id}`).toString()
        console.log(`停止 ${step}`)

        step = cp.execSync(`sudo docker rm ${id}`).toString()
        console.log(`删除 ${step}`)
    } else if (ans.length === 0) {
        if (ans.length === 0);
        console.log("未检测到思源笔记，即将新建")
    } else {
        throw Error(`检测到${ans.length}个思源笔记的docker，不符合预期的值：1`)
    }

    step = cp.execSync(`sudo docker image pull b3log/siyuan`).toString()
    console.log(step)

    step = cp.execSync(`sudo docker run --name siyuan -it -d --restart=always -v ~/siyuan/:/home/siyuan/Documents/SiYuan -p 6806:6806 b3log/siyuan`).toString()
    console.log(step)

    step = cp.execSync("sudo docker ps").toString()
    console.log(step)
    // 返回docker id
    return step.split("\n").map(v => v.split(/\s\s+/)).filter(v => v[1] === "b3log/siyuan")[0][0]
}

console.log(update_siyuanNote())
