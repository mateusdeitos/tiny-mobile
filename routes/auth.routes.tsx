import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Login } from "../screens/Login";

const Auth = createStackNavigator();

export const AuthRoutes: React.FC = () => {
	return <Auth.Navigator
		screenOptions={{
			headerShown: false,
			// cardStyle: { backgroundColor: '#312e38' }
		}}
		initialRouteName="Login"
	>
		<Auth.Screen name="Login" component={Login} />

	</Auth.Navigator>
}