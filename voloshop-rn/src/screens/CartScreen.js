import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { MarkedDataContext } from "../context/markedData/markedDataContext";
import { DataContext } from "../context/data/dataContext";
import { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { THEME } from "../theme";
import { ItemCart } from "../components/ItemCart";
import { AppButton } from "../components/ui/AppButton";
import { ModalCart } from "../components/ModalCart";

export const CartScreen = ({ navigation }) => {
  const { markedData, setMark, removeMark, incCounter, decCounter } =
    useContext(MarkedDataContext);
  const { dataState } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [renderData, setRenderData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState([]);

  const createRenderData = () => {
    setShowItems(false);
    setRenderData([]);
    setTotalItems([]);
    let total = 0;
    dataState.map((dataEl) => {
      markedData.map((markedEl) => {
        if (dataEl.id === markedEl.id) {
          total += dataEl.cost * markedEl.counter;
          setShowItems(true);
          setTotalItems((prev) => {
            return [
              ...prev,
              {
                name: dataEl.name,
                counter: markedEl.counter,
                cost: dataEl.cost,
              },
            ];
          });
          setRenderData((prev) => {
            return [
              ...prev,
              {
                id: dataEl.id,
                name: dataEl.name,
                cost: dataEl.cost,
                picture: dataEl.picture,
                counter: markedEl.counter,
              },
            ];
          });
        }
      });
    });

    setTotalCost(total);
  };

  useEffect(() => {
    createRenderData();
  }, [markedData]);

  const incrementCounter = (item) => {
    if (item.counter !== 10) {
      incCounter(item.id);
    }
  };

  const decrimentCounter = (item) => {
    if (item.counter !== 1) decCounter(item.id);
  };

  return (
    <View style={styles.container}>
      {showItems ? (
        <>
          <View>
            <Navbar navigation={navigation} settings={true} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={renderData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <ItemCart
                    item={item}
                    incrementCounter={incrementCounter}
                    decrimentCounter={decrimentCounter}
                    removeMark={removeMark}
                  />
                );
              }}
            />
          </View>
          <View style={styles.totalCostContainer}>
            <Text style={styles.totalCostText}>Общая ценя: {totalCost}$</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                // console.log("1");
              }}
            >
              <Text style={THEME.AppButton}>Оформить заказ</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Navbar navigation={navigation} settings={true} />
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>В корзине пусто</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View style={THEME.AppButton}>
                <Text>Перейти на главную</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View></View>
        </>
      )}
      <ModalCart
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        totalItems={totalItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.MainColor,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  totalCostContainer: {
    backgroundColor: THEME.GrayColor,
    padding: 20,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalCostText: {
    color: THEME.ElementsColor,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: THEME.ElementsColor,
    fontSize: 28,
    marginBottom: 20,
  },
});
