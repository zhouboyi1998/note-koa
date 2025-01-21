const mongoose = require('mongoose')
const { Command } = require('../repository/command')

// 根据id查询命令
exports.one = async (ctx) => {
    // 根据id查询命令
    ctx.body = await Command.findOne({ _id: ctx.params.commandId }).lean().exec()
}

// 查询命令列表
exports.list = async (ctx) => {
    ctx.body = await Command.find().lean().exec()
}

// 新增命令
exports.insert = async (ctx) => {
    // 获取请求体参数
    let command = ctx.request.body
    // 生成文档id
    command._id = mongoose.Types.ObjectId()
    // 新增命令
    ctx.body = await Command.create(command)
}

// 批量新增命令
exports.insertBatch = async (ctx) => {
    // 获取请求体参数
    let commandList = ctx.request.body.map(command => ({
        ...command,
        // 为每一个新增的命令生成文档id
        _id: mongoose.Types.ObjectId()
    }))
    // 批量新增命令
    ctx.body = await Command.create(commandList)
}

// 修改命令
exports.update = async (ctx) => {
    // 获取请求体参数
    let command = ctx.request.body
    // 修改命令
    ctx.body = await Command.updateOne({ _id: command._id }, command).exec()
}

// 批量修改命令
exports.updateBatch = async (ctx) => {
    // 获取请求体参数
    let commandList = ctx.request.body
    // 遍历命令数组
    const promiseList = commandList.map(command =>
        Command.updateOne({ _id: command._id }, command).exec()
    )
    // 等待所有修改操作完成
    ctx.body = await Promise.all(promiseList)

}

// 删除命令
exports.delete = async (ctx) => {
    // 根据文档id删除命令
    ctx.body = await Command.deleteOne({ _id: ctx.params.commandId }).exec()
}

// 批量删除命令
exports.deleteBatch = async (ctx) => {
    // 获取请求体参数
    let commandList = ctx.request.body
    // 遍历命令数组
    const promiseList = commandList.map(command =>
        Command.deleteOne({ _id: command._id }, command).exec()
    )
    // 等待所有修改操作完
    ctx.body = await Promise.all(promiseList)
}

// 查询命令
exports.select = async (ctx) => {
    // 根据命令名称查询数据
    ctx.body = await Command.findOne({ command: ctx.params.commandName }).lean().exec()
}

// 查询命令名称列表
exports.nameList = async (ctx) => {
    // 查询命令列表
    const result = await Command.find().lean().exec()
    // 获取命令名称列表
    ctx.body = result.map(command => command.command)
}
