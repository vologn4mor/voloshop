import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { THEME } from "../../theme";

export const AppButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.button}>
        <Text>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.AccentColor,
    padding: 7,
    borderRadius: 5,
  },
});
