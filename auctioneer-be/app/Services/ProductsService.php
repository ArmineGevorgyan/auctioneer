<?php

namespace App\Services;

use App\Interfaces\IProductsService;
use App\Events\ProductUpdateEvent;
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
        Log::info('Getting all products');
        return Product::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getAvailableProducts()
    {
        Log::info('Getting all available products');
        return Product::available()->paginate(constants('PAGINATION_SIZE'));
    }

    /**
     * {@inheritdoc}
     */
    public function getProducts($filter, $col, $direction){
        Log::info('Getting filtered and sorted products');
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
        Log::info('Getting product by id', ['id' => $id]);
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
        $this->dispatchUpdateJobs($bid);

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
        $this->dispatchUpdateJobs($bid);

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
            \Log::warning("Invalid User");
            throw new \Exception("Invalid User");
        }
    }

    private function validateBid($product, $amount)
    {
        if($product->status !== Product::IN_PROGRESS){
            \Log::warning("Product bidding is already closed");
            throw new \Exception("Product bidding is already closed");
        }
        
        if($product->current_price >= $amount) {
            \Log::warning("Bid amount must be greater than the current price");
            throw new \Exception("Bid amount must be greater than the current price");
        }
    }

    private function dispatchUpdateJobs($bid)
    {
        $bid->sendMailToAutoBidders();

        \Log::info("Dispatching product update event");
        ProductUpdateEvent::dispatch($bid->product);
    }
}