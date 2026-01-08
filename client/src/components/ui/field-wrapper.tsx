import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"

export const FieldWrapper = ({children, label, description}: {
  children: React.ReactNode,
  label?: string,
  description?: string
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {children}
      </FormControl>
      <FormDescription>
        {description}
      </FormDescription>
      <FormMessage />
    </FormItem>
  )
}