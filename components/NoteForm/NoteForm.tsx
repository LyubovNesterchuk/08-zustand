'use client';

import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import styles from './NoteForm.module.css';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import { NewNote } from '@/types/note';

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const fieldId = useId();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Note created!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft(); 
      router.push('/notes/filter/all');
    },
    onError: () => toast.error('Failed to create note'),
  });

  const handleSubmit = (formData: FormData) => {
    const values: NewNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };

  mutate(values);
};

   const handleCancel = () => {
    router.back();
  };

  return (
    <form className={styles.form} action={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          defaultValue={draft?.content}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" disabled={isPending} className={styles.submitButton}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};
