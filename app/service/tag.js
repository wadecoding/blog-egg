const Service = require('egg').Service;

class TagService extends Service {
  // todo: 改成真正按标签返回文章列表
  async index() {
    return await this.app.mysql.select('blog', {
      limit: 10,
      offset: 0
    })
  }
}

module.exports = TagService;
