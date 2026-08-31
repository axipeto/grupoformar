import type { ContactForm } from '@/shared/schemas/contactSchema';
import { reactive, ref } from 'vue';
import { contactSchema } from '@/shared/schemas/contactSchema';
import { contactApi } from '@/shared/services/contactApi';

export type ContactStatus = 'idle' | 'success' | 'error';

function emptyForm(): ContactForm {
  return {
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: 'editorial',
    mensagem: '',
  };
}

export function useContact() {
  const loading = ref(false);
  const status = ref<ContactStatus>('idle');
  const errors = reactive<Record<string, string>>({});
  const form = reactive<ContactForm>(emptyForm());

  function reset() {
    Object.assign(form, emptyForm());
  }

  async function submit() {
    Object.keys(errors).forEach(k => delete errors[k]);
    status.value = 'idle';

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      for (const [field, msgs] of Object.entries(result.error.flatten().fieldErrors))
        errors[field] = msgs?.[0] ?? '';
      return;
    }

    loading.value = true;
    try {
      // TODO: sem backend definido — plugar endpoint quando existir (VITE_CONTACT_API_ROUTE)
      await contactApi.send(result.data);
      status.value = 'success';
      reset();
    }
    catch {
      status.value = 'error';
    }
    finally {
      loading.value = false;
    }
  }

  return { form, errors, loading, status, submit, reset };
}
