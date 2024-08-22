import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { isAuthenticated, logout, token } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data.user);
        } else {
          Alert.alert("Error", data.message || "An error occurred");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred");
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, token]);

  const handleEdit = () => {
    router.push("/listing/edit-profile");
  };

  const handleLogin = () => {
    router.push("/Login");
  };

  const handleRegister = () => {
    router.push("/Register");
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          {userData ? (
            <>
              <Image source={{ uri: userData.profile_picture_url || "https://xsgames.co/randomusers/avatar.php?g=male" }} style={styles.profilePicture} />
              <View style={styles.containerTxt}>
                <Text style={styles.nameText}>Name: {userData.name}</Text>
                <Text style={styles.emailText}>Email: {userData.email}</Text>
              </View>
              <View style={styles.containerBtn}>
                <Button title="Edit" onPress={handleEdit} />
                <Button title="Logout" onPress={logout} />
              </View>
            </>
          ) : (
            <Text style={styles.loadingTxt}>Loading...</Text>
          )}
        </>
      ) : (
        <>
          <Text style={{ fontSize: 15 }}>Please login to access your profile.</Text>
          <View style={styles.containerBtn}>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={handleRegister} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center", // Center the content horizontally
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
  },
  loadingTxt: {
    textAlign: "center",
  },
  containerTxt: {},
  containerBtn: {
    gap: 10,
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
    borderRadius: 10,
  },
});
