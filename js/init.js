// 初始化相关

import {addCfgNode, commit} from './DOM/DOMHelper.js'

function init()
{
    // 初始化threadcfg配置监听函数
    // addCfgNode的id就是html里面小节的id
    $("#thread_cfg_rp_click").click(() => {addCfgNode("thread_cfg_rp")})
    $("#thread_cfg_sysdisk_click").click(() => {addCfgNode("thread_cfg_sysdisk")})
    $("#thread_cfg_threads_click").click(() => {addCfgNode("thread_cfg_threads")})

    // 提交函数
    $("#cfg_commit").click(() => {commit()})
}

export {init}