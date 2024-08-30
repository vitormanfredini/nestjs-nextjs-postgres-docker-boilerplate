type BaseEmailPayload = {
  template: string;
  data: {
    email: string;
    name: string;
    subject: string;
    message: string;
  };
};

export type EmailPayloadDefault = BaseEmailPayload & {
  template: 'default';
};

export type EmailPayloadNewUser = BaseEmailPayload & {
  template: 'newuser';
  data: BaseEmailPayload['data'] & {
    username: string;
  };
};

export type EmailPayload = 
  | EmailPayloadDefault 
  | EmailPayloadNewUser;