import { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavbarMain } from "../components/NavbarMain";
import { THEME } from "../theme";
import { Item } from "../components/Item";
import DropDownPicker from "react-native-dropdown-picker";
import { DataContext } from "../context/data/dataContext";
import { ModalAddItem } from "../components/ModalAddItem";

export const MainScreen = ({ navigation }) => {
  const { dataState, fetchData, error } = useContext(DataContext);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [itemsList, setItemsList] = useState([
    { label: "Все товары", value: "Все товары" },
  ]);
  const [selectedValue, setSelctedValue] = useState(itemsList[0].value);
  const [markedId, setMarkedId] = useState([]);
  const changeDropListHandler = () => {
    setOpen(!open);
  };

  const loadData = useCallback(async () => {
    const response = await fetchData();
  }, []);

  const showError = () => {
    Alert.alert("Ошибка", "Проверьте соединение с интернетом", [
      {
        text: "ok",
        style: "ok",
      },
    ]);
  };

  useEffect(() => {
    loadData();
    console.log("load data");
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (error && refreshing) {
      showError();
      setRefreshing(false);
    }
  }, [refreshing, error]);

  useEffect(() => {
    if (dataState) {
      console.log(dataState);
      setData(dataState);
      setRenderData(dataState);
      setRefreshing(false);
      setLoaded(true);
    }
  }, [dataState]);

  useEffect(() => {
    refreshItemsList();
  }, [data]);

  const refreshItemsList = () => {
    let arr = [];
    setItemsList([{ label: "Все товары", value: "Все товары" }]);
    renderData.map((item) => {
      if (arr.indexOf(item.category) === -1) {
        arr.push(item.category);
        setItemsList((prev) => {
          return [
            ...prev,
            {
              label: item.category,
              value: item.category,
            },
          ];
        });
      }
    });
  };

  const changeItemHandler = (category) => {
    if (category === "Все товары") {
      return setRenderData(data);
    }

    let templateArr = [];
    for (let i = 0; i < data.length; i++) {
      if (category === data[i].category) {
        templateArr.push(data[i]);
      }
    }
    setRenderData(templateArr);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };
  return (
    <View style={styles.container}>
      <ModalAddItem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onRefresh={onRefresh}
        showError={showError}
      />
      {loaded ? (
        <View style={{ flex: 1 }}>
          <NavbarMain
            navigation={navigation}
            setModalVisible={setModalVisible}
          />
          <DropDownPicker
            items={itemsList}
            setOpen={changeDropListHandler}
            open={open}
            defaultIndex={0}
            setItems={setItemsList}
            setValue={setSelctedValue}
            value={selectedValue}
            containerStyle={{
              height: 40,
              marginTop: 20,
              marginBottom: 10,
              backgroundColor: "#000",
              zIndex: 1000,
            }}
            style={{
              backgroundColor: THEME.GrayColor,
              color: THEME.ElementsColor,
            }}
            textStyle={{
              color: THEME.ElementsColor,
            }}
            labelStyle={{
              color: "#fff",
            }}
            dropDownContainerStyle={{
              backgroundColor: THEME.GrayColor,
              color: THEME.ElementsColor,
            }}
            theme="DARK"
            onChangeValue={(item) => changeItemHandler(item)}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={renderData}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => {
              return (
                <Item
                  item={item}
                  setMarkedId={setMarkedId}
                  markedId={markedId}
                  onRefresh={onRefresh}
                  navigation={navigation}
                  showError={showError}
                />
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Voloshop</Text>
          {error ? (
            <TouchableOpacity onPress={loadData}>
              <View style={THEME.AppButton}>
                <Text>Обновить</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.MainColor,
    paddingHorizontal: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: THEME.ElementsColor,
    fontSize: 50,
  },
});
