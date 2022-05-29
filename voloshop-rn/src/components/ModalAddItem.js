import {
  View,
  StyleSheet,
  Text,
  Input,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { THEME } from "../theme";
import { useState } from "react";
import { Consts } from "../consts";

export const ModalAddItem = ({
  modalVisible,
  setModalVisible,
  onRefresh,
  showError,
}) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");

  const sendHandler = async () => {
    var formData = new FormData();
    formData.append("picture", image);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("cost", cost);

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(Consts.Backend_URL + "/api/posts", options);
    } catch (error) {
      return showError();
    }

    onRefresh(true);
    setTitle("");
    setCategory("");
    setCost("");
    setImage("");
    setDescription("");
    setModalVisible(false);
  };

  const imageTakeHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setImage({ uri: localUri, name: filename, type });
    }
  };
  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Данные для нового товара:</Text>
          <TextInput
            style={styles.input}
            placeholder="Название товара"
            placeholderTextColor="gray"
            onChangeText={setTitle}
            value={title}
          />
          <TextInput
            style={styles.input}
            placeholder="Описание"
            placeholderTextColor="gray"
            onChangeText={setDescription}
            value={description}
          />
          <TextInput
            style={styles.input}
            placeholder="Категория"
            placeholderTextColor="gray"
            onChangeText={setCategory}
            value={category}
          />
          <TextInput
            style={styles.input}
            placeholder="Цена"
            placeholderTextColor="gray"
            onChangeText={setCost}
            value={cost}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ paddingBottom: 10 }}
            onPress={imageTakeHandler}
          >
            <View style={{ ...THEME.AppButton, alignItems: "center" }}>
              <Text>Добавить фото</Text>
            </View>
          </TouchableOpacity>
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
                <Text>Добавить</Text>
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
    width: "100%",
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
