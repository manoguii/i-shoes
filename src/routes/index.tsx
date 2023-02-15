import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)
    })

    return () => unsubscribe
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {notification?.title &&
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      }

    </NavigationContainer>
  );
}