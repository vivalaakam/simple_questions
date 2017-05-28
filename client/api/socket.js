import { eventChannel } from 'redux-saga';
import token from '../utils/token';

class Channel {
  channel = false;

  token = null

  subscribe(channel, token) {
    if (!this.channel || token !== this.token) {
      if (this.channel && token !== this.token) {
        this.channel.disconnect();
      }

      const ActionCable = require('actioncable');
      const uri = process.env.PROXY_SERVER.replace(/^(http)(s?:\/\/)/, 'ws$2');
      this.channel = ActionCable.createConsumer(`${uri}/cable?token=${token}`);
      this.token = token;
    }

    return eventChannel((emitter) => {
      const subscription = this.channel.subscriptions.create(channel, {
        received: emitter
      });

      return () => {
        this.channel.subscriptions.remove(subscription);
      };
    });
  }
}

export default new Channel();
