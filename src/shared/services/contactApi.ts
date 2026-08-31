import { Variables } from '@/domain/theme/entities/variables';
import { createApiClient } from '@/networking/client';

const client = createApiClient(Variables.get('VITE_CONTACT_API_ROUTE', ''));

export const contactApi = {
  send(payload: unknown) {
    return client.post('/contact', payload);
  },
};
