<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class GenerateMail implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    private $mailable;
    private $emails;
    private $cc_emails;

    /**
     * Create a new job instance.
     *
     */
    public function __construct(Mailable $mailable, array $emails = null, array $cc_emails = null)
    {
        $this->mailable = $mailable;
        $this->emails = $emails;
        $this->cc_emails = $cc_emails;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        \Log::info("Sending email to: ", ['emails' => $this->emails]);

        $mail_builder = Mail::to($this->emails);
        if ($this->cc_emails) {
            $mail_builder->cc($this->cc_emails);
        }
        $mail_builder->send($this->mailable);
    }
}
