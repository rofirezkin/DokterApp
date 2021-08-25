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
  EditArtikel,
  DashboardPasien,
  Monitoring,
  Doctors,
  ChooseDoctor,
  BodyMassIndex,
  DoctorProfilePasien,
  MessagesPasien,
  KoneksiAlat,
  RealtimeData,
  SaveData,
  ChattingPasien,
  Pembayaran,
  StatusPembayaran,
  DetailPembayaranPasien,
  RoleUser,
  DashboardAdmin,
  DetailPembayaranAdmin,
  InputDataMedis,
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

const MainAppPasien = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={DashboardPasien} />
      <Tab.Screen name="Messages" component={MessagesPasien} />
      <Tab.Screen name="Monitoring" component={Monitoring} />
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
        name="SaveData"
        component={SaveData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoleUser"
        component={RoleUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InputDataMedis"
        component={InputDataMedis}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DashboardAdmin"
        component={DashboardAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailPembayaranAdmin"
        component={DetailPembayaranAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Doctors"
        component={Doctors}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StatusPembayaran"
        component={StatusPembayaran}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailPembayaranPasien"
        component={DetailPembayaranPasien}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseDoctor"
        component={ChooseDoctor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KoneksiAlat"
        component={KoneksiAlat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Monitoring"
        component={Monitoring}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BodyMassIndex"
        component={BodyMassIndex}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorProfilePasien"
        component={DoctorProfilePasien}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DashboardPasien"
        component={DashboardPasien}
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
        name="MainAppPasien"
        component={MainAppPasien}
        options={{ headerShown: false }}
      />
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
        name="ChattingPasien"
        component={ChattingPasien}
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
        name="EditArtikel"
        component={EditArtikel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateStatus"
        component={UpdateStatus}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RealtimeData"
        component={RealtimeData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pembayaran"
        component={Pembayaran}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
