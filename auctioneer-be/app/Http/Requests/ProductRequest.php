<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validation_data = $this->validationData();

        $rules = [
            'name' => 'required|string',
            'desctiption' => 'nullable|string',
            'image' => 'nullable|string',
            'starting_price' => 'required|numeric|gt:0',
            'current_price' => 'required|numeric|gt:0',
        ];

        return $rules;
    }
}
