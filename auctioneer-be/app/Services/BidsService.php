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
        return Bid::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getBid($id)
    {
        return Bid::all()->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function updateBid($user, $id, $data){
        Log::info('Updating product');

        return $this->getBid($id)->update($data);
    }

    /**
     * {@inheritdoc}
     */
    public function deleteBid($user, $id){
        Log::info('Deleting product');

        return $this->getBid($id)->delete();
    }
}