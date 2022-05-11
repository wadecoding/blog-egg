'use strict';

const Controller = require('egg').Controller;
const Mock = require('mockjs')

class BlogController extends Controller {
  async index() {
    const { ctx } = this
    const page = ctx.query.page
    const res = await ctx.service.blog.index(page)
    ctx.body = res
    ctx.status = 200
  }

  async getBlogsCount() {
    const res = await this.ctx.service.blog.getBlogsCount()
    this.ctx.body = res
    this.ctx.status = 200
  }

  // 利用Mockjs往数据库里新增一篇随机文字的文章
  async createMock() {
    const { ctx } = this;
    const Random = Mock.Random
    const title = '# ' + Random.cparagraph(1, 1).split('。')[0]
    const secondTitleArr = Random.cparagraph(3, 7)
      .split('。')
      .filter(sentence => sentence.length > 0)
      .map(sentence => '## ' + sentence)
    let blog = ''
    for (let title of secondTitleArr) {
      blog += title
      blog += '\n'
      blog += Random.cparagraph(3, 9)
      blog += '\n\n'
    }

    const res = await ctx.service.blog.create(title, blog);
    ctx.body = res
  }

  async new() {
    const { ctx } = this
    // mock
    const Random = Mock.Random
    const title = '# ' + Random.cparagraph(1, 1).split('。')[0]
    const secondTitleArr = Random.cparagraph(3, 7)
      .split('。')
      .filter(sentence => sentence.length > 0)
      .map(sentence => '## ' + sentence)
    let blog = ''
    for (let title of secondTitleArr) {
      blog += title
      blog += '\n'
      blog += Random.cparagraph(3, 9)
      blog += '\n\n'
    }
    let time = '2022-05-10'
    let tag = '笔记'
    let entry = {
      title,
      blog,
      time,
      tag
    }
    // mock
    const res = await ctx.service.blog.create(entry);
    ctx.body = {
      id: res.insertId
    }
    ctx.status = 201
  }

  async show() {
    const id = this.ctx.params.id
    const res = await this.ctx.service.blog.show(id)
    this.ctx.body = res
  }

  async update() {
    const blog = this.ctx.request.body
    console.log(this.ctx.service.blog);
    const res = await this.ctx.service.blog.update(blog)
    this.ctx.body = res
    this.ctx.status = 204
  }

  async destroy() {
    const id = this.ctx.params.id
    const res = await this.ctx.service.blog.destroy(id)
    this.ctx.status = 204
  }
}

module.exports = BlogController
