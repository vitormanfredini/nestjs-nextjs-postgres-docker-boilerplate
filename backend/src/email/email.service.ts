import { Injectable, Logger } from '@nestjs/common';
import getNewUserTemplate from './templates/newuser';
import getDefaultTemplate from './templates/default';
import { EmailPayload, EmailPayloadDefault, EmailPayloadNewUser } from './email.types';

type TemplateRegistry = {
  newuser: (payload: EmailPayloadNewUser) => string;
  default: (payload: EmailPayloadDefault) => string;
};

const templateRegistry: TemplateRegistry = {
  newuser: getNewUserTemplate,
  default: getDefaultTemplate
};

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor() {}

  async send(payload: EmailPayloadNewUser): Promise<void>;
  async send(payload: EmailPayloadDefault): Promise<void>;

  async send(payload: EmailPayload): Promise<void> {
    
    const renderedTemplate = templateRegistry[payload.template](payload as any);
    this.logger.debug("Email sent:");
    this.logger.debug(renderedTemplate);

  }

}