import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { Home } from "../screens/Home";
import { Register } from "../screens/Register";
import { Details } from "../screens/Details";

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes(){
    return(
        <Navigator screenOptions ={{headerShown: false}} >
            <Screen name = "home" component={Home}/>
            <Screen name = "new" component={Register}/>
            <Screen name = "details" component={Details}/>
        </Navigator>
    )
}