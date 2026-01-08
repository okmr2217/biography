import clsx from "clsx"
import { User2 } from "lucide-react"

export const Icon = ({icon_file, className}: {
  icon_file: string | null,
  className?: string | undefined
}) => {
  return icon_file ? (
    <img
      className={clsx(["rounded-full", className])}
      src={icon_file} alt=""
    />
  ) : (
    <div className={clsx(["rounded-full bg-slate-400 grid place-items-center", className])}>
      <User2 size={24} color="white" />
    </div>
  )
}