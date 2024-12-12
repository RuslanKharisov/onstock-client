'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RegisterSchema } from '@/entities/user/_domain/schemas';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { FormEroor } from '@/shared/ui/form-error';
import { FormSuccess } from '@/shared/ui/form-success';
import { useState } from 'react';
import { useRegisterUser } from '@/features/user/_auth-hooks/useRegister';

export function EmailRegisterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema ),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      type: 'credential',
    },
  });

  const { mutate, isPending } = useRegisterUser();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    mutate(values, {
      onSuccess: (data) => {
        setSuccess(data);
      },
      onError: (error: any) => {
        setError(error || 'Произошла ошибка');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ваше Имя"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="email"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormEroor message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Spinner
                className="mr-2 h-4 w-full "
                aria-label="Загрузка выхода"
              />
            )}
            Продолжить
          </Button>
        </div>
      </form>
    </Form>
  );
}
