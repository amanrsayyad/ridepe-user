import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactNativeModal } from "react-native-modal";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import { ModalStyles, AuthStyles } from "@/styles/CustomeStyles";
import { selectApiBaseUrl } from "@/store/reducers/apiSlice";
import { registerUser } from "@/lib/fetch";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const baseUrl = useSelector(selectApiBaseUrl);

  const onSignUpPress = async () => {
    if (!form.name || form.name.trim() === "") {
      Alert.alert("Validation Error", "Name cannot be empty.");
      return;
    }

    if (!form.phone || form.phone.length !== 10 || !/^\d+$/.test(form.phone)) {
      Alert.alert(
        "Validation Error",
        "Phone number must be exactly 10 digits."
      );
      return;
    }

    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        await registerUser(baseUrl, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          clerkUserId: completeSignUp.createdUserId || "",
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView style={AuthStyles.authContainer}>
      <View style={AuthStyles.authContainer}>
        <View style={AuthStyles.imageContainer}>
          <Image source={images.signUpCar} style={AuthStyles.imageAuth} />
          <Text style={AuthStyles.authHeading}>Create an account</Text>
        </View>
        <View style={AuthStyles.formPadding}>
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Phone No"
            placeholder="Enter phone number"
            icon={icons.phone}
            keyboardType="numeric"
            value={form.phone}
            onChangeText={(value) => setForm({ ...form, phone: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton title="Sign Up" onPress={onSignUpPress} />
          <OAuth />
          <Link href="/sign-in" style={AuthStyles.link}>
            Already have an account?
            <Text style={AuthStyles.linkText}>Log In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View style={ModalStyles.modalContainer}>
            <Text style={ModalStyles.verificationText}>Verification</Text>
            <Text style={ModalStyles.emailText}>
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text style={ModalStyles.modalError}>{verification.error}</Text>
            )}
            <CustomButton title="Verify Email" onPress={onPressVerify} />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View style={[ModalStyles.modalContainer]}>
            <Image source={images.check} style={ModalStyles.imageCheck} />
            <Text
              style={[ModalStyles.verificationText, ModalStyles.textCenter]}
            >
              Verified!
            </Text>
            <Text style={[ModalStyles.successText, ModalStyles.textCenter]}>
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
