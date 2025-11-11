
export enum Page {
  Home,
  Report,
  Chat,
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
