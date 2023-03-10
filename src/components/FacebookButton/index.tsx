import FacebookIcon from "../../assets/icons/facebook.svg";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import { StyleSheet, TouchableOpacity } from "react-native";
import env from "../../tokens";
import { SocialButtonProps } from "../../models/types";

WebBrowser.maybeCompleteAuthSession();

export default function FacebookButton({
  onSuccess,
  onFailure,
}: SocialButtonProps) {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: env.FACEBOOK_CLIENT_ID,
    responseType: ResponseType.Token,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication, error } = response;

      if (error) {
        if (onFailure) onFailure(error);
        return;
      }
      onSuccess({
        token: authentication?.accessToken,
      });
    }
  }, [response]);

  return (
    <TouchableOpacity
      disabled={!request}
      onPress={() => {
        promptAsync({ showInRecents: true, showTitle: true });
      }}
      style={styles.signupOptionsButton}
    >
      <FacebookIcon height={30} width={30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 1,
  },
  signupOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  signupOptionsButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  text: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  signupButton: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});
