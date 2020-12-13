// DOM操作
// const MVVM_VALUE = "__value"
// DOM 绑定，动态更新
import { createConfig } from "../config/ConfigUtil.js"
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
    return parseInt($("#" + id).attr("num"), 10)
}

// 设置节点属性num值
function setAttrNum(id, value) {
    $("#" + id).attr("num", value)
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
    $("#" + id).remove()
}

// 定义node_type
const NODE_TYPE = {
    "INPUT": 0, // label + input
    "OPTIONS": 1 // label + OPTIONS
}

/**
 * @description 在class为unit元素下添加相同格式的子元素，格式见NODE_TYPE
 * 该元素的class都为cfg_item
 * @param {*} mode 选择子元素模板类型，并可以带自定义数据
 * mode.nodeType 模板类型
 * mode.data 和模板相关数据
 * @param {*} unitId class 为 unit 的元素id
 * @param {*} rule 用于限定是否还能添加，默认为None的时候判断总是为true,参数为unitId
 */
function addCfgNode(mode, unitId, rule) {
    if (!rule || rule && rule(unitId)) {
        let curNum = getAttrNum(unitId)
        let id = unitId + "_" + curNum
        let delId = id + "_del"
        setAttrNum(unitId, curNum + 1)
        let TempPrefix = `<div id="${id}" class="cfg_item">`
        let TempSuffix = `</div>`
        // div.cfg_item 模板是一定的，只有中间的部分会发生变化
        let innerTemp = ``

        if (mode.nodeType === NODE_TYPE.INPUT) {
            // label + input 模板
            let label = mode.data.label
            innerTemp = `<label id="${id}_label" for="${id}_input">${label}</label>
                         <div class='wrapper'>
                            <input id="${id}_input" type="text">
                            <span class='line'></span>
                        </div>
                            <span class="del" id="${delId}" title="删除当前项">-</span>`
            addSubNode(unitId, `${TempPrefix}${innerTemp}${TempSuffix}`)
            // 添加监听函数
            $(`#${delId}`).click((e) => { delNode(id) })
        } else if (mode.nodeType === NODE_TYPE.OPTIONS) {
            // label + option 模板
            let data = mode.data
            let label = data.label
            let options = ""
            for (let index in data.options) {
                options += `<option value ="${data.options[index]}">${data.options[index]}</option>`
            }
            innerTemp = `<label id="${id}_label" for="${id}_select">${label}</label>
                         <select id='${id}_select'>${options}</select>`
            addSubNode(unitId, `${TempPrefix}${innerTemp}${TempSuffix}`)
        } else {
            console.error("no such type!")
            return false
        }

    }
}

// 生成配置文件
function commit() {
    // todo
    let result = ""
    let type = boardCfgCommit()
    // thread_cfg 节点提交
    result += threadCfgCommit(type)

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
 * @description 单板配置提交
 */
function boardCfgCommit() {
    let boardType = getAllValue("type_cfg_board", value => /^[0-9|a-f|A-F]{2}$/.test(value))
    let backType = getAllValue("type_cfg_backboard", value => /^[0-9|a-f|A-F]{2}$/.test(value))
    if (boardType.length != 1 || backType.length != 1) {
        alert("单板配置错误!")
        return "单板配置错误"
    }

    return createConfig("BoardConfig", {
        "boardType": boardType[0],
        "backType": backType[0]
    })
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
        "sectionName": `${type}_thread_cfg`,
        "rcBdfList": rcBdfList,
        "sysdiskBdfList": sysdiskBdfList,
        "dpBdfList": dpBdfList
    })
}

export { addCfgNode, commit, NODE_TYPE }