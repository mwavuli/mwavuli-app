import './global.css';
// One import per face, not the package root: the root names every weight and italic, and Metro would
// bundle all of them.
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat/600SemiBold';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat/700Bold';
import type { Persona } from '@mwavuli/personas';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Frame } from './src/Frame';
import { PersonaHost } from './src/PersonaHost';
import { Picker } from './src/Picker';

export default function App() {
  // One persona at a time: choosing one mounts its portal, and going back unmounts it.
  const [persona, setPersona] = useState<Persona | null>(null);
  const [fontsReady, fontError] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsReady && !fontError) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Frame onSwitch={persona ? () => setPersona(null) : undefined}>
        {persona ? <PersonaHost persona={persona} /> : <Picker onPick={setPersona} />}
      </Frame>
    </SafeAreaProvider>
  );
}
