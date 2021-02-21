<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class AutobidAmountRunOutMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * Create a new message instance.
     */
    private $bid;

    public function __construct($bid)
    {
        $this->bid = $bid;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $bid = $this->bid;
        $item = $bid->product;

        return $this->view('autobid_amount_run_out')
            ->with(
                [
                    'item_name' => $item->name,
                    'bid_amount' => $bid->amount,
                    'date' => Carbon::parse($item->closing_date)->toRfc7231String(),
                    'item_url' => constants('APP_URL').'/products/'.$item->id,
                    'profile_url' => constants('APP_URL').'/settings',
                ]
            )
            ->subject(__('mail.autobid_amount_run_out_subject', ['item' => $item->name]));
    }
}
