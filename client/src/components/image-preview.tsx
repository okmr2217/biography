import { X } from "lucide-react"

export const ImagePreview = ({preview, handleResetClick}: {
  preview: string | null | undefined,
  handleResetClick: () => void
}) => {
  return preview && (
    <div className="relative">
      <div
        className="absolute top-2 right-2 bg-slate-400 p-1 opacity-50 hover:opacity-100"
        onClick={handleResetClick}
      >
        <X />
      </div>
      <img src={preview} className="max-h-80" alt="" />
    </div>
  )
}