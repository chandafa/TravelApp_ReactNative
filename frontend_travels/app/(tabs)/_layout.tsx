import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          padding: 0,
          // marginBottom: 5,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.threeColor,
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ color }) => <Ionicons name="compass" size={28} color={color} /> }} />
      <Tabs.Screen name="category" options={{ tabBarIcon: ({ color }) => <Ionicons name="grid" size={28} color={color} /> }} />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: Colors.secondColor,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 10,
                height: 51,
              }}
            >
              <Ionicons name="search-outline" size={28} color={Colors.white} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="bookmarks" options={{ tabBarIcon: ({ color }) => <Ionicons name="bookmarks" size={28} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} /> }} />
    </Tabs>
  );
}
