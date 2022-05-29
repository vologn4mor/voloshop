import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { THEME } from "../theme";
import { MarkedDataContext } from "../context/markedData/markedDataContext";
import { useContext, useEffect } from "react";
import { Consts } from "../consts";

export const Item = ({
  item,
  setMarkedId,
  onRefresh,
  navigation,
  showError,
}) => {
  const { markedData, setMark, removeMark } = useContext(MarkedDataContext);
  let markedId = markedData;

  const deleteHandler = () => {
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
          onPress: async () => {
            try {
              const response = await fetch(
                Consts.Backend_URL + "/api/posts/" + item.id,
                {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                }
              );
            } catch (error) {
              showError();
            }
            onRefresh(true);
          },
          style: "default",
        },
      ]
    );
  };

  const checkMarked = () => {
    for (let i = 0; i < markedId.length; i++) {
      if (markedId[i].id === item.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    checkMarked();
  }, []);

  const pressHandler = () => {
    if (!checkMarked()) {
      setMark(item.id);
    } else {
      removeMark(item.id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onLongPress={deleteHandler}
      onPress={() => {
        navigation.navigate("Item", {
          item: item,
        });
      }}
    >
      <View style={styles.image_wrapper}>
        <Image
          style={styles.image}
          source={{
            uri: item.picture,
          }}
        />
        <Text style={styles.name_text}>{item.name}</Text>
      </View>
      <View style={styles.bottom_wrapper}>
        <Text style={styles.cost}>{item.cost}$</Text>
        <TouchableOpacity onPress={pressHandler} activeOpacity={0.9}>
          <View style={THEME.AppButton}>
            <Text>
              {checkMarked() ? "Убрать из корзины" : "Добавить в корзину"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.GrayColor,
    width: "100%",
    height: 350,
    marginVertical: 7,
    borderRadius: 5,
  },
  image_wrapper: {
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 200,
    height: 250,
  },
  name_text: {
    color: THEME.ElementsColor,
    fontSize: 22,
  },
  cost: {
    color: THEME.ElementsColor,
    fontSize: 16,
  },
  bottom_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "№fff",
  },
});
