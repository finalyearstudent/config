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

/**
 * @description 在class为unit元素下添加相同格式的子元素，格式为label : input
 * 该元素的class都为cfg_item
 * @param {*} unitId class 为 unit 的元素id
 * @param {*} label 指定添加后的元素label，默认为空
 * @param {*} rule 用于限定是否还能添加，默认为None的时候判断总是为true
 */
function addCfgNode(unitId, label, rule) {
    if (!rule || rule && rule()) {
        let curNum = getAttrNum(unitId)
        let id = unitId + "_" + curNum
        let delId = id + "_del"
        if (!label) {
            label = ""
        }
        setAttrNum(unitId, curNum + 1)
        addSubNode(unitId, `<div id="${id}" class="cfg_item"><div id="${id}_label">${label}<div><input id="${id}_input" type="text"><span class="del" id="${delId}">-</span></div>`)
        // 添加监听函数
        $(`#${delId}`).click((e) => {delNode(id)})
    }
}

// 生成配置文件
function commit() {
    // todo
    let result = ""
    let boardType = "213d5678"
    // thread_cfg 节点提交
    result += threadCfgCommit(boardType)

    result = result.replaceAll("\n", "<br>")
    $("#result>.text").html(result)
}

/**
 * @description 收集某unit的全部input的值，空的input会被跳过
 * @param {*} unitId 
 * @param {*} rule rule函数返回为false的input会被跳过，rule的入参会是input的value
 */
function getAllValue(unitId, rule) {
    let values = []
    let key = `#${unitId} .cfg_item`
    let inputs = $(key).find("input")
    for (let i = 0; i < inputs.length; i++) {
        let value = inputs.get(i).value
        if (!value || value.length <= 0 || (rule && rule(value) != true))
            continue
        values.push(inputs.get(i).value)
    }
    
    return values
}

/**
 * @description 线程配置项填写内容提交
 * @param {} type 板类型
 */
function threadCfgCommit(type) {
    const bdfPat = /^[0-9|a-f|A-F]{1,2}:[0-1]?[0-9|a-f|A-F]\.[0-7]{1}$/
    // 收集填写的信息,要符合bdf规范的才收集
    let rcBdfList = getAllValue("thread_cfg_rp", bdf => bdfPat.test(bdf))
    let sysdiskBdfList = getAllValue("thread_cfg_sysdisk", bdf => bdfPat.test(bdf))
    let dpBdfList = getAllValue("thread_cfg_threads", bdf => bdfPat.test(bdf))
    // 根据配置项模板传递需要的参数
    return createConfig("ThreadConfig", {
        "sectionName" : `${type}_thread_cfg`,
        "rcBdfList" : rcBdfList,
        "sysdiskBdfList" : sysdiskBdfList,
        "dpBdfList" : dpBdfList
    })
}

export {addCfgNode, commit}