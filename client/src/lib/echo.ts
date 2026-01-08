import { api } from '@/lib/api';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export const pusher = Pusher;

export const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authorizer: (channel: any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        api.post('../broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name
        })
        .then(response => {
          callback(false, response.data);
        })
        .catch(error => {
          callback(true, error);
        });
      }
    };
},
});