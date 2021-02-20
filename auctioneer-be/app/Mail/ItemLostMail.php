<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ItemLostMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    /**
     * Create a new message instance.
     */
    private $bid;
    private $winning_bid;

    public function __construct($winning_bid, $bid)
    {
        $this->bid = $bid;
        $this->winning_bid = $winning_bid;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $bid = $this->bid;
        $winning_bid = $this->winning_bid;
        $item_name = $bid->product->name;

        return $this->view('item_lost_mail')
            ->with(
                [
                    'item_name' => $item_name,
                    'bid_amount' => $bid->amount,
                    'winning_amount' => $winning_bid->amount,
                    'winner' => $winning_bid->user->username,
                ]
            )
            ->subject(__('mail.item_lost_subject', ['item' => $item_name]));
    }
}
