import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import * as Linking from 'expo-linking';


const linking = {
  prefixes: [
    'com.anonymous.shoesapp://',
    'exp+shoes-app://',
    'com.manogui.iShoes://',
    'exp+ishoes://',
    'iShoes://'
  ],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const deepLinking = Linking.createURL('details', {
    queryParams: {
      productId: '7',
    }
  })

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)
    })

    return () => unsubscribe
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
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