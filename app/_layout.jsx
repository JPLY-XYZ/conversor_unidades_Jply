import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from 'expo-router';
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} /> 
         <Stack.Screen  name="longitud"  options={{ headerShown: true, title:"Tamaños" }} /> 
          <Stack.Screen  name="pesos"  options={{ headerShown: true, title:"Peso/Masa" }} /> 
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFBFF', 
  }})