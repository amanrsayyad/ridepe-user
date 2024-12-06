import { Image, ImageSourcePropType, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    style={[
      styles.tabIconContainer,
      { backgroundColor: focused ? "#333333" : "" },
    ]}
  >
    <View
      style={[styles.tabIcon, { backgroundColor: focused ? "#0CC25F" : "" }]}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        style={styles.icon}
      />
    </View>
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          paddingHorizontal: 20,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: "Help & Support",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.help} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.settings} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  tabIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    paddingBottom: 27,
  },
  tabIcon: {
    borderRadius: 100,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
