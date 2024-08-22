import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

type Props = {
  onCagtegoryChanged: (category: string) => void;
};

const CategoryButtons = ({ onCagtegoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState<{ id: number; title: string; icon_name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/destination-categories")
      .then((response) => {
        console.log("API Response:", response.data); // Periksa struktur data yang diterima
        const data = response.data.data; // Ambil array dari kunci "data"
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
        setLoading(false);
      });
  }, []);

  const handleSelectCategory = (index: number) => {
    const selected = itemRef.current[index];

    setActiveIndex(index);

    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    });

    onCagtegoryChanged(categories[index].title);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.black} />;
  }

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      >
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <TouchableOpacity key={index} ref={(el) => (itemRef.current[index] = el)} onPress={() => handleSelectCategory(index)} style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn}>
              <MaterialCommunityIcons name={item.icon_name as any} size={20} color={activeIndex === index ? Colors.white : Colors.black} />
              <Text style={activeIndex === index ? styles.categoryBtnTxtActive : styles.categoryBtnTxt}>{item.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No categories available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.threeColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryBtnTxt: {
    marginLeft: 10,
    color: Colors.black,
  },
  categoryBtnTxtActive: {
    marginLeft: 5,
    color: Colors.white,
  },
});
