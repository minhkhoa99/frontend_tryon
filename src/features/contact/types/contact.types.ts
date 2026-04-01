export type ContactInfoItem = {
  id: string;
  label: string;
};

export type ContactSocial = {
  id: string;
  label: string;
};

export type ContactContent = {
  breadcrumb: string[];
  title: string;
  description: string;
  infoTitle: string;
  infoItems: ContactInfoItem[];
  responseTime: string;
  socials: ContactSocial[];
  formTitle: string;
  submitLabel: string;
  replyHint: string;
  defaults: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
};
