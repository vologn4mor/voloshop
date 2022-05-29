import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Navbar } from "../components/Navbar";
import { THEME } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.info}>
        <View>
          <Text style={styles.text}>Автор приложения - volognamor</Text>
          {/* <Button
            title="test"
            onPress={() => {
              Linking.openURL("https://google.com");
            }}
          /> */}
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL("https://github.com/vologn4mor");
            }}
          >
            <View
              style={{
                ...THEME.AppButton,
                ...styles.button,
              }}
            >
              <AntDesign
                name="github"
                size={24}
                color="black"
                style={{ paddingRight: 10 }}
              />
              <Text>GitHub</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL("https://t.me/volognamor");
            }}
          >
            <View
              style={{
                ...THEME.AppButton,
                ...styles.button,
              }}
            >
              <FontAwesome5
                name="telegram-plane"
                size={24}
                color="black"
                style={{ paddingRight: 10 }}
              />
              <Text>Telegram</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              Linking.openURL("mailto:romangolov2001@gmail.com");
            }}
          >
            <View
              style={{
                ...THEME.AppButton,
                ...styles.button,
              }}
            >
              <MaterialCommunityIcons
                name="gmail"
                size={24}
                color="black"
                style={{ paddingRight: 10 }}
              />
              <Text>Gmail</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.MainColor,
    paddingHorizontal: 10,
  },
  text: {
    color: THEME.ElementsColor,
    fontSize: 20,
  },
  info: {
    flex: 1,
    backgroundColor: THEME.MainColor,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    marginTop: 15,
  },
});
