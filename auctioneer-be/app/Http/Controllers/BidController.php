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

    public function index(Request $request)
    {
        try {
            return $this->bids_service->getBids();
        } catch (Exception $e) {
            Log::error('Get bids, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function show(Request $request, $id)
    {
        try {
            return $this->bids_service->getBid($id);
        } catch (Exception $e) {
            Log::error('Get bid by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function update(Request $request, $id)
    {
        try {   
            $payload = $request->only(['amount']);

            Log::info('Create bid', ['payload' => $payload]);
            $bid = $this->bids_service->updateBid($request->user(), $id, $payload);
            Log::info('Bid updated.', ['response' => $bid]);

            return $bid;
        } catch (Exception $e) {
            Log::error('Update bid by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }
    
    public function delete(Request $request, $id){
        try {
            return $this->bids_service->deleteBid($request->user(), $id);
        } catch (Exception $e) {
            Log::error('Delete bid, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }
}
