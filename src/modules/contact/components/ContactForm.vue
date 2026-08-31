<script lang="ts" setup>
import Button from '@/shared/components/Button.vue';
import FormField from '@/shared/components/FormField.vue';
import { useContact } from '@/shared/composables/useContact';
import { assuntoOptions } from '@/shared/schemas/contactSchema';

const { form, errors, loading, status, submit } = useContact();

const inputClass
  = 'w-full rounded-md border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted/60 '
    + 'transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30';
</script>

<template>
  <form class="flex flex-col gap-5" novalidate @submit.prevent="submit">
    <div class="grid gap-5 sm:grid-cols-2">
      <FormField id="nome" label="Nome" :error="errors.nome">
        <input
          id="nome"
          v-model="form.nome"
          type="text"
          autocomplete="given-name"
          :class="inputClass"
          :aria-invalid="Boolean(errors.nome)"
          :aria-describedby="errors.nome ? 'nome-error' : undefined"
        >
      </FormField>

      <FormField id="sobrenome" label="Sobrenome" :error="errors.sobrenome">
        <input
          id="sobrenome"
          v-model="form.sobrenome"
          type="text"
          autocomplete="family-name"
          :class="inputClass"
          :aria-invalid="Boolean(errors.sobrenome)"
          :aria-describedby="errors.sobrenome ? 'sobrenome-error' : undefined"
        >
      </FormField>

      <FormField id="email" label="E-mail" :error="errors.email">
        <input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          :class="inputClass"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        >
      </FormField>

      <FormField id="telefone" label="Telefone" :error="errors.telefone">
        <input
          id="telefone"
          v-model="form.telefone"
          type="tel"
          autocomplete="tel"
          :class="inputClass"
          :aria-invalid="Boolean(errors.telefone)"
          :aria-describedby="errors.telefone ? 'telefone-error' : undefined"
        >
      </FormField>
    </div>

    <FormField id="empresa" label="Instituição ou empresa" :error="errors.empresa">
      <input
        id="empresa"
        v-model="form.empresa"
        type="text"
        autocomplete="organization"
        :class="inputClass"
        :aria-invalid="Boolean(errors.empresa)"
        :aria-describedby="errors.empresa ? 'empresa-error' : undefined"
      >
    </FormField>

    <FormField id="assunto" label="Assunto" :error="errors.assunto">
      <select
        id="assunto"
        v-model="form.assunto"
        :class="inputClass"
        :aria-invalid="Boolean(errors.assunto)"
        :aria-describedby="errors.assunto ? 'assunto-error' : undefined"
      >
        <option v-for="option in assuntoOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </FormField>

    <FormField id="mensagem" label="Sobre o projeto" :error="errors.mensagem">
      <textarea
        id="mensagem"
        v-model="form.mensagem"
        rows="5"
        :class="inputClass"
        :aria-invalid="Boolean(errors.mensagem)"
        :aria-describedby="errors.mensagem ? 'mensagem-error' : undefined"
      />
    </FormField>

    <Button type="submit" variant="primary" :disabled="loading" class="w-full">
      <Icon v-if="loading" icon="svg-spinners:ring-resize" class="text-lg" />
      {{ loading ? 'Enviando…' : 'Enviar mensagem' }}
    </Button>

    <p
      v-if="status === 'success'"
      role="status"
      class="rounded-md bg-green-light px-4 py-3 text-sm text-green"
    >
      Mensagem enviada. Nossa equipe responde em até um dia útil.
    </p>
    <p
      v-else-if="status === 'error'"
      role="alert"
      class="rounded-md bg-red-light px-4 py-3 text-sm text-red"
    >
      Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.
    </p>
  </form>
</template>
