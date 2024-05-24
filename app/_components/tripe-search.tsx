'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

const formSchema = z.object({
  trip: z.string().min(2).max(50),
  date: z.string(),
  budget: z.string(),
})

interface TripeSearchProps {
  defaultValues?: z.infer<typeof formSchema>
}

type FormSchema = z.infer<typeof formSchema>

const TripeSearch = ({ defaultValues }: TripeSearchProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleSubmint = (data: FormSchema) => {
    console.log(data)
  }

  return (
    <div className="bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="px-5 py-5 text-center text-xl font-bold text-secondary">
        Encontre sua próxima{' '}
        <span className="font-bold text-primary">viagem!</span>
      </h1>

      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4 px-5"
          onSubmit={form.handleSubmit(handleSubmint)}
        >
          <div>
            <FormField
              control={form.control}
              name="trip"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Onde você quer ir?" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Primeira data" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Orçamento?" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="default"
            type="submit"
            className="px-2 py-2 text-sm font-normal text-white"
          >
            Pesquisar
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default TripeSearch
