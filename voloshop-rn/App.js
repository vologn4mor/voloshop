import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { DataState } from "./src/context/data/DataState";
import { MarkedDataState } from "./src/context/markedData/MarkedDataState";
import { AppNavigaton } from "./src/routes/AppNavigation";
import { THEME } from "./src/theme";

export default function App() {
  return (
    <View style={styles.container}>
      <DataState>
        <MarkedDataState>
          <AppNavigaton />
        </MarkedDataState>
      </DataState>
      {Platform.OS === "android" ? (
        <StatusBar style="auto" translucent={false} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.MainColor,
    paddingHorizontal: 10,
    // padingTop: Platform.OS === "ios" ? 0 : 0,
  },
});
