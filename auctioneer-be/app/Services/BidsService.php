<?php

namespace App\Services;

use App\Interfaces\IBidsService;
use App\Models\Bid;
use App\Models\User;
use Log;

class BidsService implements IBidsService
{
    /**
     * {@inheritdoc}
     */
    public function getAllBids()
    {
        Log::info('Getting all bids');

        return Bid::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getBid($id)
    {
        Log::info('Getting bid by id', ['id' => $id]);

        return Bid::all()->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function updateBid($user, $id, $data){
        Log::info('Updating bid');

        return $this->getBid($id)->update($data);
    }

    /**
     * {@inheritdoc}
     */
    public function deleteBid($user, $id){
        Log::info('Deleting bid');

        return $this->getBid($id)->delete();
    }
}