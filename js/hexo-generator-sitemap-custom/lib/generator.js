'use strict';

const micromatch = require('micromatch');
const template = require('./template');

module.exports = function(locals) {
  const { config } = this;
  const { sitemap, skip_render } = config;
  const { tags: tagsCfg, categories: catsCfg } = sitemap;
  const skipRenderList = [
    '**/*.js',
    '**/*.css'
  ];

  if (Array.isArray(skip_render)) {
    skipRenderList.push(...skip_render);
  } else if (typeof skip_render === 'string') {
    if (skip_render.length > 0) {
      skipRenderList.push(skip_render);
    }
  }

  const posts = [].concat(locals.posts.toArray(), locals.pages.toArray())
    .filter(post => {
      return post.sitemap !== false && !isMatch(post.source, skipRenderList);
    })
    .sort((a, b) => {
      return b.updated - a.updated;
    });

  if (posts.length <= 0) {
    sitemap.rel = false;
    return;
  }

  function mapDefaultLang(post) {
    if (post.lang === undefined || post.lang === 'default') {
      return ['ko', 'en'];
  } else {
      return [post.lang];
    }
  }

  function filterLang(lang, idx, arr) {
    return arr.indexOf(lang) === idx;
  }

  const tags = locals.tags.toArray().map(tag => {
    return {
      name: tag.name,
      slug: tag.slug, 
      length: tag.length, 
      langs: tag.posts.map(mapDefaultLang).reduce((acc, val) => acc.concat(val), []).filter(filterLang),
      path: tag.path,
      paths: tag.posts.map(mapDefaultLang).reduce((acc, val) => acc.concat(val), []).filter(filterLang).map(lang => {
        return `${config.url}/${lang}/${tag.path}`;
      }),
      permalink: tag.permalink
    };
  });
  // console.log(tags);

  const categories = locals.categories.toArray().map(category => {
    return {
      name: category.name,
      slug: category.slug,
      length: category.length,
      langs: category.posts.map(mapDefaultLang).reduce((acc, val) => acc.concat(val), []).filter(filterLang),
      path: category.path,
      paths: category.posts.map(mapDefaultLang).reduce((acc, val) => acc.concat(val), []).filter(filterLang).map(lang => {
        return `${config.url}/${lang}/${category.path}`;
      }),
      permalink: category.permalink
    };
  });
  // console.log(categories);

  const res = template(config);
  for (const i in res) {
    res[i].data = res[i].data.render({
      config,
      posts,
      sNow: new Date(),
      tags: tagsCfg ? tags : [],
      categories: catsCfg ? categories : []
    });
  }
  return res;
};

function isMatch(path, patterns) {
  return micromatch.isMatch(path, patterns);
}
