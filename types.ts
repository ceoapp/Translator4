export interface TranslationHistoryItem {
  id: string;
  source: string;
  target: string;
  timestamp: number;
}

export interface TranslationState {
  inputText: string;
  translatedText: string;
  isLoading: boolean;
  error: string | null;
}