import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push("/(auth)/sign-up");
        }}
        style={styles.skipBtn}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.sliderDot} />}
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.sliderContainer}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={styles.sliderImage}
            />
            <View style={[styles.titleContainer]}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  skipBtn: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 15,
  },
  skipText: {
    color: "#000",
    fontWeight: "bold",
    fontFamily: "Jakarta-Bold",
  },
  sliderDot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
  },
  activeDot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    backgroundColor: "#0286FF",
    borderRadius: 10,
  },
  sliderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingTop: 70,
  },
  sliderImage: {
    width: "100%",
    height: 300,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  desc: {
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
    textAlign: "center",
    color: "#858585",
    marginHorizontal: 15,
    marginTop: 10,
  },
});
