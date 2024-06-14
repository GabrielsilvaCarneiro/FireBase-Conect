import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { bancoExterno } from './connection';
import { useState } from 'react';
import { doc, setDoc} from 'firebase/firestore';

export default function App() {
  const [produto, setProduto] = useState('');
  const [marca, setMarca] = useState('');

  async function enviarProduto() {
    if (produto.trim() === '' || marca.trim() === '') {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Adiciona o produto à coleção "marcas" com o nome da marca como ID do documento
      const produtoData = {};
      produtoData[produto] = true; // Define o nome do produto como chave e true como valor

      await setDoc(doc(bancoExterno, 'marcas', marca), produtoData, { merge: true }); // Opção merge para mesclar com dados existentes, se houver
      alert('Produto enviado com sucesso!');
      setProduto('');
      setMarca('');
    } catch (error) {
      console.error('Erro ao enviar produto:', error);
      alert('Erro ao enviar produto. Por favor, tente novamente mais tarde.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Marca:</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
        placeholder="Digite o nome da marca"
      />
      <Text style={styles.label}>Produto:</Text>
      <TextInput
        style={styles.input}
        value={produto}
        onChangeText={setProduto}
        placeholder="Digite o nome do produto"
      />
      <TouchableOpacity style={styles.button} onPress={enviarProduto}>
        <Text style={styles.buttonText}>Enviar Produto</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
