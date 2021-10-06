import { useKeepAwake } from "expo-keep-awake";

/**
 * Keeps the screen from sleeping. Useful while playing video.
 */
export default function KeepAwakeComponent() {
  useKeepAwake();
  return null;
}
