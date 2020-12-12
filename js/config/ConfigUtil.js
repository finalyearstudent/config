// 提供配置项便捷操作

import ConfigFacotry from "./ConfigFactory.js"

// 生成配置项
function createConfig(sectionName, privateData) {
    let configFacotry = new ConfigFacotry(sectionName)
    let threadConfig = configFacotry.getConfig(privateData)
    return threadConfig.create()
}

export {createConfig}