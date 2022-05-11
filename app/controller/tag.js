const Controller = require('egg').Controller;

class TagController extends Controller {
  async index() {
    const { ctx } = this;
    const res = await ctx.service.tag.index()
    ctx.body = res
  }
}

module.exports = TagController;
