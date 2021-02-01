<?php

namespace App\Http\Controllers;

use App\Exceptions\InternalErrorException;
use App\Interfaces\IProductsService;
use App\Http\Requests\ProductRequest;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Log;

class ProductsController extends Controller
{
    private $products_service;

    public function __construct(IProductsService $products_service)
    {
        $this->products_service = $products_service;
    }

    public function index(Request $request)
    {
        try {
            return $this->products_service->getProducts();
        } catch (Exception $e) {
            Log::error('Get products, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function getAvailableProducts(Request $request)
    {
        try {
            return $this->products_service->getAvailableProducts();
        } catch (Exception $e) {
            Log::error('Get available products, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function getSortedAvailableProducts(Request $request, $col, $direction)
    {
        try {
            return $this->products_service->getSortedAvailableProducts($col, $direction);
        } catch (Exception $e) {
            Log::error('Get sorted available products, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function show(Request $request, $id)
    {
        try {
            return $this->products_service->getProduct($id);
        } catch (Exception $e) {
            Log::error('Get product by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function create(ProductRequest $request)
    {
        try {   
            $payload = $request->only([
                'name',
                'desctiption',
                'image',
                'starting_price',
                'current_price',
                'closing_date',
                'is_available'
            ]);

            Log::info('Create product', ['payload' => $payload]);
            $product = $this->products_service->createProduct($request->user(), $payload);
            Log::info('Product created.', ['response' => $product]);

            return $product;
        } catch (Exception $e) {
            Log::error('Create product, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function update(ProductRequest $request, $id)
    {
        try {   
            $payload = $request->only([
                'name',
                'desctiption',
                'image',
                'starting_price',
                'current_price',
                'is_available'
            ]);

            Log::info('Create product', ['payload' => $payload]);
            $product = $this->products_service->updateProduct($request->user(), $id, $payload);
            Log::info('Product updated.', ['response' => $product]);

            return $product;
        } catch (Exception $e) {
            Log::error('Update product by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function delete(Request $request, $id){
        try {
            return $this->products_service->deleteProduct($request->user(), $id);
        } catch (Exception $e) {
            Log::error('Delete product, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function createBid(Request $request, $id){
        try {
            $payload = $request->only([ "amount" ]);

            return $this->products_service->createBid($request->user(), $id, $payload);
        } catch (Exception $e) {
            Log::error('Create bid, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }  
    
    public function enableAutobidding(Request $request, $id){
        try {
            return $this->products_service->enableAutobidding($request->user(), $id);
        } catch (Exception $e) {
            Log::error('Enable autobidding, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }
    
    public function disableAutobidding(Request $request, $id){
        try {
            return $this->products_service->disableAutobidding($request->user(), $id);
        } catch (Exception $e) {
            Log::error('Disable autobidding, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }
}
