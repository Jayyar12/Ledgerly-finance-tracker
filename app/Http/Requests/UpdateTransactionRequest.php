<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('transaction'));
    }

    public function rules(): array
    {
        return [
            'category_id' => ['sometimes', 'required', 'exists:categories,id'],
            'amount' => ['sometimes', 'required', 'numeric', 'min:0.01'],
            'date' => ['sometimes', 'required', 'date'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
