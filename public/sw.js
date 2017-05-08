"use strict";

self.addEventListener('push', (event) => {

  let notificationData = {};
  try {
    notificationData = event.data.json();
  } catch (e) {
    notificationData = {
      title: 'Default title',
      body: 'Default message',
      icon: '/default-icon.png'
    };
  }

  notificationData.data = notificationData

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );

});

self.addEventListener('notificationclick', (event) => {
  const notificationData = event.notification.data;
  const target = `/${notificationData.id}`
  // close the notification
  event.notification.close();

  // see if the current is open and if it is focus it
  // otherwise open new tab
  event.waitUntil(
    self.clients.matchAll().then((clientList) => {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === target && 'focus' in client) {
          return client.focus();
        }
      }

      // Открываем новое окно
      return self.clients.openWindow(target);
    })
  );
});
