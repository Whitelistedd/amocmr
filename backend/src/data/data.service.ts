import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createAmocrmInstance } from 'src/libs/axios';
import { leadType } from 'src/types/leads';
import { userType } from 'src/types/users';

@Injectable()
export class DataService {
  constructor(private readonly configService: ConfigService) {}

  async getData(): Promise<any> {
    let data = [];
    const statuses = new Map<number, string>();
    try {
      // получить все сделки
      const leads = await this.getLeads();

      // получить все статусы
      await this.getStatuses(leads[0].pipeline_id).then((statusesRes) =>
        statusesRes.map((status) => statuses.set(status.id, status.name)),
      );

      // добавление responsible_user и status в каждую сделку
      data = await Promise.all(
        leads.map(async (lead: leadType) => ({
          ...lead,
          key: lead.id,
          custom: {
            responsible_user: (await this.getUser(lead.responsible_user_id))
              .name,
            status: statuses.get(lead.status_id),
            contacts: await Promise.all(
              lead._embedded.contacts.map(async (contact) => {
                const contact2 = await this.getContact(contact.id);
                return contact2;
              }),
            ),
          },
        })),
      );

      return data;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  }
  async getContact(id: number): Promise<leadType[]> {
    const contact = await createAmocrmInstance(
      this.configService.get('amocrmApiUrl'),
      this.configService.get('token'),
    )
      .get(`/contacts/${id}`)
      .then((res) => res.data);
    return contact;
  }
  async getStatuses(pipeline_id): Promise<leadType[]> {
    const statuses = await createAmocrmInstance(
      this.configService.get('amocrmApiUrl'),
      this.configService.get('token'),
    )
      .get(`/leads/pipelines/${pipeline_id}/statuses?page=1&limit=250`)
      .then((res) => res.data);
    return statuses._embedded.statuses;
  }
  async getUser(id: number): Promise<userType> {
    const user = await createAmocrmInstance(
      this.configService.get('amocrmApiUrl'),
      this.configService.get('token'),
    )
      .get(`/users/${id}`)
      .then((res) => res.data);
    return user;
  }
  async getLeads(): Promise<leadType[]> {
    const leads = await createAmocrmInstance(
      this.configService.get('amocrmApiUrl'),
      this.configService.get('token'),
    )
      .get(`/leads?page=1&limit=250&with=contacts,catalog_elements`)
      .then((res) => res.data);
    return leads._embedded.leads;
  }
}
