import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";

export const ItemCart = ({
  item,
  decrimentCounter,
  incrementCounter,
  removeMark,
}) => {
  const longPressHandler = () => {
    Alert.alert(
      "Удаление элемента",
      "Вы действительно хотите удалить предмет?",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => removeMark(item.id),
          style: "default",
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={() => {
        longPressHandler();
      }}
    >
      <View style={styles.container}>
        <View style={styles.imgAndName}>
          <Image source={{ uri: item.picture }} style={styles.image} />
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.costContainer}>
          {/* <Button
          title="-"
          onPress={() => {
            decrimentCounter(item);
          }}
        /> */}
          <AntDesign
            name="downcircle"
            size={24}
            color={THEME.ElementsColor}
            onPress={() => decrimentCounter(item)}
          />
          <Text style={styles.costText}>
            {item.counter} x {item.cost} = {item.counter * item.cost}$
          </Text>
          {/* <Button title="+" onPress={() => incrementCounter(item)} /> */}
          <AntDesign
            name="upcircle"
            size={24}
            color={THEME.ElementsColor}
            onPress={() => incrementCounter(item)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: THEME.GrayColor,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
  },
  imgAndName: {
    flexDirection: "row",
    alignItems: "center",
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 150,
    justifyContent: "space-between",
  },
  costText: {
    paddingHorizontal: 5,
    color: THEME.ElementsColor,
    // width: 100,
  },
  nameText: {
    color: THEME.ElementsColor,
  },
});
