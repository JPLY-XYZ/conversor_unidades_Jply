import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

// Constantes de conversión
const CONVERSIONS = {
    INCH_TO_CM: 2.54,
    FOOT_TO_INCH: 12,
    YARD_TO_FOOT: 3,
    MILE_TO_FOOT: 5280,
    
};

export default function Longitud() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [isInverted, setIsInverted] = useState(false); // Nuevo estado para invertir

    // Función para manejar el cálculo
    const handleConversion = (type) => {
        const numericInput = parseFloat(input);
        if (isNaN(numericInput) || input === "") {
            setResult('Introduce un valor numérico');
            return;
        }

        let conversionResult;
        let resultUnit;

        // Lógica de conversión invertida
        if (isInverted) {
            switch (type) {
                case 'IN_CM': // CM a Pulgadas
                    conversionResult = numericInput / CONVERSIONS.INCH_TO_CM;
                    resultUnit = 'pulgadas';
                    break;
                case 'FT_IN': // Pulgadas a Pies
                    conversionResult = numericInput / CONVERSIONS.FOOT_TO_INCH;
                    resultUnit = 'pies';
                    break;
                case 'YD_FT': // Pies a Yardas
                    conversionResult = numericInput / CONVERSIONS.YARD_TO_FOOT;
                    resultUnit = 'yardas';
                    break;
                case 'MI_FT': // Pies a Millas
                    conversionResult = numericInput / CONVERSIONS.MILE_TO_FOOT;
                    resultUnit = 'millas';
                    break;
                default:
                    conversionResult = 0;
                    resultUnit = '';
            }
        } else {
            // Lógica de conversión normal
            switch (type) {
                case 'IN_CM': // Pulgadas a CM
                    conversionResult = numericInput * CONVERSIONS.INCH_TO_CM;
                    resultUnit = 'cm';
                    break;
                case 'FT_IN': // Pies a Pulgadas
                    conversionResult = numericInput * CONVERSIONS.FOOT_TO_INCH;
                    resultUnit = 'pulgadas';
                    break;
                case 'YD_FT': // Yardas a Pies
                    conversionResult = numericInput * CONVERSIONS.YARD_TO_FOOT;
                    resultUnit = 'pies';
                    break;
                case 'MI_FT': // Millas a Pies
                    conversionResult = numericInput * CONVERSIONS.MILE_TO_FOOT;
                    resultUnit = 'pies';
                    break;
                default:
                    conversionResult = 0;
                    resultUnit = '';
            }
        }

        // Formatea el resultado
        setResult(`${conversionResult.toFixed(2)} ${resultUnit}`);
    };

    // Maneja el clic del botón de invertir
    const toggleInversion = () => {
        setIsInverted(!isInverted); // Cambia el estado
        setResult(null); // Limpia el resultado anterior
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    CONVERSOR DE UNIDADES DE JPLY
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder={isInverted ? "Valor a convertir" : "Introduce un valor"}
                    keyboardType="numeric"
                    value={input}
                    onChangeText={(text) => {
                        setInput(text);
                        setResult(null);
                    }}
                />

                {/* Botón para Invertir Unidades */}
                <TouchableOpacity
                    style={styles.invertButton}
                    onPress={toggleInversion}
                >
                    <Text style={styles.invertButtonText}>
                        {isInverted ? 'Invertir (Actual: B → A)' : 'Invertir (Actual: A → B)'}
                    </Text>
                </TouchableOpacity>

                {/* Botones de conversión (texto dinámico) */}
                <TouchableOpacity
                    style={styles.buttonBase}
                    onPress={() => handleConversion('IN_CM')}
                >
                    <Text style={styles.textButton}>
                        {isInverted ? 'CM a Pulgadas' : 'Pulgadas a CM'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonBase}
                    onPress={() => handleConversion('FT_IN')}
                >
                    <Text style={styles.textButton}>
                        {isInverted ? 'Pulgadas a Pies' : 'Pies a Pulgadas'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonBase}
                    onPress={() => handleConversion('YD_FT')}
                >
                    <Text style={styles.textButton}>
                        {isInverted ? 'Pies a Yardas' : 'Yardas a Pies'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonBase}
                    onPress={() => handleConversion('MI_FT')}
                >
                    <Text style={styles.textButton}>
                        {isInverted ? 'Pies a Millas' : 'Millas a Pies'}
                    </Text>
                </TouchableOpacity>

                {/* Resultado */}
                {result && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>{result}</Text>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

// Estilos (añadiendo los del botón de invertir)
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
        marginBottom: 40,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    input: {
        height: 56,
        width: '90%',
        maxWidth: 340,
        borderColor: '#79747E',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 18,
        marginBottom: 16, // Reducido para botón de invertir
        backgroundColor: '#FEF7FF',
        textAlign: 'center'
    },
    invertButton: {
        width: '90%',
        maxWidth: 340,
        borderRadius: 20, // Más pequeño
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EADDFF', // Color lila (resultado)
        borderColor: '#6750A4',
        borderWidth: 1,
    },
    invertButtonText: {
        color: '#1C1B1F',
        fontSize: 14,
        fontWeight: '500',
    },
    buttonBase: {
        width: '90%',
        maxWidth: 340,
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#db0000ff',
        textAlign: 'center'
    },
    textButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    resultContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#EADDFF',
        borderRadius: 8,
        width: '90%',
        maxWidth: 340,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6750A4'
    },
    resultText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1C1B1F',
    }
});