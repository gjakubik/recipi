import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'

export interface FormInputProps extends InputProps {
  label?: string
  placeholder?: string
  name: string
  className?: string
}

export const FormInput = ({
  label,
  placeholder,
  name,
  className,
  ...props
}: FormInputProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}