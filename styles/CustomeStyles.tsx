import { StyleSheet } from "react-native";

export const ModalStyles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    minHeight: 300,
  },
  verificationText: {
    fontFamily: "Jakarta-ExtraBold",
    fontSize: 27,
    marginBottom: 2,
    color: "#333333",
  },
  emailText: {
    fontFamily: "Jakarta-Regular",
    marginBottom: 5,
  },
  modalError: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  imageCheck: {
    width: 110,
    height: 110,
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  successText: {
    color: "#858585",
    marginBottom: 5,
    fontSize: 19,
  },
});

export const UtilsStyles = StyleSheet.create({
  bg: {
    backgroundColor: "#F6F8FA",
  },
  jBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fRow: {
    flexDirection: "row",
  },
  my5: {
    marginVertical: 15,
  },
  pagePadding: {
    paddingHorizontal: 15,
  },
});

export const GoogleTextInputStyles = StyleSheet.create({
  googleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  findRideInputBg: {
    backgroundColor: "#F6F8FA",
  },
  homeGoogleBg: {
    backgroundColor: "#fff",
  },
  iconView: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export const RideLayoutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rideContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  mapContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    backgroundColor: "#2F80ED",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    zIndex: 100,
    top: 25,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 35,
    height: 35,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 20,
    marginLeft: 10,
    marginTop: -5,
  },
});

export const PageTitleStyles = StyleSheet.create({
  title: {
    fontFamily: "Jakarta-SemiBold",
    textAlign: "center",
    fontSize: 19,
    marginVertical: 15,
    marginBottom: 20,
  },
});

export const ServicesListStyles = StyleSheet.create({
  serviceListContainer: {
    flexDirection: "row",
    marginTop: 15,
    gap: 12,
  },
  iconContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F6F8FA",
  },
  activeIconContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#0286FF",
    backgroundColor: "#fff",
  },
  homeIconContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: "#0286FF",
    backgroundColor: "#fff",
  },
  icon: {
    width: 105,
    height: 30,
  },
  autoIcon: {
    width: 50,
    height: 50,
  },
  serviceTitle: {
    fontSize: 13,
    fontFamily: "Jakarta-SemiBold",
    color: "#858585",
    marginTop: 4,
    marginLeft: 9,
  },
  activeTitle: {
    fontSize: 13,
    fontFamily: "Jakarta-SemiBold",
    marginTop: 4,
    marginLeft: 9,
    color: "#333333",
  },
});

export const AuthStyles = StyleSheet.create({
  formPadding: {
    padding: 18,
  },
  authContainer: {
    display: "flex",
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 220,
  },
  imageAuth: {
    zIndex: 0,
    width: "100%",
    height: 220,
  },
  authHeading: {
    fontSize: 24,
    color: "#000",
    fontFamily: "Jakarta-SemiBold",
    position: "absolute",
    bottom: -5,
    left: 20,
  },
  link: {
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
    textAlign: "center",
    marginTop: 5,
    color: "#808080",
  },
  linkText: {
    color: "#0286FF",
    paddingLeft: 5,
  },
});
