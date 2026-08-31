import { useHead } from '@unhead/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Variables } from '@/domain/theme/entities/variables';
import { labels } from '@/domain/theme/labels';

const SITE_URL = Variables.get('VITE_SITE_URL', 'https://www.grupoformar.com.br');

export function useSeo() {
  const route = useRoute();
  const title = computed(() => String(route.meta.title || labels.BRAND.name));
  const description = computed(() => String(route.meta.description || ''));
  const url = computed(() => `${SITE_URL}${route.fullPath}`);
  const image = computed(() => String(route.meta.image || `${SITE_URL}/og-default.jpg`));

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'canonical', href: url }],
  });
}
