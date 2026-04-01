export type AuthSocialProvider = {
  id: string;
  label: string;
  icon: string;
};

export type AuthTab = {
  id: "login" | "register" | "forgot";
  label: string;
  href: string;
};

export type AuthShellContent = {
  title: string;
  subtitle: string;
  socialIntro?: string;
  providers?: AuthSocialProvider[];
  tabs: AuthTab[];
};

export type LoginContent = AuthShellContent & {
  submitLabel: string;
  forgotLabel: string;
  promptLabel: string;
  promptAction: string;
};

export type RegisterContent = AuthShellContent & {
  submitLabel: string;
  termsLabel: string;
  promptLabel: string;
  promptAction: string;
  passwordStrengthLabel: string;
};

export type ForgotPasswordContent = AuthShellContent & {
  submitLabel: string;
  promptLabel: string;
  promptAction: string;
};
