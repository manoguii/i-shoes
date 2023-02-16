import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Guilherme',
    'user_email': 'guilherme@gmail.com',
  })
}

export function tagCartUpdate(itemCount: string, product: string) {
  OneSignal.sendTags({
    'cart_item_count': itemCount,
    'cart_item_product': product
  })
}