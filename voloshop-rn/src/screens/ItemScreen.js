import { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MarkedDataContext } from "../context/markedData/markedDataContext";
import { Navbar } from "../components/Navbar";
import { THEME } from "../theme";

export const ItemScreen = ({ navigation, route }) => {
  const { markedData, setMark, removeMark, incCounter, decCounter } =
    useContext(MarkedDataContext);
  const item = route.params.item;
  // console.log(item);

  const checkMarked = () => {
    for (let i = 0; i < markedData.length; i++) {
      if (markedData[i].id === item.id) {
        return true;
      }
    }
    return false;
  };

  const pressHandler = () => {
    if (!checkMarked()) {
      setMark(item.id);
    } else {
      removeMark(item.id);
    }
  };

  useEffect(() => {
    checkMarked();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.itemWrapper}>
          <Image source={{ uri: item.picture }} style={styles.image} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.cost}$</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.descriptionWrapper}>
            <Text style={styles.text}>Описание:</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={pressHandler}>
              <View style={THEME.AppButton}>
                <Text>
                  {checkMarked() ? "Убрать из корзины" : "Добавить в корзину"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.MainColor,
    paddingHorizontal: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  itemWrapper: {
    backgroundColor: THEME.GrayColor,
    alignItems: "center",
    padding: 20,
    marginVertical: 20,
    borderRadius: 5,
  },
  text: {
    color: THEME.ElementsColor,
    fontSize: 24,
  },
  textWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  descriptionWrapper: {
    width: "100%",
    paddingBottom: 10,
    // justifyContent: "fsadasdsa",
    // backgroundColor: "",
  },
  description: {
    color: THEME.ElementsColor,
    fontSize: 18,
    textAlign: "justify",
  },
  hr: {
    marginVertical: 10,
    height: 3,
    width: "100%",
    backgroundColor: THEME.ElementsColor,
  },
  button: {
    alignItems: "flex-end",
    width: "100%",
  },
});
