import { useContext, useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { Consts } from "../consts";
import { MarkedDataContext } from "../context/markedData/markedDataContext";
import { THEME } from "../theme";

export const ModalCart = ({ modalVisible, setModalVisible, totalItems }) => {
  const { clearCart } = useContext(MarkedDataContext);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("Ошибка", "Проверьте соединение с интернетом", [
        {
          text: "ok",
          style: "ok",
        },
      ]);
    }
  }, [error]);

  console.log(totalItems);
  const sendHandler = async () => {
    setError(false);
    const data = {
      city,
      street,
      number,
      email,
      totalItems,
    };

    try {
      await fetch(Consts.Backend_URL + "/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCity("");
      setStreet("");
      setNumber("");
      setEmail("");
      setModalVisible(false);
      clearCart();
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>
            Введите данные, необходимые для оформления заказа:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Город"
            placeholderTextColor="gray"
            onChangeText={setCity}
            value={city}
          />
          <TextInput
            style={styles.input}
            placeholder="Улица, кв"
            placeholderTextColor="gray"
            onChangeText={setStreet}
            value={street}
          />
          <TextInput
            style={styles.input}
            placeholder="Номер телефона"
            placeholderTextColor="gray"
            onChangeText={setNumber}
            value={number}
          />
          <TextInput
            style={styles.input}
            placeholder="Email (не обязательно)"
            placeholderTextColor="gray"
            onChangeText={setEmail}
            value={email}
          />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setModalVisible(false)}
            >
              <View style={THEME.AppButton}>
                <Text>Отмена</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={sendHandler}>
              <View style={THEME.AppButton}>
                <Text>Отправить заказ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: THEME.GrayColor,
    padding: 20,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    borderColor: THEME.ElementsColor,
    borderRadius: 5,
    marginVertical: 10,
    color: THEME.ElementsColor,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: THEME.ElementsColor,
  },
});
