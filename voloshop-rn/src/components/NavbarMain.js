import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { THEME } from "../theme";

export const NavbarMain = ({ navigation, setModalVisible }) => {
  const pressHandler = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => setModalVisible(true)}
      >
        <Text style={styles.logo}>Voloshop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pressHandler}>
        <Feather name="shopping-cart" size={28} color={THEME.ElementsColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  logo: {
    color: THEME.ElementsColor,
    fontSize: 28,
  },
});
