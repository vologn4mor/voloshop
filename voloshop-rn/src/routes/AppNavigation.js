import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "../screens/MainScreen";
import { CartScreen } from "../screens/CartScreen";
import { InfoScreen } from "../screens/InfoScreen";
import { ItemScreen } from "../screens/ItemScreen";

const Stack = createNativeStackNavigator();

export const AppNavigaton = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Item" component={ItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
