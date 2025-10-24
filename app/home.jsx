import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';



export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                CONVERSOR DE UNIDADES DE JPLY
            </Text>

            <TouchableOpacity onPress={()=>{router.navigate("longitud")}} style={styles.buttonBase} >

                <Text style={styles.textButton}>TAMAÑOS</Text>
               
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{router.navigate("pesos")}} style={styles.buttonBase} >

                <Text style={styles.textButton}>MASA/PESO</Text>
               
            </TouchableOpacity>
        </View>
    );
}

// Tus estilos están perfectos para Pressable
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1C1B1F',
        marginBottom: 60,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    buttonBase: {
        width: '90%',
        maxWidth: 340,
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#db0000ff',    
        textAlign:'center'
    },
    textButton:{color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,}
});