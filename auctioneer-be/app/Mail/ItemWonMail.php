<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ItemWonMail extends Mailable
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
        $item_name = $bid->product->name;

        return $this->view('item_won_mail')
            ->with(
                [
                    'item_name' => $item_name,
                    'bid_amount' => $bid->amount,
                ]
            )
            ->subject(__('mail.item_won_subject', ['item' => $item_name]));
    }
}
