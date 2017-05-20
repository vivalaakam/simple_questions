import { eventChannel } from 'redux-saga';
import token from '../utils/token';

class Channel {
  constructor() {
    if (typeof window !== 'undefined') {
      const ActionCable = require('actioncable');
      this.channel = ActionCable.createConsumer(`/cable?token=${token.getToken()}`);
    }
  }

  channel = false;


  subscribe(channel) {
    return eventChannel((emitter) => {
      if (this.channel) {
        const subscription = this.channel.subscriptions.create(channel, {
          received: data => emitter(data)
        });

        return () => {
          subscription.remove(channel);
        };
      }

      return () => null;
    });
  }
}

export default new Channel();
