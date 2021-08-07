import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  GetStarted,
  Splash,
  Register,
  Login,
  AR,
  UploadPhoto,
  Messages,
  Dashboard,
  Artikel,
  Chatting,
  UserProfile,
  UpdateProfile,
  DoctorProfile,
  UpdateStatus,
  DataHistory,
  ArtikelPage,
  AllArtikel,
  Success,
  Catatan,
  ResepObat,
  PanduanAplikasi,
  PanduanDetail,
  Welcome,
  PanduanSingkat,
  EmailVerification,
} from "../pages";
import { BottomNavigator } from "../components";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Artikel" component={Artikel} />
    </Tab.Navigator>
  );
};

const Router = ({ user }) => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PanduanSingkat"
        component={PanduanSingkat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PanduanAplikasi"
        component={PanduanAplikasi}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PanduanDetail"
        component={PanduanDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResepObat"
        component={ResepObat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllArtikel"
        component={AllArtikel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArtikelPage"
        component={ArtikelPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DataHistory"
        component={DataHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AR" component={AR} options={{ headerShown: false }} />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Artikel"
        component={Artikel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Catatan"
        component={Catatan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateStatus"
        component={UpdateStatus}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
