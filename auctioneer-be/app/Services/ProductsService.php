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
    public function getProducts($filter, $col, $direction){
        return Product::available()
                ->where('name', 'LIKE', '%'.$filter.'%')
                ->orWhere('description', 'LIKE', '%'.$filter.'%')
                ->orderBy($col, $direction)->paginate(constants('PAGINATION_SIZE'));
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
        $this->validateUser($user);

        return Product::create($data);
    }

    /**
     * {@inheritdoc}
     */
    public function updateProduct($user, $id, $data){
        Log::info('Updating product');

        $this->validateUser($user);
        return $this->getProduct($id)->update($data);
    }

    /**
     * {@inheritdoc}
     */
    public function deleteProduct($user, $id){
        Log::info('Deleting product');

        $this->validateUser($user);
        return $this->getProduct($id)->delete();
    }

    /**
     * {@inheritdoc}
     */
    public function createBid($user, $id, $array){
        Log::info('Creating bid');
        $product = $this->getProduct($id);
        $bid = $product->lastBidByUser($user);
        $amount = $array['amount'];

        $this->validateBid($product, $amount);

        $data = array_merge($array, [
            'product_id' => $id,
            'user_id' => $user->id,
            'auto_bidding' => $bid ? $bid->auto_bidding : false
        ]);

        $this->getProduct($id)->update([
            'current_price' => $amount
        ]);
        
        $bid = Bid::create($data);
        $bid->updateOtherBids();
        $bid->sendMailToAutoBidders();

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
        $bid->sendMailToAutoBidders();
        return true;
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

    private function validateUser($user)
    {
        if(!$user->is_admin) {
            throw new \Exception("Invalid User");
        }
    }

    private function validateBid($product, $amount)
    {
        if($product->status !== Product::IN_PROGRESS){
            throw new \Exception("Product bidding is already closed");
        }
        
        if($product->current_price >= $amount) {
            throw new \Exception("Bid amount must be greater than the current price");
        }
    }
}