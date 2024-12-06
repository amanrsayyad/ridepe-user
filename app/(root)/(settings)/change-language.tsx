import { PageTitleStyles, UtilsStyles } from "@/styles/CustomeStyles";
import { View, Text } from "react-native";

const ChangeLanguage = () => {
  return (
    <View style={[UtilsStyles.bg, UtilsStyles.pagePadding, { flex: 1 }]}>
      <Text style={PageTitleStyles.title}>Change Language</Text>
    </View>
  );
};

export default ChangeLanguage;
