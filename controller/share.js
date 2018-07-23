const Url = require('../model/url_schema')
const User = require('../model/user_schema')
const only = require('only')

/**
 * 查询详情
 */
exports.findOne = async (ctx) => {
    let id = ctx.params.urlId
    ctx.body = {
        data: await Url.findOne({ _id: id }).populate({ path: 'author', select: 'id name' })
    }
}

/**
 * 分享链接
 */
exports.sendUrl = async (ctx) => {
    let url = new Url(only(ctx.request.body, 'link title describe'))
    url.author = ctx.state.user
    await url.save()
    ctx.body = { data: url }
}

/** 
 * 搜索链接
*/
exports.search = async (ctx) => {
    let query = ctx.request.query
    let params = {}
    params.page = Number(query.page) // 页码
    params.pageSize = Number(query.pageSize) // 一页条数
    if (query.criteria) { // 搜索条件
        params.criteria = JSON.parse(query.criteria)
    }
    ctx.body = {
        data: await Url.search(params)
    }
}