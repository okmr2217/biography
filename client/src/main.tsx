import ReactDOM from 'react-dom/client'
import '@/globals.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { Toaster } from '@/components/ui/toaster'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster />
  </QueryClientProvider>
)
