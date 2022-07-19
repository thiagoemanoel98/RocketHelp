import { useState } from "react";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center
} from "native-base";
import { SignOut } from "phosphor-react-native";
import { ChatTeardropText } from "phosphor-react-native";

import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Order, OrderProps } from "../components/Order";

export function Home() {
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "123",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "1234",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "closed",
    },
    {
      id: "125",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "126",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "1260",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "1236",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "closed",
    },
    {
      id: "12622",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
    {
      id: "1226",
      patrimony: "123456",
      when: "18/07/2022 às 10:00",
      status: "open",
    },
  ]);

  const { colors } = useTheme();
  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={6}
        px={6}
      >
        <Logo />
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">0</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type="closed"
            title="Finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Order data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color = "gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui{'\n'}
                solicitações {statusSelected === 'open'? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title="Nova solicitação" />
      </VStack>
    </VStack>
  );
}
