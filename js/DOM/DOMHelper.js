// DOM操作
// const MVVM_VALUE = "__value"
// DOM 绑定，动态更新
import {createConfig} from "../config/ConfigUtil.js"
/**
 * @description 实现mvvm绑定，动态监听元素的值变化
 * @param {*} id 要绑定的元素id
 */
// function mvvm(id) {
//     Object.defineProperty($("#"+id), MVVM_VALUE, {
//         get:function(){
//             console.log("get")
//         },
//         set:function() {
//             console.log("set")
//         }
//     })
// }

// 获取节点属性num值
function getAttrNum(id) {
    return parseInt($("#"+id).attr("num"), 10)
}

// 设置节点属性num值
function setAttrNum(id, value) {
    $("#"+id).attr("num", value)
}
/**
 * @name addSubNode
 * @description 添加子节点
 */
function addSubNode(id, template) {
    $("#" + id).append($(template))
}

// 删除节点
function delNode(id) {
    $("#"+id).remove()
}

// 添加节点
function addCfgNode(cfgName) {
    let curNum = getAttrNum(cfgName)
    let id = cfgName + "_" + curNum
    let delId = id + "_del"
    setAttrNum(cfgName, curNum + 1)
    addSubNode(cfgName, `<div id="${id}" class="cfg_item">bdf: <input type="text"><span class="del" id="${delId}">-</span></div>`)
    // 添加监听函数
    $(`#${delId}`).click((e) => {delNode(id)})
}

// 生成配置文件
function commit() {
    // thread_cfg 节点提交
    threadCfgCommit()
}

// type 板类型
function threadCfgCommit(type) {
    let commitObj = {
        "sectionName" : "string",
        "rcBdfList" : [],
        "sysdiskBdfList" : [],
        "dpBdfList" : []
    }

    // example
    let threadcfg = createConfig("ThreadConfig", {
        "sectionName" : "21037655_thread_cfg",
        // 线程对应的bdf号
        "rcBdfList" : ["16:4.0", "30:2.0", "30:4.0", "9f:2.0"],
        "sysdiskBdfList" : ["0:1d.0"],
        "dpBdfList" : ["58:d.0", "58:2.0", "58:0.0", "58:3.0", "58:0.0", "58:4.0", "58:5.0", "58:1.0"]
    })
    console.log(threadcfg)
}

export {addCfgNode, commit}