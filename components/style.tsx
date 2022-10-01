import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#efefef',
      height: 50,
      zIndex: 1,
    },
    buttonText: {
      flex: 1,
      textAlign: 'center',
    },
    icon: {
      marginRight: 10,
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: '#fff',
      width: '100%',
      shadowColor: '#000000',
      shadowRadius: 4,
      shadowOffset: { height: 4, width: 0 },
      shadowOpacity: 0.5,
    },
    overlay: {
      width: '100%',
      height: '100%',
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
    },  
});

export default styles;
