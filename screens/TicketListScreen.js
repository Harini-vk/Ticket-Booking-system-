

import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Text, Card, Button, ActivityIndicator } from "react-native-paper";
import { db, auth } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const statusOrder = ["Open", "In Progress", "Closed"];

export default function TicketListScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");

  // Fetch current user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!auth.currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user role");
      }
    };

    fetchUserRole();

    // Real-time listener for tickets
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ticketsData = [];
      querySnapshot.forEach((doc) => {
        ticketsData.push({ id: doc.id, ...doc.data() });
      });
      setTickets(ticketsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigation.replace("Login");
  };

  const handleStatusUpdate = async (ticket) => {
    if (userRole !== "admin") {
      Alert.alert("Unauthorized", "Only admin can update ticket status");
      return;
    }

    const currentIndex = statusOrder.indexOf(ticket.status);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
      Alert.alert("Status Update", "Ticket is already closed or invalid");
      return;
    }

    const newStatus = statusOrder[currentIndex + 1];
    try {
      await updateDoc(doc(db, "tickets", ticket.id), { status: newStatus });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AddTicket")}
        style={styles.button}
      >
        Add Ticket
      </Button>
      <Button mode="outlined" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} subtitle={`Status: ${item.status}`} />
            <Card.Content>
              <Text>{item.description}</Text>
            </Card.Content>
            {userRole === "admin" && item.status !== "Closed" && (
              <Card.Actions>
                <Button onPress={() => handleStatusUpdate(item)}>Update Status</Button>
              </Card.Actions>
            )}
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  button: { marginVertical: 5 },
  card: { marginVertical: 5 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
