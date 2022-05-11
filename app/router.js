'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/create_blog', controller.blog.createMock);
  router.get('/getBlogsCount', controller.blog.getBlogsCount);
  router.resources('blog', '/api/v1/blog', controller.blog);
  router.resources('tag', '/api/v1/tag', controller.tag);
};
