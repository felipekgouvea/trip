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
import { useRouter } from 'next/navigation'

interface TripReservationProps {
  tripId: string
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
  pricePerDay: number
}

const formSchema = z.object({
  startDate: z.date({
    required_error: 'A data de inicío é obrigatória.',
  }),
  endDate: z.date({
    required_error: 'A data final é obrigatória.',
  }),
  guests: z.coerce.number({
    required_error: 'O número de hospedes é obrigatório',
  }),
})

type FormSchema = z.infer<typeof formSchema>

const TripReservation = ({
  tripId,
  maxGuests,
  tripStartDate,
  tripEndDate,
  pricePerDay,
}: TripReservationProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 0,
    },
  })

  const router = useRouter()

  const onSubmit = async (data: FormSchema) => {
    const response = await fetch('/api/trips/check', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        }),
      ),
    })

    const res = await response.json()

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      form.setError('startDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      })

      return form.setError('endDate', {
        type: 'manual',
        message: 'Esta data já está reservada.',
      })
    }

    if (res?.error?.code === 'INVALID_START_DATE') {
      return form.setError('startDate', {
        type: 'manual',
        message: 'Data inválida.',
      })
    }

    if (res?.error?.code === 'INVALID_END_DATE') {
      return form.setError('endDate', {
        type: 'manual',
        message: 'Data inválida.',
      })
    }

    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`,
    )
  }

  const startDate = form.watch('startDate')
  const endDate = form.watch('endDate')

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
                              toDate={tripEndDate}
                              fromDate={tripStartDate}
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
                              toDate={tripEndDate}
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
                      <Input
                        type="number"
                        max={maxGuests}
                        placeholder="Hóspedes"
                        {...field}
                      />
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
                    ? `R$${differenceInDays(endDate, startDate) * Number(pricePerDay)}`
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
