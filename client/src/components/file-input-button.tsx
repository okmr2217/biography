import { Button } from "@/components/ui/button"
import { Image } from "lucide-react"

export const FileInputButton = ({inputRef}: {
  inputRef: React.MutableRefObject<HTMLInputElement | null | undefined>
}) => {
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <Button type="button" variant="secondary" onClick={handleClick}>
      <Image />
    </Button>
  )
}