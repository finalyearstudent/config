// 初始化相关

import {addCfgNode, commit} from './DOM/DOMHelper.js'

function init()
{
    // 初始化监听函数
    $("#thread_cfg_rp_click").click(() => {addCfgNode("thread_cfg_rp")})
    $("#thread_cfg_sysdisk_click").click(() => {addCfgNode("thread_cfg_sysdisk")})
    $("#thread_cfg_threads_click").click(() => {addCfgNode("thread_cfg_threads")})
    $("#cfg_commit").click(() => {commit()})
}

export {init}