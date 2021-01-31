<?php

namespace App\Interfaces;

interface IBidsService
{
    /**
     * Get all bids.
     *
     * @return Collection $bids
     */
    public function getAllBids();

    /**
     * Get bid by the id.
     *
     * @param int $id
     *
     * @return App\Models\Bid $bid
     */
    public function getBid($id);
    
    /**
     * Update an existing bid
     *
     * @param App\Models\User $user
     * @param int $id
     * @param array $data
     * 
     * @return App\Models\Bid
     */
    public function updateBid($user, $id, $data);
    
    /**
     * Delete an existing bid
     *
     * @param App\Models\User $user
     * @param int $id
     * 
     * @return void
     */
    public function deleteBid($user, $id);
}
