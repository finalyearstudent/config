// 初始化相关

import { addCfgNode, commit, NODE_TYPE } from './DOM/DOMHelper.js'

function init() {
    // 初始化单板
    $("#type_cfg_board_click").click(() => addCfgNode({
            "nodeType": NODE_TYPE.INPUT,
            "data": {
                "label": "请输入单板类型"
            }
        }, "type_cfg_board",
        (unitId) => $(`#${unitId}>.cfg_item`).length < 1))

    $("#type_cfg_backboard_click").click(() => addCfgNode({
            "nodeType": NODE_TYPE.INPUT,
            "data": {
                "label": "请输入背板类型"
            }
        }, "type_cfg_backboard",
        (unitId) => $(`#${unitId}>.cfg_item`).length < 1))

    // 初始化threadcfg配置监听函数
    // addCfgNode的id就是html里面小节的id
    $("#thread_cfg_rp_click").click(() => {
        addCfgNode({
            "nodeType": NODE_TYPE.INPUT,
            "data": {
                "label": "请输入BDF号："
            }
        }, "thread_cfg_rp")
    })

    $("#thread_cfg_sysdisk_click").click(() => {
        addCfgNode({
            "nodeType": NODE_TYPE.INPUT,
            "data": {
                "label": "请输入BDF号："
            }
        }, "thread_cfg_sysdisk")
    })

    $("#thread_cfg_threads_click").click(() => {
        addCfgNode({
            "nodeType": NODE_TYPE.INPUT,
            "data": {
                "label": "请输入BDF号："
            }
        }, "thread_cfg_threads")
    })

    // 提交函数
    $("#cfg_commit").click(() => { commit() })
}

export { init }