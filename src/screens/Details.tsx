import { VStack, HStack, useTheme, Text, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from "phosphor-react-native";

import { Header } from "../components/Header";
import { OrderProps } from "../components/Order";
import { OrderFirestoreDTO } from "../DTOs/OrderDTO";
import { dateFormat } from "../utils/FirestoreDateFormat";
import { Loading } from "../components/Loading";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [isLoading, setIsloading] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const route = useRoute();
  const { orderId } = route.params as RouteParams;
  const { colors } = useTheme();

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsloading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimonio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          <Input
            placeholder="Descrição da Solução"
            onChangeText={setSolution}
            h={24}
            textAlignVertical="top"
            multiline
          />
        </CardDetails>
      </ScrollView>

      {order.status === "open" && <Button title="Encerrar solicitação" m={5} />}
    </VStack>
  );
}
