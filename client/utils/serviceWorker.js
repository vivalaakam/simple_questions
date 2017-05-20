import Notifications from '../api/notifications';

const notificationsApi = new Notifications();

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

class PushManager {
  constructor() {
    if (typeof navigator !== 'undefined') {
      navigator.serviceWorker.register('sw.js')
        .then((sw) => {
          this.serviceWorker = sw;
          this.initPush();
        })
        .catch((error) => {
          console.error('Service Worker Error', error);
        });
    }
  }

  hasSubscription = false;
  serviceWorker;

  initPush() {
    this.serviceWorker.pushManager.getSubscription()
      .then((subscription) => {
        this.hasSubscription = !(subscription === null);
      });
  }

  subscribeUser() {
    if (!this.serviceWorker) {
      return;
    }
    this.serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(process.env.VAPID_PUBLIC_KEY)
    })
      .then((subscription) => {
        notificationsApi.subscribe(JSON.stringify(subscription), 'web')
          .then(() => {
            this.hasSubscription = true;
          })
          .catch(() => {
            this.hasSubscription = false;
          });
      })
      .catch((err) => {
        console.log('Failed to subscribe the user: ', err);
      });
  }

  unsubscribeUser() {
    if (!this.serviceWorker) {
      return;
    }

    this.serviceWorker.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          this.hasSubscription = false;
          return subscription.unsubscribe();
        }

        return false;
      });
  }
}

export default new PushManager();
