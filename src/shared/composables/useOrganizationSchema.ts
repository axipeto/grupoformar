import { useHead } from '@unhead/vue';
import { Variables } from '@/domain/theme/entities/variables';
import { config } from '@/domain/theme/config';
import { labels } from '@/domain/theme/labels';

const SITE_URL = Variables.get('VITE_SITE_URL', 'https://www.grupoformar.com.br');

export function useOrganizationSchema() {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        // `innerHTML` (não `children`) é a propriedade do @unhead/vue v2 para conteúdo inline.
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': labels.BRAND.name,
          'url': SITE_URL,
          'logo': `${SITE_URL}/android-chrome-512x512.png`,
          'description': labels.BRAND.description,
          'email': config.contact.email,
          'telephone': config.contact.phone,
          'subOrganization': [
            { '@type': 'Organization', 'name': labels.UNITS.editora },
            { '@type': 'Organization', 'name': labels.UNITS.mar },
            { '@type': 'Organization', 'name': labels.UNITS.carvalho },
          ],
        }),
      },
    ],
  });
}
