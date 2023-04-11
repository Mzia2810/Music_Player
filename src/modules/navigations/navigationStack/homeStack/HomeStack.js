import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from '../../bottomTab/BottomTabNavigation';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator">
       <Stack.Screen 
      name="BottomTabNavigator" 
      options={{headerShown:false}}
      component={BottomTabNavigator} 
      />

      {/* <Stack.Screen
        name="Subjects"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          headerShadowVisible: false,
        }}
        component={Subjects}
      />
      <Stack.Screen
        name="MainCourse"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          headerShadowVisible: false,
        }}
        component={MainCourse}
      />

      <Stack.Screen
        name="Course"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          headerShadowVisible: false,
        }}
        component={Course}
      /> */}

     

      
     
    </Stack.Navigator>
  );
};

export default HomeStack;