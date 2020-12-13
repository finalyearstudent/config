// 配置项定义
/**
 * @name ConfigBase
 * @description 配置项基类
 * @constructor provateDate 私有属性，用于构建本配置项的全部数据
 * @version 1.0.0
 */
class ConfigBase{
    template = {}
    constructor(privateData){
        this.privateData = privateData
    }
    /**
     * @description 校验传入参数和合法性 参数名 和 参数类型
     * @returns false if error, ture if success
     */
    checkPrivateData(template){
        for (const [key, value] of Object.entries(this.privateData)) {
            if ((Object.keys(this.privateData).length != Object.keys(template).length ||
                !(key in template)) &&
                (typeof value != template[key] ||
                !(typeof value == "object" && value instanceof eval(template[key])))) {
                    return false
            }
        }
        return true
    }
    /**
     * @description 生成当前配置项
     * @returns false if error, others if success
     */
    create(){
        if (false == this.checkPrivateData(this.template)) {console.error("privateData check failed."); return false}
        // 校验通过后再执行
        return this.start()
    }

    /**
     * @description 生成配置项具体实现
     */
    start(){
        return false
    }

    /**
     * @description 创建key=value 带换行符
     */
    createKeyAndValueString(key, value){
        return key + "=" + value + "\n"
    }

    /**
     * @description 10进制转16进制
     */
    OCT2DEX(oct){
        return oct.toString(16)
    }

    /**
     * @description bdf转为16进制
     */
    BDF2HEX(bdf){
        if (/^[0-9|a-f|A-F]{1,2}:[0-1]?[0-9|a-f|A-F]\.[0-7]{1}$/.test(bdf)) {
            let colonIndex = bdf.indexOf(':')
            let commaIndex = bdf.indexOf('.')
            let Bus = bdf.substring(0, colonIndex)
            let Device = bdf.substring(colonIndex + 1, commaIndex)
            let Function = bdf.substring(commaIndex + 1)
            Function = (1 & parseInt(Device, 16)) * 8 + parseInt(Function, 16)
            Device = parseInt(Device, 16) >> 1
            let Low = `${Device.toString(16)}${Function.toString(16)}`
            let High = "00"
            if (parseInt(Bus, 16) < 16) {
                High = `0${this.OCT2DEX(Bus)}`
            } else {
                High = `${this.OCT2DEX(Bus)}`
            }
            return `${High}${Low}`
        }
        return false
    }
}

/**
 * @name ThreadConfig
 * @description 线程配置项
 * @constructor provateDate 私有属性，用于构建本配置项的全部数据
 * @privateDataTemplate privateData的模板
 *  {
 *      "sectionName" : "string" 配置项名
 *  }
 * @version 1.0.0
 */
class ThreadConfig extends ConfigBase{
    // 传递的privateData的模板
    template = {
        "sectionName" : "string",
        // 线程对应的bdf号
        "rcBdfList" : "Array",
        "sysdiskBdfList" : "Array",
        "dpBdfList" : "Array"
    }

    #cfgNum = "cfg_num"
    #rcNum = "rc_num"
    #sysDiskNum = "sysdisk_num"
    #threadPrefix = "thread_cfg_"
    #hex_prefix = "0x"

    /**
     * @description 生成配置项具体实现
     */
    start(){
        // 统计线程个数
        let rcBdfList = this.privateData["rcBdfList"]
        let sysdiskBdfList = this.privateData["sysdiskBdfList"]
        let dpBdfList = this.privateData["dpBdfList"]

        let allBdfList = new Array()
        allBdfList = allBdfList.concat(rcBdfList)
        allBdfList = allBdfList.concat(sysdiskBdfList)
        allBdfList = allBdfList.concat(dpBdfList)

        let configText = ""
        let rcNum = rcBdfList.length
        let sysDiskNum = sysdiskBdfList.length
        let threadNum = rcNum + sysDiskNum + dpBdfList.length
        // section_name
        configText += `[${this.privateData['sectionName']}]\n`
        // cfg_num
        configText += this.createKeyAndValueString(this.#cfgNum, this.#hex_prefix + this.OCT2DEX(threadNum))
        // rc_num
        configText += this.createKeyAndValueString(this.#rcNum, this.#hex_prefix + this.OCT2DEX(rcNum))
        // sysdisk_num
        configText += this.createKeyAndValueString(this.#sysDiskNum, this.#hex_prefix + this.OCT2DEX(sysDiskNum))
        // thread_cfg_
        for (let index in allBdfList) {
            index = parseInt(index, 10)
            configText += this.createKeyAndValueString(this.#threadPrefix + this.OCT2DEX(index), this.#hex_prefix + this.BDF2HEX(allBdfList[index]))
        }
        return configText
    }
}

export {ThreadConfig}