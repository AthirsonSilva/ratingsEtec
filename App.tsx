import { SafeAreaView, Text } from "react-native";
import styles from "./styles";
import React from "react";

// screens
import Restricted from "./screens/Restricted";
import Form from "./screens/Form";

export default class App extends React.Component {
    render() {
        return (
        <SafeAreaView style={styles.container}>
          <Form />
        </SafeAreaView>
        );
    }
}