export type ChatbotUseCase = {
  id: string;
  label: string;
};

export type ChatbotMessage = {
  id: string;
  content: string;
  tone: "assistant" | "assistant-highlight" | "user";
};

export type ChatbotQuickReply = {
  id: string;
  label: string;
  variant: "primary" | "secondary";
};

export type ChatbotSuggestedProduct = {
  image: string;
  name: string;
  description: string;
};

export type ChatbotWidgetContent = {
  breadcrumb: string[];
  title: string;
  description: string;
  useCasesTitle: string;
  useCases: ChatbotUseCase[];
  previewLabel: string;
  previewHint: string;
  widgetTitle: string;
  widgetStatus: string;
  messages: ChatbotMessage[];
  quickReplies: ChatbotQuickReply[];
  suggestedProduct: ChatbotSuggestedProduct;
};
