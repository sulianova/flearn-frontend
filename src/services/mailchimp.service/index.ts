import Mailchimp from '@mailchimp/mailchimp_transactional';

import { getMailchimpConfig } from './mailchimp.config';

class MailchimpService {
  public async check() {
    const res = await this.client.users.ping();
    console.log(res);
  }

  private client = Mailchimp(getMailchimpConfig().apiKey);
}

export const mailchimpService = new MailchimpService();
