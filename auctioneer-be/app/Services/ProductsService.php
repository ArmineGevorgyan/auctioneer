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
        return Product::all()->find($id);
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
        $data = array_merge($array, [
            'product_id' => $id,
            'user_id' => $user->id
        ]);

        $product = $this->getProduct($id);
        $product->update([
            'current_price' => $array['amount']
        ]);

        return Bid::create($data);

    }
}