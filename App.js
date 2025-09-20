import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import TicketListScreen from "./screens/TicketListScreen";
import AddTicketScreen from "./screens/AddTicketScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tickets" component={TicketListScreen} />
          <Stack.Screen name="AddTicket" component={AddTicketScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}