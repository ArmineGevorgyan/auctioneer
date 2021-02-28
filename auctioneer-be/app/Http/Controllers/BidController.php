<?php

namespace App\Http\Controllers;

use App\Exceptions\InternalErrorException;
use App\Interfaces\IBidsService;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Log;

class BidController extends Controller
{
    private $bids_service;

    public function __construct(IBidsService $bids_service)
    {
        $this->bids_service = $bids_service;
    }

    /**
     * Get all bids.
     * 
     * @param Illuminate\Http\Request
     * 
     * @throws InternalErrorException
     * @return Collection $bids
     */
    public function index(Request $request)
    {
        try {
            Log::error('Get all bids');

            return $this->bids_service->getAllBids();
        } catch (Exception $e) {
            Log::error('Get bids, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    /**
     * Get bid by the id.
     *
     * @param Illuminate\Http\Request
     * @param int $id
     *
     * @throws InternalErrorException
     * @return App\Models\Bid $bid
     */
    public function show(Request $request, $id)
    {
        try {
            Log::error('Get bid by id', ['id' => $id]);

            return $this->bids_service->getBid($id);
        } catch (Exception $e) {
            Log::error('Get bid by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    /**
     * Update an existing bid
     *
     * @param Illuminate\Http\Request
     * @param int $id
     * 
     * @throws InternalErrorException
     * @return App\Models\Bid
     */
    public function update(Request $request, $id)
    {
        try {   
            $payload = $request->only(['amount']);

            Log::info('Update bid', ['id'=> $id, 'payload' => $payload]);
            $bid = $this->bids_service->updateBid($request->user(), $id, $payload);

            return $bid;
        } catch (Exception $e) {
            Log::error('Update bid by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }
    
    /**
     * Delete an existing bid
     *
     * @param Illuminate\Http\Request
     * @param int $id
     * 
     * @throws InternalErrorException
     * @return void
     */
    public function delete(Request $request, $id){
        try {
            Log::error('Delete bid by id', ['id' => $id]);

            return $this->bids_service->deleteBid($request->user(), $id);
        } catch (Exception $e) {
            Log::error('Delete bid, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }
}
