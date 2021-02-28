<?php

namespace App\Interfaces;

interface IProductsService
{
    /**
     * Get all products.
     *
     * @return Collection $products
     */
    public function getAllProducts();

    /**
     * Get available products filtered and sorted by the given column.
     * 
     * @param string $filter
     * @param string $col
     * @param string $direction
     *
     * @return Collection $products
     */
    public function getProducts($filter, $col, $direction);

    /**
     * Get product by the id.
     *
     * @param int $id
     *
     * @return App\Models\Product $product
     */
    public function getProduct($id);

    /**
     * Create a new product
     *
     * @param App\Models\User $user
     * @param array $data
     * 
     * @return App\Models\Product
     */
    public function createProduct(User $user, $data);
    
    /**
     * Update an existing product
     *
     * @param App\Models\User $user
     * @param int $id
     * @param array $data
     * 
     * @return App\Models\Product
     */
    public function updateProduct($user, $id, $data);
    
    /**
     * Delete an existing product
     *
     * @param App\Models\User $user
     * @param int $id
     * 
     * @return void
     */
    public function deleteProduct($user, $id);
    
    /**
     * Create a new bid
     *
     * @param App\Models\User $user
     * @param int $id
     * @param array $data
     * 
     * @return App\Models\Bid
     */
    public function createBid(User $user, $id, $data);

    /**
     * Enable autobidding on product
     * 
     * @param App\Models\User $user
     * @param int $id
     * 
     * @return App\Models\Bid
     */
    public function enableAutobidding(User $user, $id);

    /**
     * Enable autobidding on product
     * 
     * @param App\Models\User $user
     * @param int $id
     * 
     * @return mixed
     */
    public function disableAutobidding(User $user, $id);
}
