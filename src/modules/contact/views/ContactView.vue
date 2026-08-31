<script lang="ts" setup>
import { config } from '@/domain/theme/config';
import Eyebrow from '@/shared/components/Eyebrow.vue';
import Section from '@/shared/components/Section.vue';
import ContactForm from '../components/ContactForm.vue';

const channels = [
  { icon: 'material-symbols:mail-outline-rounded', label: 'E-mail', value: config.contact.email, href: `mailto:${config.contact.email}` },
  { icon: 'material-symbols:call-outline', label: 'Telefone', value: config.contact.phone, href: `tel:${config.contact.phone.replace(/\D/g, '')}` },
  { icon: 'mdi:whatsapp', label: 'WhatsApp', value: config.contact.whatsapp, href: config.contact.whatsappLink },
];
</script>

<template>
  <Section>
    <div class="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
      <div class="flex flex-col gap-6">
        <Eyebrow>Vamos conversar</Eyebrow>
        <h1 class="text-3xl font-bold text-text md:text-4xl lg:text-[44px] lg:leading-[1.1]">
          Conte seu projeto — nós cuidamos do resto.
        </h1>
        <p class="max-w-[52ch] text-lg text-text-muted">
          Da avaliação do original à entrega dos exemplares, nossa equipe monta a solução
          editorial, gráfica e logística sob medida.
        </p>

        <ul class="mt-2 flex flex-col gap-1">
          <li v-for="channel in channels" :key="channel.label">
            <a
              :href="channel.href"
              class="group flex items-center gap-4 border-b border-border py-4 transition-colors hover:border-cyan"
            >
              <Icon :icon="channel.icon" class="text-xl text-blue" />
              <span class="flex flex-col">
                <span class="font-display text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
                  {{ channel.label }}
                </span>
                <span class="text-text transition-colors group-hover:text-blue">
                  {{ channel.value }}
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div class="overflow-hidden rounded-xl border border-border bg-surface shadow-03">
        <span aria-hidden="true" class="block h-[3px] w-full brand-rule" />
        <div class="p-7 md:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  </Section>
</template>
