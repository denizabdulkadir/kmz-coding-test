import { NavigationProp, RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Product: undefined;
    Cart:undefined
  };
  
 
  
  export type HomeScreenProps = {
    navigation: NavigationProp<RootStackParamList, 'Home'>;
};

export type ProductScreenProps = {
      navigation: NavigationProp<RootStackParamList, 'Product'>;
    route: RouteProp<RootStackParamList, 'Product'>;
  };

export type CartScreenProps = {
      navigation: NavigationProp<RootStackParamList, 'Cart'>;
    route: RouteProp<RootStackParamList, 'Cart'>;
  };
  