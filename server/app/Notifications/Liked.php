<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Liked extends Notification
{
    use Queueable;

    public $user_id;
    public $user_name;
    public $user_icon_file;
    public $post_id;
    public $post_text;

    /**
     * Create a new notification instance.
     */

    public function __construct(User $user, Post $post) {
        $this->user_id = $user->id;
        $this->user_name = $user->name;
        $this->user_icon_file = $user->icon_file;
        $this->post_id = $post->id;
        $this->post_text = $post->text;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'user_id' => $this->user_id,
            'user_name' => $this->user_name,
            'user_icon_file' => $this->user_icon_file,
            'post_id' => $this->post_id,
            'post_text' => $this->post_text
        ];
    }
}
