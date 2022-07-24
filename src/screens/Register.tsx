import { useState } from "react";
import { Text, VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Alert } from "react-native";

export function Register() {
  const [isLoading, setIsloading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsloading(true);
    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        onCreated_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possível registrar o pedido"
        );
      });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número da solicitação"
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
}
