<?php

namespace App\Services;

use App\Interfaces\IProductsService;
use App\Models\Product;
use App\Models\User;
use App\Models\Bid;
use Log;

class ProductsService implements IProductsService
{

    /**
     * {@inheritdoc}
     */
    public function getAllProducts()
    {
        return Product::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getAvailableProducts()
    {
        return Product::available()->paginate(constants('PAGINATION_SIZE'));
    }

    /**
     * {@inheritdoc}
     */
    public function getSortedAvailableProducts($col, $direction)
    {
        return Product::available()->orderBy($col, $direction)->paginate(constants('PAGINATION_SIZE'));
    }

    /**
     * {@inheritdoc}
     */
    public function getProduct($id)
    {
        return Product::with(['bids', 'bids.user'])->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function createProduct($user, $data){
        Log::info('Creating product');

        //TODO: check user authorization
        return Product::create($data);
    }

    /**
     * {@inheritdoc}
     */
    public function updateProduct($user, $id, $data){
        Log::info('Updating product');

        //TODO: check user authorization
        return $this->getProduct($id)->update($data);
    }

    /**
     * {@inheritdoc}
     */
    public function deleteProduct($user, $id){
        Log::info('Deleting product');

        //TODO: check user authorization
        return $this->getProduct($id)->delete();
    }

    /**
     * {@inheritdoc}
     */
    public function createBid($user, $id, $array){
        Log::info('Creating bid');

        $product = $this->getProduct($id);
        $bid = $product->lastBidByUser($user);

        $data = array_merge($array, [
            'product_id' => $id,
            'user_id' => $user->id,
            'auto_bidding' => $bid ? $bid->auto_bidding : false
        ]);

        $product = $this->getProduct($id);
        $product->update([
            'current_price' => $array['amount']
        ]);
        
        $bid = Bid::create($data);
        Bid::updateOtherBids($bid);

        return $bid;
    }
    
    /**
     * {@inheritdoc}
     */
    public function enableAutobidding($user, $id){
        Log::info('Enable autobidding');

        $product = $this->getProduct($id);
        $bid = $product->lastBidByUser($user);
        $highestBid = $product->getHighestBid();

        if(!$bid){
            $bid = $this->createBid($user, $id, [
                'amount' => $highestBid ? $highestBid->amount + 1 : $product->current_price + 1,
            ]);  

            $highestBid = $product->getHighestBid();
        }

        $bid->update(['auto_bidding' => true]);
        $bid->updateAmount();

        return $bid;
    }

    /**
     * {@inheritdoc}
     */
    public function disableAutobidding($user, $id){
        Log::info('Disable autobidding');

        $product = $this->getProduct($id);
        $bid = $product->lastBidByUser($user);

        if($bid){
            $bid->update(['auto_bidding' => false]);
            return $bid;
        }
    }
}