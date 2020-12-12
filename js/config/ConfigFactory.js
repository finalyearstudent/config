// 工厂类接口
// ES6 写法
import * as Config from "./Config.js"

/**
 * @name ConfigFacotry
 * @description 工厂类，生成配置类实例
 * @constructor configName 要获取的配置项实例
 * @version 1.0.0
 */
class ConfigFacotry{

    configMap = {
        // 线程配置项
        "ThreadConfig" : "ThreadConfig"
    }

    constructor(configName){
        this.configName = configName
    }

    /**
     * @param {*} privateData Config类要使用的私有数据
     */
    getConfig(privateData){
        if (this.configName in this.configMap) {
            // 如果有此配置项，生成配置项实例，并将要用到的参数传入
            let script = "new " + "Config." +this.configMap[this.configName] + "(" + JSON.stringify(privateData) + ")"
            return eval(script)
        }
    }
}

export default ConfigFacotry