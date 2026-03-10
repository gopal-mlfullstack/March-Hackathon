import { Stack, Redirect } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../src/store/authStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // Add real fonts later if you want
  });

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (loaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 1500);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Simple auth guard: redirect unauthenticated users to onboarding
  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        {/* (auth) is handled by redirect above */}
      </Stack>
    </>
  );
}
