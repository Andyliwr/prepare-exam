const assert = require('assert');

const question = '实现一个简易版的微博，包含 client 和 server 两部分，并实现四个基础功能：关注、取关、发微博、获取用户微博列表';

// A 关注 B 后，A 和 B 就成为好友关系（即使 B 没有关注 A）
// 某个用户的微博列表，包含他本人和他所有好友的所有微博
// 数据存储在 server 端
// 具体执行逻辑，参见本题的测试部分

class WeiboClient {
  /**
   * @param { userId, server } options
   */
  constructor(options) {
    if (!options.server) throw new Error('server not not be null');
    const newOptions = { userId: 'default', ...options };
    this.server = newOptions.server;
    this.user = newOptions.userId;
    // 开始注册用户
    this.server.login(newOptions.userId);
  }

  // 关注指定用户
  follow(userId) {
    this.server.follow(this.user, userId);
  }

  // 取关指定用户
  unfollow(userId) {
    this.server.unfollow(this.user, userId);
  }

  // 发微博
  postNewWeibo(content) {
    this.server.postNewWeibo(this.user, content);
  }
}

class WeiboServer {

  constructor() {
    // 初始化用户列表
    this.users = [];
    // 初始化微博列表
    this.posts = [];
    // 初始化关系列表
    this.relations = [];
  }

  // 用户登录
  login(userId) {
    if (userId && this.users.indexOf(userId)) {
      this.users.push(userId);
      return true;
    } else {
      return false;
    }
  }

  /**
   * 获取对应用户微博列表
   * @param {*} operator 操作者
   */
  getWeiboList(operator) {
    if (typeof operator !== 'string') throw new Error('operator param invalid');
    if (this.users.indexOf(operator) < 0) throw new Error('operator can not be found');
    const hisFriends = [];
    for (let i=0; i<this.relations.length; i++) {
      if (this.relations[i].indexOf(operator) > -1) {
        hisFriends.push(this.relations[i].filter(item => item !== operator)[0]);
      }
    }
    // 把自己加入hisFriends
    hisFriends.push(operator);
    return this.posts.
      filter(post => hisFriends.indexOf(post.operator) > -1)
      .map(post => post.content);
  }

  /**
   * 判断两个人是否是好友
   * @param {*} people1 人1
   * @param {*} people2 人2
   */
  judgeIsFriend(people1, people2) {
    if (typeof people1 !== 'string' && typeof people2 !== 'string') return false;
    if (this.users.indexOf(people2) < 0 || this.users.indexOf(people2) < 0) return false;
    return this.relations.some(relation => relation.indexOf(people1) > -1 && relation.indexOf(people2) > -1);
  }

  /**
   * 关注指定用户
   * @param {*} operator 操作者
   * @param {*} follower 被关注的人
   */
  follow(operator, follower) {
    if (typeof operator !== 'string' && typeof follower !== 'string') throw new Error('operator or follower param invalid');
    if (this.users.indexOf(operator) < 0) throw new Error('operator can not be found');
    if (this.users.indexOf(follower) < 0) throw new Error('follower can not be found');
    !this.judgeIsFriend(operator, follower) && this.relations.push([operator, follower]);
    return true;
  }

   /**
   * 取关指定用户
   * @param {*} operator 操作者
   * @param {*} follower 被取关的人
   */
  unfollow(operator, follower) {
    if (typeof operator !== 'string' && typeof follower !== 'string') throw new Error('operator or follower param invalid');
    if (this.users.indexOf(operator) < 0) throw new Error('operator can not be found');
    if (this.users.indexOf(follower) < 0) throw new Error('follower can not be found');
    if (this.judgeIsFriend(operator, follower)) {
      this.relations = this.relations.filter(relation => !(relation.indexOf(operator) > -1 && relation.indexOf(follower) > -1));
    } else {
      throw new Error('there are not friend');
    }
  }

  /**
   * 发微博
   * @param {*} operator 操作者
   * @param {*} content 微博内容
   */
  postNewWeibo(operator, content) {
    if (typeof operator !== 'string') throw new Error('operator param invalid');
    if (typeof content !== 'string') throw new Error('content param invalid');
    if (this.users.indexOf(operator) < 0) throw new Error('operator can not be found');
    this.posts.push({ operator, content, time: Date.now() });
  }
}

/*******测试部分*******/
module.exports = function doTest() {
  try {
    const wServer = new WeiboServer();
    const wClientA = new WeiboClient({
      userId: '001',
      server: wServer,
    });
    const wClientB = new WeiboClient({
      userId: '002',
      server: wServer,
    });
    const wClientC = new WeiboClient({
      userId: '003',
      server: wServer,
    });

    const WEIBO_CONTENT_A = 'Hello World';
    const WEIBO_CONTENT_B = '大家好，我是user 002';
    const WEIBO_CONTENT_C = '小程序怎么写？';
    wClientA.postNewWeibo(WEIBO_CONTENT_A);
    wClientB.postNewWeibo(WEIBO_CONTENT_B);
    wClientC.postNewWeibo(WEIBO_CONTENT_C);

    assert.deepStrictEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A]);

    wClientA.follow('002');
    assert.deepStrictEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A, WEIBO_CONTENT_B]);

    wClientA.follow('003');
    assert.deepStrictEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A, WEIBO_CONTENT_B, WEIBO_CONTENT_C]);

    wClientA.unfollow('002');
    assert.deepStrictEqual(wServer.getWeiboList('001'), [WEIBO_CONTENT_A, WEIBO_CONTENT_C]);

    return '通过';
  } catch (ex) {
    return '不通过';
  }
}
