import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { TextInput } from "react-native-gesture-handler";
import CategoryButtons from "@/components/CategoryButtons";
import Listings from "@/components/Listings";
import ListingData from "@/data/destinations.json";
import GroupListings from "@/components/GroupListings";
import GroupData from "@/data/groups.json";
import { useAuth } from "@/hooks/AuthContext";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState("All");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const onCatChanged = (category: string) => {
    console.log("Category :", category);
    setCategory(category);
  };

  const handleAvatarPress = () => {
    if (!isAuthenticated) {
      router.push("/Login"); // Mengarahkan ke halaman login jika belum login
    } else {
      router.push("/(tabs)/profile"); // Mengarahkan ke halaman profil jika sudah login
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={handleAvatarPress} style={{ marginLeft: 20 }}>
              <Image source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }} style={{ width: 40, height: 40, borderRadius: 10 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: Colors.secondColor,
                padding: 10,
                borderRadius: 10,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.white} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headingTxt}>Explore the Beautiful World!</Text>
          <View style={styles.searchSectionWrapper}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} style={{ marginRight: 5 }} color={Colors.black} />
              <TextInput placeholder="Search..." />
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.filterBtn}>
              <Ionicons name="options" size={28} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <CategoryButtons onCagtegoryChanged={onCatChanged} />
          <Listings listings={ListingData} category={category} />
          <GroupListings listings={GroupData} />
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
  headingTxt: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: Colors.threeColor,
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },
});
