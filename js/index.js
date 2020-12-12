import * as INIT from './init.js'
import {createConfig} from "./config/ConfigUtil.js"

// 页面准备
INIT.init()

// example
createConfig("ThreadConfig", {
    "sectionName" : "21037655_thread_cfg",
    // 线程对应的bdf号
    "rcBdfList" : ["16:4.0", "30:2.0", "30:4.0", "9f:2.0"],
    "sysdiskBdfList" : ["0:1d.0"],
    "dpBdfList" : ["58:d.0", "58:2.0", "58:0.0", "58:3.0", "58:0.0", "58:4.0", "58:5.0", "58:1.0"]
})
