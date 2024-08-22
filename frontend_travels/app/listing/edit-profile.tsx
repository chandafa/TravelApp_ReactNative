import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "expo-router";

export default function EditProfileScreen() {
  const { token, logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          setName(data.user.name);
          setEmail(data.user.email);
        } else {
          Alert.alert("Error", data.message || "An error occurred");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred");
      }
    };

    fetchUserData();
  }, [token]);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");
        router.push("/listing/profile");
      } else {
        Alert.alert("Error", data.message || "An error occurred");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
