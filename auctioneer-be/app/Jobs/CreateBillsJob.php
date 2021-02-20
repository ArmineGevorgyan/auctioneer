<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Jobs\GenerateMail;
use App\Mail\ItemLostMail;
use App\Mail\ItemWonMail;
use App\Models\Product;
use App\Models\Bill;
use App\Models\Bid;

class CreateBillsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $date;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($date)
    {
        $this->date = $date;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $products = Product::getProductsByClosingDate($this->date);
        foreach($products as $product) {
            $this->generateBill($product);
        }
    }

    private function generateBill($product) {
        $highestBid = $product->getHighestBid();
        
        if(!$highestBid){
            \Log::info("Updating product status");
            return $product->update(['status' => Product::CLOSED]);
        }
        
        \Log::info("Creating a new bill");
        $bill = Bill::create([
            'amount' => $highestBid->amount,
            'bid_id' => $highestBid->id,
            'product_id' => $product->id,
        ]);
        $this->updateStatuses($product, $highestBid);
        $this->sendEmails($product, $highestBid);
    }

    private function updateStatuses($product, $highestBid) {
        \Log::info("Updating highest bid status");
        $highestBid->update(['status' => Bid::WON]);

        \Log::info("Updating product status");
        $product->update(['status' => Product::SOLD]);
        
        \Log::info("Updating other bids");
        return $product->bids()
                    ->where('id', '!=', $highestBid->id)
                    ->update(['status' => Bid::LOST]);
    }

    private function sendEmails($product, $highestBid)
    {
        \Log::info("Sending emails with bid results");
        $mailable = new ItemWonMail($highestBid);
        GenerateMail::dispatch($mailable, [$highestBid->user->email]);
        
        $bids = $product->bids->where('user_id', '!=', $highestBid->user->id)->sortByDesc("amount")->unique("user_id")->all();
        foreach($bids as $bid) {
            $mailable = new ItemLostMail($highestBid, $bid);
            GenerateMail::dispatch($mailable, [$bid->user->email]);
        }
    }
}
