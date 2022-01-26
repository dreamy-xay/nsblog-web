/*
 * @Description: 文章api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 21:24:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 14:19:08
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, verifyToken, getToken, RandomUser, randomUsers } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取文章
  app.get(baseUrl + '/articles', (req: Request, res: Response) => {
    const {
      username,
      limit,
      offset,
      release_time,
      browsing_count,
      tag,
      category,
      topic_name,
      tag_name,
      type
    } = req.query;
    if (username !== '' && !select('users').findOne({ username }))
      return res.status(410).json({ error: 'User name error' });

    print('get articles', {
      username,
      limit,
      offset,
      release_time,
      browsing_count,
      tag,
      category,
      topic_name,
      tag_name,
      type
    });

    const RUsers = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        let data: Record<string, unknown> = {};
        if (!username) {
          data = {
            username: user.username,
            nickname: user.nickname,
            topic: topic_name ? topic_name : Random.integer(0, 1) ? Random.word(2, 8) : Random.cword(2, 5),
            cover_image: Random.image(
              '150x150',
              '#234567',
              '#FFFFFF',
              'png',
              Random.integer(0, 1) ? Random.word(2, 8) : Random.cword(2, 5)
            ),
            recommend: Random.integer(0, 1)
          };
        }
        ans.push({
          username: user.username,
          nickname: user.nickname,
          id: Random.increment(Random.integer(1, 10)),
          title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50),
          content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          topic_tag: tag_name ? tag_name : Random.integer(0, 1) ? Random.word(2, 8) : Random.cword(2, 5),
          page_view: Random.integer(0, 300),
          comment_count: Random.integer(0, 200),
          recommend_count: Random.integer(0, 900),
          release_time: Random.datetime(),
          ...data
        });
      }
      return ans;
    }
    return res.json({ articles: getRandom(int(offset) >= 78 ? 0 : Math.min(int(limit), 78 - int(offset))) });
  });

  // 获取用户文章所有分类
  app.get(baseUrl + '/articles/categories', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get articles categories', { username });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          name: Random.integer(0, 1) ? Random.word() : Random.cword(),
          count: Random.integer(1, 100)
        });
      return ans;
    }

    return res.json({ categories: getRandom(Random.integer(0, 40)) });
  });

  // 获取用户文章所有分类
  app.get(baseUrl + '/articles/tags', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get articles tags', { username });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          name: Random.integer(0, 1) ? Random.word() : Random.cword(),
          count: Random.integer(1, 100)
        });
      return ans;
    }

    return res.json({ tags: getRandom(Random.integer(0, 40)) });
  });

  // 文章侧边栏菜单，获取详情（获取文章页面用户信息）
  app.get(baseUrl + '/articles/user', (req: Request, res: Response) => {
    const { username } = req.query;
    const user: Record<string, unknown> = select('users').findOne({ username });
    if (!user) return res.status(410).json({ error: 'User name error' });

    print('get articles usersInfo', { username });

    function getRandom(limit: number, isRecent: boolean = true): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        if (isRecent)
          ans.push({
            title: Random.integer(0, 1) ? Random.title() : Random.ctitle(),
            article_id: Random.increment(Random.integer(1, 10))
          });
        else
          ans.push({
            title: Random.integer(0, 1) ? Random.title() : Random.ctitle(),
            link: Random.url()
          });
      return ans;
    }

    const ans: Record<string, unknown> = {
      username: user.username,
      nickname: user.nickname,
      avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username as string),
      signature: (Random.integer(0, 1) ? Random.cparagraph(1, 1) : Random.paragraph(1, 1)).slice(0, 128),
      article_count: Random.integer(0, 100),
      category_count: Random.integer(0, 40),
      tag_count: Random.integer(0, 40),
      recent_article: getRandom(Random.integer(0, 10)),
      friend_chain: getRandom(Random.integer(0, 40), false)
    };

    return res.json(ans);
  });

  // 修改文章状态，推荐反对还是不操作（修改文章评价）
  app.put(baseUrl + '/articles/evaluation', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type, article_id } = req.body;

    print('modify article evaluation', { username, type, article_id });

    return res.status(200).send();
  });

  // 获取文章评论
  app.get(baseUrl + '/articles/comments', (req: Request, res: Response) => {
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';
    const { article_id, comment_id, limit, offset } = req.query;

    print('get articles comments', { username, article_id, comment_id, limit, offset });

    const RUsers = randomUsers(username);
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];

      function getComments(): Record<string, unknown> {
        let ans: Record<string, unknown> = {};
        if (!(article_id && comment_id)) {
          ans = { child_comments: [] };
          const sum = Random.integer(0, 5);
          for (let i: number = 0; i < sum; ++i) {
            const user: RandomUser = RUsers.random();
            const replyUser: RandomUser = RUsers.random();
            const params: Record<string, unknown> = username !== '' ? { evaluation: Random.integer(0, 2) } : {};
            (ans.child_comments as any).push({
              comment_id: Random.increment(Random.integer(1, 10)),
              username: user.username,
              nickname: user.nickname,
              avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
              time: Random.time(),
              reply_username: replyUser.username,
              reply_nickname: replyUser.nickname,
              content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
              support_count: Random.integer(0, 9999),
              oppose_count: Random.integer(0, 9999),
              ...params
            });
          }
        }
        return ans;
      }

      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        const params: Record<string, unknown> = username !== '' ? { evaluation: Random.integer(0, 2) } : {};
        ans.push({
          comment_id: Random.increment(Random.integer(1, 10)),
          username: user.username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
          time: Random.time(),
          content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          support_count: Random.integer(0, 9999),
          oppose_count: Random.integer(0, 9999),
          ...params,
          ...getComments()
        });
      }

      return ans;
    }

    return res.json({ comments: getRandom(int(offset) >= 25 ? 0 : Math.min(int(limit), 25 - int(offset))) });
  });

  // 发表文章评论
  app.post(baseUrl + '/articles/comments', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { article_id, content, parent_id, reply_username } = req.body;

    print('release articles comments', { username, article_id, content, parent_id, reply_username });

    return res.send();
  });

  // 修改文章评论状态，推荐反对还是不操作
  app.put(baseUrl + '/articles/comments/evaluation', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type, comment_id } = req.body;

    print('modify article comments evaluation', { username, type, comment_id });

    return res.status(200).send();
  });

  // 获取文章详情
  app.get(baseUrl + '/articles/:article_id(\\d+)', (req: Request, res: Response) => {
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    const { article_id } = req.params;

    print('get detail articles', { username, article_id });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          name: Random.integer(0, 1) ? Random.word() : Random.cword()
        });
      return ans;
    }

    const collection: Record<string, unknown> = Random.integer(0, 1)
      ? { collection: Random.increment(Random.integer(1, 10)) }
      : {};
    const params: Record<string, unknown> =
      username !== ''
        ? {
            evaluation: Random.integer(0, 2),
            attention: Random.integer(0, 1),
            ...collection
          }
        : {};

    const user: RandomUser = randomUsers().random();
    const ans: Record<string, unknown> = {
      article_id,
      title: Random.integer(0, 1) ? Random.title() : Random.ctitle(),
      username: user.username,
      nickname: user.nickname,
      avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
      release_time: Random.datetime(),
      page_view: Random.integer(0, 1000),
      comment_count: Random.integer(0, 1000),
      recommend_count: Random.integer(0, 1000),
      topic_tag: Random.integer(0, 1) ? Random.word() : Random.cword(),
      categories: getRandom(Random.integer(0, 2)),
      tags: getRandom(Random.integer(0, 3)),
      content: Random.integer(0, 3)
        ? templateArticles[Random.integer(0, templateArticles.length - 1)]
        : Random.integer(0, 1)
        ? Random.paragraph(3, 100)
        : Random.cparagraph(3, 100),
      blog_article_html: Random.integer(0, 1)
        ? ''
        : `
      <link rel="stylesheet" href="//at.alicdn.com/t/font_1346053_111ghkv8md9.css">
      <link rel="stylesheet" href="//at.alicdn.com/t/font_2250819_2hhizzrngl7.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css">
      <div class="test" style="display:none;"><span>asasas<div>inainsas</div></span></div>
      <script type="text/javascript" src="https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>

      <canvas class="fireworks" style="position: fixed; left: 0px; top: 0px; z-index: 99999999; pointer-events: none; width: 1536px; height: 722px;" width="3072" height="1444"></canvas>
      <script type="text/javascript" src="/article/tempJs/anime.min.js"></script>
      <script type="text/javascript" src="/article/tempJs/fireworks.js"></script>

      <!--live2d-->
      <script src="/article/tempJs/autoload.js"></script>
      <!--live2dend-->

      <script src="/article/tempJs/mouse.min.js"></script>
      <script type="text/javascript"> $.shuicheMouse({ type:11, color:"rgba(172,12,177,0.8)" }) </script>
      `,
      cover_image: [
        null,
        'https://s3.bmp.ovh/imgs/2021/09/fd25f71e808f3f23.jpg',
        'https://s3.bmp.ovh/imgs/2021/09/8bcf34ab186f752c.jpg',
        'https://s3.bmp.ovh/imgs/2021/09/040fbcab0802511e.jpg',
        'https://s3.bmp.ovh/imgs/2021/09/7fc65c1d3e881ea5.jpg'
      ][Random.integer(0, 4)],
      license: 'CC BY 4.0',
      sponsors: {
        paypal: Random.integer(0, 1) ? Random.image('150x150', '#234567', '#FFFFFF', 'png', 'paypal') : null,
        alipay: Random.integer(0, 2) ? 'https://s3.bmp.ovh/imgs/2021/10/c706c0cc3da4d493.jpg' : null,
        weixin: Random.integer(0, 2) ? 'https://s3.bmp.ovh/imgs/2021/10/2b9296f39cbbd91e.jpg' : null
      },
      ...params,
      last_article: {
        article_id: Random.increment(Random.integer(1, 10)),
        title: Random.integer(0, 1) ? Random.title() : Random.ctitle()
      },
      next_article: {
        article_id: Random.increment(Random.integer(1, 10)),
        title: Random.integer(0, 1) ? Random.title() : Random.ctitle()
      }
    };

    return res.json(ans);
  });

  // 获取博客文章
  app.get(baseUrl + '/articles/blog', (req: Request, res: Response) => {
    const { tag, category, page } = req.query;

    print('get blog articles list', { tag, category, page });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          id: 10000,
          title: '滑动窗口',
          content: 'hhhhhhhhhhh',
          cover_image: '',
          page_view: 100,
          comment_count: 200,
          username: 'dexteryu',
          nickname: 'dexteryu1',
          release_time: ''
        });
      return ans;
    }

    const data: Record<string, unknown> = {
      ...(tag || category ? { page_count: 12 } : {}),
      ...(tag ? { tag_name: Random.integer(0, 1) ? Random.word(3, 8) : Random.cword(2, 5) } : {}),
      ...(category ? { category_name: Random.integer(0, 1) ? Random.word(3, 8) : Random.cword(2, 5) } : {})
    };

    return res.json({
      articles: getRandom(int(page) === 12 ? Random.integer(1, 10) : 10),
      ...data
    });
  });
}

const templateArticles: string[] = [
  Random.integer(0, 1) ? Random.paragraph(3, 100) : Random.cparagraph(3, 100),
  `<input id="articleAuthor" type="hidden" value="阮一峰">
  <input id="articleSource" type="hidden" value="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html">
  <p>flex：CSS简写属性设置了弹性项目如何增大或缩小以适应其弹性容器中可用的空间。</p>

  <blockquote>
  <p>简写属性：是可以让你同时设置好几个 CSS 属性值的 CSS 属性。使用简写属性，Web 开发人员可以编写更简洁、更具可读性的样式表，节省时间和精力。</p>
  </blockquote>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_1.gif?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=wZLcyMXzbFpFN5DWV4j7%2FHmGWng%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_1.gif?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=wZLcyMXzbFpFN5DWV4j7%2FHmGWng%3D"></a></p>
  <p>布局的传统解决方案，基于盒状模型，依赖 <code>display</code>属性 + <code>position</code>属性 + <code>float</code>属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。</p>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_2.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=e6LIX5b6qdxS16RXpalneewbCq0%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_2.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=e6LIX5b6qdxS16RXpalneewbCq0%3D"></a></p>
  <p>2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。</p>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_3.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=SFMvMjfzhffdlTzWFyIttaIBr4A%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_3.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=SFMvMjfzhffdlTzWFyIttaIBr4A%3D"></a></p>
  <p>Flex 布局将成为未来布局的首选方案。本文介绍它的语法。</p>
  <p>以下内容主要参考了下面两篇文章：<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank">A Complete Guide to Flexbox</a> 和 <a href="https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties" target="_blank">A Visual Guide to CSS3 Flexbox Properties</a>。</p>
  <h2 id="flex-布局是什么？" tid="tid-pXNPkC">Flex 布局是什么？</h2>
  <p>Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。</p>
  <p>任何一个容器都可以指定为 Flex 布局。</p>
  <code-box id="code-aEdGBy"><button boxid="code-aEdGBy" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-aEdGBy pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-aEdGBy" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span>{
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">display</span>: flex;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p>行内元素也可以使用 Flex 布局。</p>
  <code-box id="code-iFzXB5"><button boxid="code-iFzXB5" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-iFzXB5 pre" aria-label="复制代码"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-iFzXB5" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span>{
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">display</span>: inline-flex;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p>Webkit 内核的浏览器，必须加上<code>-webkit</code>前缀。</p>
  <code-box id="code-i2WBrJ"><button boxid="code-i2WBrJ" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-i2WBrJ pre" aria-label="复制代码"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-i2WBrJ" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span>{
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">display</span>: -webkit-flex; <span class="hljs-comment">/* Safari */</span>
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">display</span>: flex;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p>注意，设为 Flex 布局以后，子元素的<code>float</code>、<code>clear</code>和<code>vertical-align</code>属性将失效。</p>
  <h2 id="基本概念" tid="tid-W6y8mK">基本概念</h2>
  <p>采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。</p>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_4.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=j8Jtp9MiqmtW2DslJZST%2B%2BC0FTU%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_4.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=j8Jtp9MiqmtW2DslJZST%2B%2BC0FTU%3D"></a></p>
  <p>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做<code>main start</code>，结束位置叫做<code>main end</code>；交叉轴的开始位置叫做<code>cross start</code>，结束位置叫做<code>cross end</code>。</p>
  <p>项目默认沿主轴排列。单个项目占据的主轴空间叫做<code>main size</code>，占据的交叉轴空间叫做<code>cross size</code>。</p>
  <h2 id="容器的属性" tid="tid-Q5cpJD">容器的属性</h2>
  <p>以下6个属性设置在容器上。</p>
  <ul>
  <li>flex-direction</li>
  <li>flex-wrap</li>
  <li>flex-flow</li>
  <li>justify-content</li>
  <li>align-items</li>
  <li>align-content</li>
  </ul>
  <h3 id="flex-direction属性" tid="tid-2hYKtE">flex-direction属性</h3>
  <p><code>flex-direction</code>属性决定主轴的方向（即项目的排列方向）。</p>
  <code-box id="code-HBaFN5"><button boxid="code-HBaFN5" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-HBaFN5 pre" aria-label="复制代码"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-HBaFN5" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">flex-direction</span>: row | row-reverse | column | column-reverse;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_5.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=f6xwqpaWzSkFUDpVdEFwfWIwsFY%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_5.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=f6xwqpaWzSkFUDpVdEFwfWIwsFY%3D"></a></p>
  <p>它可能有4个值。</p>
  <ul>
  <li><code>row</code>（默认值）：主轴为水平方向，起点在左端。</li>
  <li><code>row-reverse</code>：主轴为水平方向，起点在右端。</li>
  <li><code>column</code>：主轴为垂直方向，起点在上沿。</li>
  <li><code>column-reverse</code>：主轴为垂直方向，起点在下沿。</li>
  </ul>
  <h3 id="flex-wrap属性" tid="tid-4W38ja">flex-wrap属性</h3>
  <p>默认情况下，项目都排在一条线（又称"轴线"）上。<code>flex-wrap</code>属性定义，如果一条轴线排不下，如何换行。</p>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_6.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=C%2FCCUTY%2BnNnrWf6w%2B%2B9yEK39%2BDE%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_6.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=C%2FCCUTY%2BnNnrWf6w%2B%2B9yEK39%2BDE%3D"></a></p>
  <code-box id="code-BmMHnr"><button boxid="code-BmMHnr" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-BmMHnr pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-BmMHnr" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span>{
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">flex-wrap</span>: nowrap | wrap | wrap-reverse;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p>它可能取三个值。</p>
  <p>（1）<code>nowrap</code>（默认）：不换行。</p>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_7.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=4dtYtWx2o3NMLWMh4FPOjU0PodA%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_7.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=4dtYtWx2o3NMLWMh4FPOjU0PodA%3D"></a></p>
  <p>（2）<code>wrap</code>：换行，第一行在上方。</p>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_8.jpeg?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=Wn4i62uhWS9oKmDnm98isEy8cOY%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_8.jpeg?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=Wn4i62uhWS9oKmDnm98isEy8cOY%3D"></a></p>
  <p>（3）<code>wrap-reverse</code>：换行，第一行在下方。</p>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_9.jpeg?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=dTOCtwX%2F1Ded0X5r3DkpVXJ00VQ%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_9.jpeg?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=dTOCtwX%2F1Ded0X5r3DkpVXJ00VQ%3D"></a></p>
  <h3 id="flex-flow" tid="tid-Dfa2PR">flex-flow</h3>
  <p><code>flex-flow</code>属性是<code>flex-direction</code>属性和<code>flex-wrap</code>属性的简写形式，默认值为<code>row nowrap</code>。</p>
  <code-box id="code-BNjahc"><button boxid="code-BNjahc" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-BNjahc pre" aria-label="复制代码"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-BNjahc" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">flex-flow</span>: &lt;flex-direction&gt; || &lt;flex-wrap&gt;;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <h3 id="justify-content属性" tid="tid-cCw3dD">justify-content属性</h3>
  <p><code>justify-content</code>属性定义了项目在主轴上的对齐方式。</p>
  <code-box id="code-YXtiPi"><button boxid="code-YXtiPi" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-YXtiPi pre" aria-label="复制代码"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-YXtiPi" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">justify-content</span>: flex-start | flex-end | center | space-between | space-around;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_10.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=EyMpSZN4vOU9BNgvffYGYzZMnNw%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_10.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=EyMpSZN4vOU9BNgvffYGYzZMnNw%3D"></a></p>
  <p>它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。</p>
  <ul>
  <li><code>flex-start</code>（默认值）：左对齐</li>
  <li><code>flex-end</code>：右对齐</li>
  <li><code>center</code>： 居中</li>
  <li><code>space-between</code>：两端对齐，项目之间的间隔都相等。</li>
  <li><code>space-around</code>：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。</li>
  </ul>
  <h3 id="align-items属性" tid="tid-Srh6nc">align-items属性</h3>
  <p><code>align-items</code>属性定义项目在交叉轴上如何对齐。</p>
  <code-box id="code-2PS5kR"><button boxid="code-2PS5kR" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-2PS5kR pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-2PS5kR" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">align-items</span>: flex-start | flex-end | center | baseline | stretch;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_11.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=rcUOwOzdRwoW7pR%2FbI1Qab8RrS4%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_11.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=rcUOwOzdRwoW7pR%2FbI1Qab8RrS4%3D"></a></p>
  <p>它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。</p>
  <ul>
  <li><code>flex-start</code>：交叉轴的起点对齐。</li>
  <li><code>flex-end</code>：交叉轴的终点对齐。</li>
  <li><code>center</code>：交叉轴的中点对齐。</li>
  <li><code>baseline</code>: 项目的第一行文字的基线对齐。</li>
  <li><code>stretch</code>（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。</li>
  </ul>
  <h3 id="align-content属性" tid="tid-Sfmtkd">align-content属性</h3>
  <p><code>align-content</code>属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</p>
  <code-box id="code-HGHSRc"><button boxid="code-HGHSRc" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-HGHSRc pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-HGHSRc" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.box</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">align-content</span>: flex-start | flex-end | center | space-between | space-around | stretch;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_12.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=hwM%2F2LssJWxmjnZNxnnazvxirZQ%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_12.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=hwM%2F2LssJWxmjnZNxnnazvxirZQ%3D"></a></p>
  <p>该属性可能取6个值。</p>
  <ul>
  <li><code>flex-start</code>：与交叉轴的起点对齐。</li>
  <li><code>flex-end</code>：与交叉轴的终点对齐。</li>
  <li><code>center</code>：与交叉轴的中点对齐。</li>
  <li><code>space-between</code>：与交叉轴两端对齐，轴线之间的间隔平均分布。</li>
  <li><code>space-around</code>：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。</li>
  <li><code>stretch</code>（默认值）：轴线占满整个交叉轴。</li>
  </ul>
  <h2 id="项目的属性" tid="tid-d7NCEA">项目的属性</h2>
  <p>以下6个属性设置在项目上。</p>
  <ul>
  <li><code>order</code></li>
  <li><code>flex-grow</code></li>
  <li><code>flex-shrink</code></li>
  <li><code>flex-basis</code></li>
  <li><code>flex</code></li>
  <li><code>align-self</code></li>
  </ul>
  <h3 id="order属性" tid="tid-WwJzbN">order属性</h3>
  <p><code>order</code>属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。</p>
  <code-box id="code-H3n7Tz"><button boxid="code-H3n7Tz" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-H3n7Tz pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-H3n7Tz" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.item</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">order</span>: &lt;integer&gt;;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_13.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=7YbEGi%2FkGI%2BWumxB0UbR0YOJA6c%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_13.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=7YbEGi%2FkGI%2BWumxB0UbR0YOJA6c%3D"></a></p>
  <h3 id="flex-grow属性" tid="tid-D6GSt3">flex-grow属性</h3>
  <p><code>flex-grow</code>属性定义项目的放大比例，默认为<code>0</code>，即如果存在剩余空间，也不放大。</p>
  <code-box id="code-x63z77"><button boxid="code-x63z77" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-x63z77 pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-x63z77" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.item</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">flex-grow</span>: &lt;number&gt;; <span class="hljs-comment">/* default 0 */</span>
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_14.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=Aa86zgdVhxNcaO%2FazTxdMDjDHTU%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_14.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=Aa86zgdVhxNcaO%2FazTxdMDjDHTU%3D"></a></p>
  <p>如果所有项目的<code>flex-grow</code>属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的<code>flex-grow</code>属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。</p>
  <h3 id="flex-shrink属性" tid="tid-Fwhry6">flex-shrink属性</h3>
  <p><code>flex-shrink</code>属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。</p>
  <code-box id="code-M3h6Ad"><button boxid="code-M3h6Ad" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-M3h6Ad pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-M3h6Ad" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.item</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">flex-shrink</span>: &lt;number&gt;; <span class="hljs-comment">/* default 1 */</span>
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_15.jpeg?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=Kv%2Fb%2Bozp1IRJMSjtP6rzyIsuf5g%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_15.jpeg?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=Kv%2Fb%2Bozp1IRJMSjtP6rzyIsuf5g%3D"></a></p>
  <p>如果所有项目的<code>flex-shrink</code>属性都为1，当空间不足时，都将等比例缩小。如果一个项目的<code>flex-shrink</code>属性为0，其他项目都为1，则空间不足时，前者不缩小。</p>
  <p>负值对该属性无效。</p>
  <h3 id="flex-basis属性" tid="tid-mNQe86">flex-basis属性</h3>
  <p><code>flex-basis</code>属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为<code>auto</code>，即项目的本来大小。</p>
  <code-box id="code-RFaDxd"><button boxid="code-RFaDxd" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-RFaDxd pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-RFaDxd" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.item</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">flex-basis</span>: &lt;length&gt; | auto; <span class="hljs-comment">/* default auto */</span>
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p>它可以设为跟<code>width</code>或<code>height</code>属性一样的值（比如350px），则项目将占据固定空间。</p>
  <h3 id="flex属性" tid="tid-K45R5N">flex属性</h3>
  <p><code>flex</code>属性是<code>flex-grow</code>, <code>flex-shrink</code> 和 <code>flex-basis</code>的简写，默认值为<code>0 1 auto</code>。后两个属性可选。</p>
  <code-box id="code-DWK4NC"><button boxid="code-DWK4NC" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-DWK4NC pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-DWK4NC" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.item</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">flex</span>: none | [ &lt;<span class="hljs-string">'flex-grow'</span>&gt; &lt;<span class="hljs-string">'flex-shrink'</span>&gt;? || &lt;<span class="hljs-string">'flex-basis'</span>&gt; ]
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p>该属性有两个快捷值：<code>auto</code> (<code>1 1 auto</code>) 和 none (<code>0 0 auto</code>)。</p>
  <p>建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。</p>
  <h3 id="align-self属性" tid="tid-SjYJez">align-self属性</h3>
  <p><code>align-self</code>属性允许单个项目有与其他项目不一样的对齐方式，可覆盖<code>align-items</code>属性。默认值为<code>auto</code>，表示继承父元素的<code>align-items</code>属性，如果没有父元素，则等同于<code>stretch</code>。</p>
  <code-box id="code-QHiMCN"><button boxid="code-QHiMCN" type="button" class="clipboard code-copay-btn hljs-comment" data-clipboard-action="copy" data-clipboard-target="#code-QHiMCN pre" aria-label="复制代码" style="opacity: 0; visibility: hidden;"><i class="iconfont icon-fuzhi1"></i></button><div class="code-tools" style="background: none 0% 0% / auto repeat scroll padding-box border-box rgb(40, 44, 52);"><hljs-len class="code-hljs-len" style="visibility: visible;">css</hljs-len></div><pre boxid="code-QHiMCN" class="language-css hljs code-pre-line"><code-line class="line-numbers-rows"></code-line><span class="hljs-selector-class">.item</span> {
  <code-line class="line-numbers-rows"></code-line>  <span class="hljs-attribute">align-self</span>: auto | flex-start | flex-end | center | baseline | stretch;
  <code-line class="line-numbers-rows"></code-line>}</pre></code-box>
  <p><a data-fancybox="gallery" href="https://oss.dbnuo.com/blog/e2kwri/e2kwri_16.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=45nqQr156%2BODMJZsmABrNBlQPiI%3D"><img src="https://oss.dbnuo.com/blog/e2kwri/e2kwri_16.png?x-oss-process=style%2Fwatermark&amp;OSSAccessKeyId=LTAI4FvHT1Wq22WAuxrPqgf5&amp;Expires=1632570987&amp;Signature=45nqQr156%2BODMJZsmABrNBlQPiI%3D"></a></p>
  <p>该属性可能取6个值，除了auto，其他都与align-items属性完全一致。</p>`,
  `<h2 tid="tid-WTc28Y" id="tid-WTc28Y">前言</h2>
  <ul>
  <li>这其实是将自己写的文章进行一个总结分类，并不代表最佳学习路线</li>
  <li>会不断更新这篇文章...没链接的文章正在编写ing...会不会哪天我的这个目录就出现在培训机构的目录上了...</li>
  <li>目前实战比较少（要是有多点实战，我就开培训了哈哈哈）</li>
  <li>再次强调！没有写的内容不代表不用学哈！这里只是将自己写的进行一个归类！</li>
  </ul>
  <p>&nbsp;</p>
  <h2 tid="tid-jRhxDj" id="tid-jRhxDj">Python</h2>
  <h3 tid="tid-7tcAbi" id="tid-7tcAbi">基础</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15027296.html" target="_blank">Python - 头部解析</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15027695.html" target="_blank">Python - 导入的位置</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15027893.html" target="_blank">Python - 执行顺序、执行入口</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15042257.html" target="_blank">Python - 变量</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12525020.html" target="_blank">Python - 变量的作用域&nbsp;</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12507104.html" target="_blank">Python - 常用内置变量</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15084527.html" target="_blank">Python - 算术运算符</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12541525.html" target="_blank">Python - //和/的区别</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15083012.html" target="_blank">Python - 赋值运算符</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-hxmb6R" id="tid-hxmb6R">数据类型相关</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15024184.html" target="_blank">Python - 基础数据类型 Number 数字、bool 布尔、complex 复数</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15027131.html" target="_blank">Python - 基础数据类型 str 字符串</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12523095.html" target="_blank">Python - 字符串常用函数详解</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12443158.html" target="_blank">Python - 字符串格式化详解（%、format）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12444579.html" target="_blank">Python - r'', b'', u'', f'' 的含义</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12341746.html" target="_blank">Python - bytes与字符串的相互转化</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12207464.html" target="_blank">Python - 判断一个字符串是否包含某个指定的字符串</a></p>
  <p>Python - 字符串 encode</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15042130.html" target="_blank">Python - 基础数据类型 list 列表</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15063686.html" target="_blank">Python - 如何将 list 列表作为数据结构使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15058981.html" target="_blank">Python - list 列表常见方法</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15068366.html" target="_blank">Python - 基础数据类型 tuple 元组</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15073168.html" target="_blank">Python - 可变和不可变对象</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15083781.html" target="_blank">Python - 基础数据类型 dict 字典</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15084302.html" target="_blank">Python - dict 字典的多种遍历方式</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15084264.html" target="_blank">Python - dict 字典常见方法</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15083079.html" target="_blank">Python - 基础数据类型 set 集合</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15084277.html" target="_blank">Python - 对象赋值、浅拷贝、深拷贝的区别</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15086511.html" target="_blank">Python - 浅拷贝的四种实现方式</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-bSSCjE" id="tid-bSSCjE">循环相关</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15086994.html" target="_blank">Python - 详解 range()</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15087053.html" target="_blank">Python - for 循环</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15087130.html" target="_blank">Python - if 条件控制</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15087250.html" target="_blank">Python - while 循环</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15087598.html" target="_blank">Python - break、continue 的使用</a>&nbsp;</p>
  <p>&nbsp;</p>
  <h3 tid="tid-RTGeHa" id="tid-RTGeHa">函数相关</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15092393.html" target="_blank">Python - 函数<br></a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12526592.html" target="_blank">Python - 函数形参之必填参数、默认参数、可变参数、关键字参数的详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12520959.html" target="_blank">Python - 基本数据处理函数round()、int()、floor()、ceil()</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15096333.html" target="_blank">Python - 解包的各种骚操作</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15106522.html" target="_blank">Python - 3.8 新特性之仅位置参数 &amp; 仅关键字参数</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15110297.html" target="_blank">Python - 函数实战</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15111410.html" target="_blank">Python - lambda 表达式</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15253032.html" target="_blank">Python - repr()、str() 的区别</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15252330.html" target="_blank">Python - eval()</a></p>
  <p>Python - bytes()</p>
  <p>&nbsp;</p>
  <h3 tid="tid-CXpiFh" id="tid-CXpiFh">面向对象编程</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15178423.html" target="_blank">Python - 面向对象编程 - 什么是对象和类</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15178456.html" target="_blank">Python - 面向对象编程 - 什么是 Python 类、类对象、实例对象</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15189562.html" target="_blank">Python - 面向对象编程 - __init__() 构造方法</a></p>
  <p><a class="link-post-title" href="https://www.cnblogs.com/poloyy/p/15192098.html" target="_blank">Python - 面向对象编程 - __del__() 析构方法</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15190295.html" target="_blank">Python - 面向对象编程 - self 参数</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15201585.html" target="_blank">Python - 面向对象编程 - 小实战（1）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15178468.html" target="_blank">Python - 面向对象编程 - 类变量、实例变量/类属性、实例属性</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15195539.html" target="_blank">Python - 面向对象编程 - 实例方法、静态方法、类方法</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15202541.html" target="_blank">Python - 面向对象编程 - __str__()</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15250973.html" target="_blank">Python - 面向对象编程 - __repr__()</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15203106.html" target="_blank">Python - 面向对象编程 - 公共属性、保护属性、私有属性</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15203973.html" target="_blank">Python - 面向对象编程 - 小实战（2）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15204079.html" target="_blank">Python - 面向对象编程 - 小实战（3）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15203989.html" target="_blank">Python - 面向对象编程 - 三大特性之封装</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15202761.html" target="_blank">Python - 面向对象编程 - @property</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15208484.html" target="_blank">Python - 面向对象编程 - 实战（4）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15216652.html" target="_blank">Python - 面向对象编程 - 三大特性之继承</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15221352.html" target="_blank">Python - 面向对象编程 - 子类方法的重写</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15226425.html" target="_blank">Python - 面向对象编程 - 新式类和旧式类</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15224912.html" target="_blank">Python - 面向对象编程 - 多继承</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15223443.html" target="_blank">Python - 面向对象编程 - super()</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15236135.html" target="_blank">Python - 面向对象编程 - 使用 super() 的一些注意事项</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15226424.html" target="_blank">Python - 面向对象编程 - MRO 方法搜索顺序</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15230167.html" target="_blank">Python - 面向对象编程 - 三大特性之多态</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15236113.html" target="_blank">Python - 面向对象编程 - 实战（5）</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15253366.html" target="_blank">Python - 面向对象编程 - __call__()</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15236309.html" target="_blank">Python - 面向对象编程 - __new__() 和单例模式&nbsp;</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15245172.html" target="_blank">Python - 面向对象编程 - 魔术方法（双下划线方法）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15202304.html" target="_blank">Python - 面向对象编程 - 实战（6）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12489834.html" target="_blank">Python - 模块与包</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12559757.html" target="_blank">Python - 错误和异常</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-PHZwRn" id="tid-PHZwRn">文件相关</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/12350158.html" target="_blank">Python - with open()、os.open()、open()的详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12350736.html" target="_blank">Python - 文件读取read()、readline()、readlines()区别</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12349230.html" target="_blank">Python - os.walk()详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12353716.html" target="_blank">Python - 文件模式a+读取不了文件</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14772003.html" target="_blank">Python - 批量修改文件名</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-5nGkRm" id="tid-5nGkRm">高级点的</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/14565951.html" target="_blank">Python - 多线程、多进程</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14635278.html" target="_blank">Python 高级特性（1）- 切片</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14658433.html" target="_blank">Python 高级特性（2）- 可迭代对象 iterable</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14659472.html" target="_blank">Python 高级特性（3）- 列表生成式</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14664538.html" target="_blank">Python 高级特性（4）- 生成器 generator</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14667150.html" target="_blank">Python 高级特性（5）- 迭代器 Iterator</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-zQYXsh" id="tid-zQYXsh">typing、类型提示</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15145380.html" target="_blank">Python -类型提示 Type Hints</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15150315.html" target="_blank">Python - typing 模块 —— 常用类型提示</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15153883.html" target="_blank">Python - typing 模块 —— 类型别名</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15153886.html" target="_blank">Python - typing 模块 —— NewType</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15154008.html" target="_blank">Python - typing 模块 —— Callable</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15158613.html" target="_blank">Python - typing 模块 —— Any Type</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15154196.html" target="_blank">Python - typing 模块 —— TypeVar 泛型</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15170066.html" target="_blank">Python - typing 模块 —— Union</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15170297.html" target="_blank">Python - typing 模块 —— Optional</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-QkWWpB" id="tid-QkWWpB">Pydantic</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15158713.html" target="_blank">Python - pydantic 入门介绍与 Models 的简单使用</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-aKF8a4" id="tid-aKF8a4">新奇的 Python 库</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/14845553.html" target="_blank">Python - random 库的详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12324024.html" target="_blank">Python - logging 日志库</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12435628.html" target="_blank">Python - 超好用的第三方库pathlib，快速获取项目中各种路径</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12435089.html" target="_blank">Python - loguru日志库，高效输出控制台日志和日志记录</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12482510.html" target="_blank">Python - 通过PyYaml库操作YAML文件</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12168322.html" target="_blank">Python - 常⽤的操作 excel 第三方库</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12341231.html" target="_blank">Python - os库</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12641547.html" target="_blank">Python - 执行cmd命令</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14667253.html" target="_blank">Python - 进度条库 tqdm</a></p>
  <p>&nbsp;</p>
  <h4 tid="tid-MyeQPX" id="tid-MyeQPX">常见问题解决方案</h4>
  <p><a href="https://www.cnblogs.com/poloyy/p/12798145.html" target="_blank">Python常见问题 - 使用openpyxl模块时出现错误： zipfile.BadZipFile: File is not a zip file</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12798205.html" target="_blank">Python常见问题 - 写入数据到 excel 报 ValueError: invalid literal for int() with base 10 错误</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-jZMyFt" id="tid-jZMyFt">做项目可能会用到的</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/13953232.html" target="_blank">Python - 生成 requirement.txt 文件</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15170968.html" target="_blank">Python - pip 常用命令</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15172181.html" target="_blank">Python - pipupgrade 库</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15172198.html" target="_blank">Python - pip-review 库</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/15170969.html" target="_blank">Python - pip 批量更新</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-SsDhwt" id="tid-SsDhwt">数据库相关</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/15130758.html" target="_blank">Python - 操作 MySQL 数据库</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-XZXXyt" id="tid-XZXXyt">新人写的不着调工具类</h3>
  <p>仅做记录，不值得参考</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12208346.html" target="_blank">Python工具类（一）—— 操作Mysql数据库</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12208446.html" target="_blank">Python工具类（二）—— 操作时间相关</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-Ydp2QX" id="tid-Ydp2QX">很low的基础习题集</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539215.html" target="_blank">Python习题集（一）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539345.html" target="_blank">Python习题集（二）</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539469.html" target="_blank">Python习题集（三）</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539685.html" target="_blank">Python习题集（四）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539709.html" target="_blank">Python习题集（五）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539786.html" target="_blank">Python习题集（六）</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539848.html" target="_blank">Python习题集（七）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539891.html" target="_blank">Python习题集（八）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12539973.html" target="_blank">Python习题集（九）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12540017.html" target="_blank">Python习题集（十）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12540076.html" target="_blank">Python习题集（十一）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12540328.html" target="_blank">Python习题集（十二）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12541674.html" target="_blank">Python习题集（十三）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12542181.html" target="_blank">Python习题集（十四）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12542452.html" target="_blank">Python习题集（十五）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12542872.html" target="_blank">Python习题集（十六）</a></p>
  <p>&nbsp;</p>
  <h2 tid="tid-ekFAjG" id="tid-ekFAjG">接口自动化</h2>
  <p><a href="https://www.cnblogs.com/poloyy/p/12244936.html" target="_blank">python接口自动化测试 - configparser配置文件解析器详细使用</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12241448.html" target="_blank">python接口自动化测试 - openpyxl封装类</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12239344.html" target="_blank">python接口自动化测试 - openpyxl基本使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12234455.html" target="_blank">python接口自动化测试 - unittest框架基本使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12235652.html" target="_blank">python接口自动化测试 - unittest框架suite、runner详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12233507.html" target="_blank">python接口自动化测试 - mock模块基本使用介绍</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12232585.html" target="_blank">python接口自动化测试 - requests库的post请求进行文件下载</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12232541.html" target="_blank">python接口自动化测试 - requests库的post请求进行文件上传</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12232376.html" target="_blank">python接口自动化测试 - requests库的基础使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12274265.html" target="_blank">python接口自动化测试 - 数据驱动DDT模块的简单使用</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-ewYerN" id="tid-ewYerN">常见问题解决方案</h3>
  <p><a href="https://www.cnblogs.com/poloyy/p/12268671.html" target="_blank">Python常见问题 - python3 requests库提示警告InsecureRequestWarning的问题</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12268701.html" target="_blank">Python常见问题 - python3 使用requests发送HTTPS请求报certificate verify failed 错误</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12459240.html" target="_blank">Python常见问题 - requests请求参数包含中文报错：UnicodeEncodeError: 'latin-1' codec can't encode characters in position 13-14:&nbsp; is not valid Latin-1. Use body.encode('utf-8')</a></p>
  <p>&nbsp;</p>
  <h2 tid="tid-TFRz5k" id="tid-TFRz5k">Pytest+Allure</h2>
  <p><a href="https://www.cnblogs.com/poloyy/p/12641505.html" target="_blank">Pytest系列（1） - 快速入门和基础讲解</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12641778.html" target="_blank">Pytest系列（2） - assert断言详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12641991.html" target="_blank">Pytest系列（3） - setup和teardown的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12642602.html" target="_blank">Pytest系列（4） - fixture的详细使用</a>&nbsp;</p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12653187.html" target="_blank">Pytest系列（5） - 测试用例执行后的几种状态</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12663601.html" target="_blank">Pytest系列（6） - conftest.py的详细讲解</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12666682.html" target="_blank">Pytest系列（7） - skip、skipif跳过用例</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12669068.html" target="_blank">Pytest系列（8） - 使用自定义标记mark</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12675457.html" target="_blank">Pytest系列（9） - 参数化@pytest.mark.parametrize</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12685948.html" target="_blank">Pytest系列（10） - fixture 传参数 request的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12687308.html" target="_blank">Pytest系列（11）- 失败重跑插件pytest-rerunfailures的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12688606.html" target="_blank">Pytest系列（12）- 测试结果生成HTML报告插件之pytest-html的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12691240.html" target="_blank">Pytest系列（13）- 重复执行用例插件之pytest-repeat的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12702294.html" target="_blank">Pytest系列（14）- 配置文件pytest.ini的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12704658.html" target="_blank">Pytest系列（15）- 多重校验插件之pytest-assume的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12694861.html" target="_blank">Pytest系列（16）- 分布式测试插件之pytest-xdist的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12703290.html" target="_blank">Pytest系列（17）- pytest-xdist分布式测试的原理和流程</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12712616.html" target="_blank">Pytest系列（18）- 超美测试报告插件之allure-pytest的基础使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12715212.html" target="_blank">Pytest系列（19）- 我们需要掌握的allure特性</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12716659.html" target="_blank">Pytest系列（20）- allure的特性，@allure.step()、allure.attach的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12726657.html" target="_blank">Pytest系列（21）- allure的特性，@allure.description()、@allure.title()的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12726946.html" target="_blank">Pytest系列（22）- allure的特性，@allure.link()、@allure.issue()、@allure.testcase()的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12725509.html" target="_blank">Pytest系列（23）- allure 打标记之 @allure.epic()、@allure.feature()、@allure.story() 的详细使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/13886651.html" target="_blank">Pytest系列（24）- allure 环境准备</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/13889635.html" target="_blank">Pytest系列（25）- @allure.severity 标记用例级别</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/13890086.html" target="_blank">Pytest系列（26）- 清空 allure 历史报告记录</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/13890986.html" target="_blank">Pytest系列（27）- allure 命令行参数</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/13891265.html" target="_blank">Pytest系列（28）- 参数化 parametrize + @allure.title() 动态生成标题</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/13894043.html" target="_blank">Pytest系列（29）- 详解 allure.dynamic 动态生成功能</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14134566.html" target="_blank">Pytest 面试宝典</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-SQaDPb" id="tid-SQaDPb">实战小项目</h3>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/13918275.html" target="_blank">Docker + Jenkins + Gitlab + Pytest + Allure 接口自动化测试之持续集成实战终极教程</a></p>
  <p>&nbsp;</p>
  <h2 tid="tid-N56Ymb" id="tid-N56Ymb">UI 自动化</h2>
  <p><a href="https://www.cnblogs.com/poloyy/p/12574439.html" target="_blank">Selenium系列（二） - 详细解读针对浏览器的操作</a><a href="https://www.cnblogs.com/poloyy/p/12568983.html" target="_blank">Selenium系列（一） - 详细解读8种元素定位方式</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12580691.html" target="_blank">Selenium系列（三） - 详细解读针对元素常见的简单操作</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12584192.html" target="_blank">Selenium系列（四） - 详细解读鼠标操作</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12586940.html" target="_blank">Selenium系列（五） - 详细解读键盘操作</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12587729.html" target="_blank">Selenium系列（六） - 详细解读强制等待、隐式等待、显式等待的区别和源码解读</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12592549.html" target="_blank">Selenium系列（七） - 切换iframe</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12592745.html" target="_blank">Selenium系列（八） - 截取完整页面和截取指定元素并保存为图片</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12600700.html" target="_blank">Selenium系列（九） - 针对alert窗口的处理（警告框、确认框、对话框）和源码解读</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12601101.html" target="_blank">Selenium系列（十） - 针对Select下拉框的操作和源码解读</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12607930.html" target="_blank">Selenium系列（十一） - 针对两种上传文件方式的实现方案</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12629662.html" target="_blank">Selenium系列（十二） - 自动化必备知识之CSS选择器的详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12626196.html" target="_blank">Selenium系列（十三） - 自动化必备知识之Xpath的详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12630752.html" target="_blank">Selenium系列（十四） - Web UI 自动化基础实战（1）</a>&nbsp;</p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12631620.html" target="_blank">Selenium系列（十五） - Web UI 自动化基础实战（2）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12631987.html" target="_blank">Selenium系列（十六） - Web UI 自动化基础实战（3）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12632106.html" target="_blank">Selenium系列（十七） - Web UI 自动化基础实战（4）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12632138.html" target="_blank">Selenium系列（十八） - Web UI 自动化基础实战（5）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12632293.html" target="_blank">Selenium系列（十九） - Web UI 自动化基础实战（6）</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12633726.html" target="_blank">Selenium系列（二十） - PageObject模式的详细介绍</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12640783.html" target="_blank">Selenium系列（21） - Cookie操作和源码解读</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12704956.html" target="_blank">Selenium系列（22） - 通过selenium控制浏览器滚动条的几种方式</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12769425.html" target="_blank">Selenium常见报错问题（1）- 先来认识下selenium常见异常类</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12772046.html" target="_blank">Selenium常见报错问题（2）- 解决和分析StaleElementReferenceException异常</a></p>
  <p><a class="link-post-title" href="https://www.cnblogs.com/poloyy/p/12772372.html" target="_blank">Selenium常见报错问题（3）- 解决和分析NoSuchElementException</a></p>
  <p><a class="link-post-title" href="https://www.cnblogs.com/poloyy/p/14119967.html" target="_blank">Selenium 面试宝典</a></p>
  <p>&nbsp;</p>
  <h2 tid="tid-XA5EPY" id="tid-XA5EPY">APP 自动化</h2>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12678930.html" target="_blank">Appium自动化（1） - 环境准备详细教程</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12679327.html" target="_blank">Appium自动化（2） - appium环境安装常见问题的解决方案</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12679388.html" target="_blank">Appium自动化（3） - adb无线连接手机的方法</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12916569.html" target="_blank">Appium自动化（4） - Appium Desired Capabilities 参数详解</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12917489.html" target="_blank">Appium自动化（5） - 如何获取android app 的Activity 和 Package</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12917853.html" target="_blank">Appium自动化（6） - 控件定位工具之uiautomatorviewer 的详细介绍</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12918402.html" target="_blank">Appium自动化（7） - 控件定位工具之Appium 的 Inspector</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12919102.html" target="_blank">Appium自动化（8） - 可定位的控件属性</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12922423.html" target="_blank">Appium自动化（9） - appium元素定位的快速入门</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12923504.html" target="_blank">Appium自动化（10） - appium高级元素定位方式之 UI Automator API 的详解</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12925170.html" target="_blank">Appium自动化（11） - 详解 Applications 类里的方法和源码解析</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12928936.html" target="_blank">Appium自动化（12） - 详解 HardwareActions 类里的方法和源码分析</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12930227.html" target="_blank">Appium自动化（13） - 详解 Keyboard 类里的方法和源码分析</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12924980.html" target="_blank">Appium自动化（14） - 详解 ActionHelpers 类里的方法和源码分析</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12933345.html" target="_blank">Appium自动化（15） - 针对 webview 进行自动化测试</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12933486.html" target="_blank">Appium自动化（16） - 使用手机浏览器进行自动化测试</a></p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <h3 tid="tid-fCsnpB" id="tid-fCsnpB"><span style="font-size: 1em">常见问题解决方案</span></h3>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12670482.html" target="_blank">Appium问题解决方案（1）- 设置unicodeKeyboard: True运行脚本后，手机输入时无法调出软键盘</a>&nbsp;</p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12915833.html" target="_blank">Appium问题解决方案（3）- java.lang.IllegalStateException: UiAutomation not connected!</a>&nbsp;</p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12915745.html" target="_blank">Appium问题解决方案（2）- AttributeError：module 'appium.webdriver' has no attribute 'Remote'</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12917685.html" target="_blank">Appium问题解决方案（4）- Error while obtaining UI hierarchy XML file: com.android.ddmlib.SyncException</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12922261.html" target="_blank">Appium问题解决方案（5）- selenium.common.exceptions.InvalidSelectorException: Message: Locator Strategy 'name' is not supported for this session</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12922516.html" target="_blank">Appium问题解决方案（6）- Java堆栈错误：java.lag.ClassNotFoundException:org.eclipse.swt.widets.Control</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12922582.html" target="_blank">Appium问题解决方案（7）- Could not find 'adb.exe' in PATH. Please set the ANDROID_HOME environment variable with the Android SDK root directory path</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12922605.html" target="_blank">Appium问题解决方案（8）- selenium.common.exceptions.WebDriverException: Message: An unknown server-side error occurred while processing the command. Original error: Could not sign with default certificate.</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12922651.html" target="_blank">Appium问题解决方案（9）- Original error: Failed to launch Appium Settings app: Condition unmet after 5090 ms</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/12924315.html" target="_blank">Appium问题解决方案（10）- Original error: Swipe did not complete successfully</a>&nbsp;</p>
  <p>&nbsp;</p>
  <h2 tid="tid-Jps4pZ" id="tid-Jps4pZ">RobotFramework</h2>
  <p><a href="https://www.cnblogs.com/poloyy/p/12937432.html" target="_blank">Robot Framework（1）- 入门介绍</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12937736.html" target="_blank">Robot Framework（2）- 快速安装</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12938321.html" target="_blank">Robot Framework（3）- 基本概念</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12938778.html" target="_blank">Robot Framework（4）- 测试套件的基本使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12941894.html" target="_blank">Robot Framework（5）- 使用测试库</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12956270.html" target="_blank">Robot Framework（6）- BuiltIn 测试库常用的关键字列表</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12956846.html" target="_blank">Robot Framework（7）- DateTime 测试库常用的关键字列表</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12956986.html" target="_blank">Robot Framework（8）- Collections 测试库常用的关键字列表</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12973521.html" target="_blank">Robot Framework（9）- 使用变量文件</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12974508.html" target="_blank">Robot Framework（10）- 使用资源文件</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12975028.html" target="_blank">Robot Framework（11）- 用户关键字的详解</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12939615.html" target="_blank">Robot Framework（12）- 详细解读 RF 的变量和常量</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12980292.html" target="_blank">Robot Framework（13）- RF 循环的详细使用</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12988270.html" target="_blank">Robot Framework（14）- Variables 表的详细使用和具体例子</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/12989402.html" target="_blank">Robot Framework（15）- 扩展关键字</a></p>
  <p><a href="https://www.cnblogs.com/poloyy/p/14308967.html" target="_blank">Robot Framework 面试题</a></p>
  <p>&nbsp;</p>
  <h2 tid="tid-CGFasW" id="tid-CGFasW">Flask</h2>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14992854.html" target="_blank">Flask（1）- 简介</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14993523.html" target="_blank">Flask（2）- 第一个 Flask Application</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14994139.html" target="_blank">Flask（3）- Flask 中的 HTTP 方法</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14994380.html" target="_blank">Flask（4）- URL 组成部分详解</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14994738.html" target="_blank">Flask（5）- 动态路由</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14995087.html" target="_blank">Flask（6）- debug 模式</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14995215.html" target="_blank">Flask（7）- request 对象</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14999797.html" target="_blank">Flask（8）- jinja2 模板入门</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/15004389.html" target="_blank">Flask（9）- 蓝图的基本使用</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/15008909.html" target="_blank">Flask（10）- 标准类视图</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/15017202.html" target="_blank">Flask（11）- 操作 Cookie</a></p>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/15019737.html" target="_blank">Flask（12）- 操作 Session</a></p>
  <p>&nbsp;</p>
  <h3 tid="tid-Ytbzaz" id="tid-Ytbzaz">常见问题解决方案</h3>
  <p><a class="entry post-title-appendix" href="https://www.cnblogs.com/poloyy/p/14993520.html" target="_blank">Flask - 解决 app.run() 添加 host、port、debug 参数后运行不生效的问题</a>&nbsp;</p>
  <p><a class="link-post-title" href="https://www.cnblogs.com/poloyy/p/15170891.html">Flask - 访问返回字典的接口报错：The view function did not return a valid response. The return type must be a string, tuple, Response instance, or WSGI callable, but it was a dict.</a></p>
  <p>&nbsp;</p>
  <h2 tid="tid-ra7ewJ" id="tid-ra7ewJ">FastAPI</h2>
  <p><a class="link-post-title" href="https://www.cnblogs.com/poloyy/p/15148509.html">FastAPI（1）- 简单介绍</a></p>
  <p>&nbsp;</p>`,
  `# blog

  ## Project setup
  ${'```'}
  yarn install
  ${'```'}

  ### Compiles and hot-reloads for development
  ${'```'}
  yarn serve
  ${'```'}

  ### Compiles and minifies for production
  ${'```'}
  yarn build
  ${'```'}

  ### Run your unit tests
  ${'```'}
  yarn test:unit
  ${'```'}

  ### Run your end-to-end tests
  ${'```'}
  yarn test:e2e
  ${'```'}

  ### Lints and fixes files
  ${'```'}
  yarn lint
  ${'```'}

  ### Customize configuration
  See [Configuration Reference](https://cli.vuejs.org/config/).
  `
];
