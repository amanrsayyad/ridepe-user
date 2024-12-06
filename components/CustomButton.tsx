import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { ButtonProps } from "@/types/type";

const CustomButton = ({
  onPress,
  title,
  IconLeft,
  IconRight,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer} {...props}>
      {IconLeft && <IconLeft />}
      <Text style={styles.textBtn}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    borderRadius: 25,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.1)",
    color: "#fff",
    backgroundColor: "#0286FF",
    marginBottom: 25,
    paddingVertical: 13,
    marginTop: 15,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Jakarta-Bold",
  },
});
