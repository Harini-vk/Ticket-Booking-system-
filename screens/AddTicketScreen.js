import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTicketScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTicket = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "tickets"), {
        title,
        description,
        status: "Open",
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });
      Alert.alert("Success", "Ticket created");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput label="Description" value={description} onChangeText={setDescription} style={styles.input} multiline />
      <Button mode="contained" onPress={handleAddTicket} style={styles.button}>
        Create Ticket
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
});












// import React, { useState } from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import { TextInput, Button } from "react-native-paper";
// import { db, auth } from "../firebaseConfig";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// export default function AddTicketScreen({ navigation }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleAddTicket = async () => {
//     if (!title || !description) {
//       Alert.alert("Validation", "Please fill all fields");
//       return;
//     }
//     try {
//       await addDoc(collection(db, "tickets"), {
//         title,
//         description,
//         status: "Open",
//         createdAt: serverTimestamp(),
//         createdBy: auth.currentUser .uid,
//       });
//       Alert.alert("Success", "Ticket created");
//       navigation.goBack();
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} />
//       <TextInput
//         label="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//         numberOfLines={4}
//         style={styles.input}
//       />
//       <Button mode="contained" onPress={handleAddTicket}>
//         Create Ticket
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   input: { marginBottom: 10 },
// });