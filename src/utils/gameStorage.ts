import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameRecord } from "../Types";

const GAME_RECORDS_KEY = "game_records";

export const saveGameRecord = async (record: GameRecord): Promise<void> => {
  const existing = await loadGameRecords();
  await AsyncStorage.setItem(GAME_RECORDS_KEY, JSON.stringify([...existing, record]));
};

export const loadGameRecords = async (): Promise<GameRecord[]> => {
  const data = await AsyncStorage.getItem(GAME_RECORDS_KEY);
  if (data === null) {
    return [];
  }
  return JSON.parse(data) as GameRecord[];
};
