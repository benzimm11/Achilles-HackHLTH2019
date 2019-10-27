var PushNotification = require('react-native-push-notification');

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});

notify = () => {
  PushNotification.localNotification({
    /* Android Only Properties */
    id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: 'My Notification Ticker', // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    subText: 'App name', // (optional) default: none
    color: '#4299e1', // (optional) default: system default
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    /* iOS and Android properties */
    title: 'Dr. Su is checking in', // (optional)
    message: 'Have you experienced leg or foot numbness or tingling recently?', // (required)
    playSound: false, // (optional) default: true
    actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  });
};
