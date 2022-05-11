const Service = require('egg').Service;

class BlogService extends Service {
  async index(page) {
    const res = await this.app.mysql.select('blog', {
      limit: 10,
      offset: (page - 1) * 10
    });
    return res
  }

  async create(entry) {
    const res = await this.app.mysql.insert('blog',
      { title: entry.title, content: entry.content, time: entry.time, tag: entry.tag });
    return res;
  }

  async getBlogsCount() {
    return await this.app.mysql.query('SELECT COUNT(*) AS res FROM `blog`')
  }

  async show(id) {
    return await this.app.mysql.get('blog', { id })
  }

  async update(blog) {
    const res = await this.app.mysql.update('blog',
      { id: blog.id, content: blog.content, title: blog.title })
    return res
  }

  async destroy(id) {
    const res = await this.app.mysql.delete('blog', {
      id
    })
  }
}

module.exports = BlogService;
