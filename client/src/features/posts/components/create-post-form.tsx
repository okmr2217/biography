import { FileInputButton } from "@/components/file-input-button"
import { ImagePreview } from "@/components/image-preview"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/features/auth/hooks/use-user"
import { useCreatePostForm } from "@/features/posts/hooks/use-create-post-form"
import { Icon } from "@/features/users/components/icon"
import { useImagePreview } from "@/hooks/useImagePreview"
import { useRef } from "react"
import { Link } from "react-router-dom"

export const CreatePostForm = ({onSuccess, parentId}: {
  onSuccess: () => void,
  parentId?: string
}) => {
  const { form, onSubmit } = useCreatePostForm(() => {
    onSuccess()
    resetPreview()
  }, parentId);

  const { data: loginUser } = useUser();

  const { preview, handleImageChange, reset: resetPreview } = useImagePreview();

  const fileInputRef = useRef<HTMLInputElement|null>()
  
  return loginUser && (
    <div className="p-4 flex gap-2">
      <div className="shrink-0">
        <Link to={`/users/${loginUser.id}`}>
          <Icon className="w-10 h-10" icon_file={loginUser.icon_file} />
        </Link>
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField control={form.control} name="text" render={({ field }) => (
              <Textarea cols={32} {...field} placeholder="テキスト" />
            )} />
            <FormField control={form.control} name="image_file" render={({ field: {onChange, ref} }) => (
              <div>
                <FileInputButton inputRef={fileInputRef} />
                <Input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={(e) => {
                    ref(e)
                    fileInputRef.current = e;
                  }}
                  onChange={(e) => {
                    onChange(e.target.files)
                    handleImageChange(e)
                  }}
                />
              </div>
            )} />
            <ImagePreview preview={preview} handleResetClick={() => {
              form.resetField("image_file")
              resetPreview()
            }} />
            <Button size="sm" type="submit">投稿</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}