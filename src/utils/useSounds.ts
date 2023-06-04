import { useRef, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

type SoundType = "pop" | "pop2" | "win" | "loss" | "end";

export default function useSounds(): (sound: SoundType) => void {
  const popSoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);
  const winSoundRef = useRef<Audio.Sound | null>(null);
  const lossSoundRef = useRef<Audio.Sound | null>(null);
  const endSoundRef = useRef<Audio.Sound | null>(null);

  const playSound = async (sound: SoundType): Promise<void> => {
    const soundsMap = {
      pop: popSoundRef,
      pop2: pop2SoundRef,
      win: winSoundRef,
      loss: lossSoundRef,
      end: endSoundRef,
    };
    try {
      const status = await soundsMap[sound].current?.getStatusAsync(); //fix error while loading sounds during play game
      status && status.isLoaded && soundsMap[sound].current?.replayAsync(); // check status not Null && loaded && playing
      switch (sound) {
        case "pop":
        case "pop2":
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;

        case "win":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;

        case "loss":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;

        case "end":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Load sound
    /* eslint-disable @typescript-eslint/no-var-requires */
    const popSoundObject = new Audio.Sound();
    const pop2SoundObject = new Audio.Sound();
    const winSoundObject = new Audio.Sound();
    const lossSoundObject = new Audio.Sound();
    const endSoundObject = new Audio.Sound();

    const loadSounds = async () => {
      try {
        await popSoundObject.loadAsync(require("@assets/pop.wav"));
        popSoundRef.current = popSoundObject;

        await pop2SoundObject.loadAsync(require("@assets/pop2.mp3"));
        pop2SoundRef.current = pop2SoundObject;

        await winSoundObject.loadAsync(require("@assets/win.wav"));
        winSoundRef.current = winSoundObject;

        await lossSoundObject.loadAsync(require("@assets/loss.mp3"));
        lossSoundRef.current = lossSoundObject;

        await endSoundObject.loadAsync(require("@assets/end.mp3"));
        endSoundRef.current = endSoundObject;
      } catch (error) {
        console.error("Error loading sound:", error); // Log error message
      }
    };
    loadSounds();

    return () => {
      // Unload sound
      popSoundObject?.unloadAsync();
      pop2SoundObject?.unloadAsync();
      winSoundObject?.unloadAsync();
      lossSoundObject?.unloadAsync();
      endSoundObject?.unloadAsync();
    };
  }, []);

  return playSound;
}
