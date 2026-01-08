import { useState } from "react"

export const useImagePreview = (defaultValue?: string) => {
  const [preview, setPreview] = useState<string|null>(defaultValue ? defaultValue : null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setPreview(null)
    }
  }

  const reset = () => setPreview(null);

  return { preview, handleImageChange, reset }
}