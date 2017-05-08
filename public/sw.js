"use strict";

self.addEventListener('push', (event) => {
  try {
    const notificationData = event.data.json();
    notificationData.data = notificationData

    event.waitUntil(
      self.registration.showNotification(notificationData.title, notificationData)
    );
  } catch (e) {
    console.log(e.message);
  }
});

self.addEventListener('notificationclick', (event) => {
  const notificationData = event.notification.data;
  const target = `/${notificationData.id}`
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll().then((clientList) => {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === target && 'focus' in client) {
          return client.focus();
        }
      }

      return self.clients.openWindow(target);
    })
  );
});
