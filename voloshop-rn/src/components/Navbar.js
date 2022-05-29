import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { THEME } from "../theme";

export const Navbar = ({ navigation, settings }) => {
  // console.log(settings);
  const pressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressHandler}>
        <Ionicons
          name="md-chevron-back-outline"
          size={28}
          color={THEME.ElementsColor}
        />
      </TouchableOpacity>
      <Text style={{ ...styles.logo, paddingRight: settings ? 0 : 28 }}>
        Voloshop
      </Text>
      <View>
        {settings ? (
          <MaterialCommunityIcons
            name="information-outline"
            size={28}
            color={THEME.ElementsColor}
            onPress={() => {
              navigation.navigate("Info");
            }}
          />
        ) : null}
      </View>
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
    // paddingRight: true ? 28 : 0,
  },
});
