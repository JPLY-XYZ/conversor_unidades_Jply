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
    OUNCE_TO_GRAM: 28.3495,
    POUND_TO_OUNCE: 16,
};

export default function MasaPeso() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [isInverted, setIsInverted] = useState(false); // Estado para invertir

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
                case 'OZ_G': // Gramos a Onzas
                    conversionResult = numericInput / CONVERSIONS.OUNCE_TO_GRAM;
                    resultUnit = 'onzas';
                    break;
                case 'LB_OZ': // Onzas a Libras
                    conversionResult = numericInput / CONVERSIONS.POUND_TO_OUNCE;
                    resultUnit = 'libras';
                    break;
                default:
                    conversionResult = 0;
                    resultUnit = '';
            }
        } else {
            // Lógica de conversión normal
            switch (type) {
                case 'OZ_G': // Onzas a Gramos
                    conversionResult = numericInput * CONVERSIONS.OUNCE_TO_GRAM;
                    resultUnit = 'gramos';
                    break;
                case 'LB_OZ': // Libras a Onzas
                    conversionResult = numericInput * CONVERSIONS.POUND_TO_OUNCE;
                    resultUnit = 'onzas';
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
        setIsInverted(!isInverted);
        setResult(null);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Conversor de Masa y Peso
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
                    onPress={() => handleConversion('OZ_G')}
                >
                    <Text style={styles.textButton}>
                        {isInverted ? 'Gramos a Onzas' : 'Onzas a Gramos'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonBase}
                    onPress={() => handleConversion('LB_OZ')}
                >
                    <Text style={styles.textButton}>
                        {isInverted ? 'Onzas a Libras' : 'Libras a Onzas'}
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

// Estilos (son los mismos que el componente anterior)
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
        marginBottom: 16,
        backgroundColor: '#FEF7FF',
        textAlign: 'center'
    },
    invertButton: {
        width: '90%',
        maxWidth: 340,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EADDFF',
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