'use client'

import { Button } from '@/app/_components/ui/button'
import { Calendar } from '@/app/_components/ui/calendar'
import { differenceInDays, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Input } from '@/app/_components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover'
import { Separator } from '@/app/_components/ui/separator'

import { cn } from '@/app/_lib/utils'
import { Trip } from '@prisma/client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/app/_components/ui/form'

const formSchema = z.object({
  startDate: z.date({
    required_error: 'A data de inicío é obrigatória.',
  }),
  endDate: z.date({
    required_error: 'A data final é obrigatória.',
  }),
  guests: z.string({
    required_error: 'O número de hospedes é obrigatório',
  }),
})

interface TripReservationProps {
  trip: Trip
}

type FormSchema = z.infer<typeof formSchema>

const TripReservation = ({ trip }: TripReservationProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const startDate = form.watch('startDate')
  const endDate = form.watch('endDate')

  const handleSubmint = (data: FormSchema) => {
    console.log(data)
    console.log(trip.endDate)
  }

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmint)}
              className="w-full space-y-3"
            >
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full items-start justify-start border border-muted-foreground pl-3 font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'dd/MM/yyyy')
                                ) : (
                                  <span>Data de início</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              toDate={trip.endDate}
                              fromDate={trip.startDate}
                              locale={ptBR}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full items-start justify-start border border-muted-foreground pl-3 font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'dd/MM/yyyy')
                                ) : (
                                  <span>Data final</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              locale={ptBR}
                              fromDate={startDate}
                              toDate={trip.endDate}
                              disabled={!startDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem className="w-full rounded-md border border-muted-foreground">
                    <FormControl>
                      <Input placeholder="Hóspedes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-DARK">
                  Total (7 noites)
                </span>
                <span className="text-sm font-medium text-primary-DARK">
                  {startDate && endDate
                    ? `R$${differenceInDays(endDate, startDate) * Number(trip.pricePerDay)}`
                    : 'R$0'}
                </span>
              </div>

              <Button type="submit" className="mb-10 w-full text-white">
                Reservar agora
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Separator className="mb-10 bg-primary-GRAY opacity-50" />
    </div>
  )
}

export default TripReservation
