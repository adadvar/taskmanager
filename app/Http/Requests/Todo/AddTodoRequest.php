<?php

namespace App\Http\Requests\Todo;

use App\Rules\OwnCategoryRule;
use Illuminate\Foundation\Http\FormRequest;

class AddTodoRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'category_id' => ['required', new OwnCategoryRule],
            'description' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'isCompleted' => 'nullable|boolean',
            'start_date' => 'nullable|date_format:Y-m-d H:i:s|after:now',
            'due_date' => 'nullable|date_format:Y-m-d H:i:s|after:now',
            'publish_at' => 'nullable|date_format:Y-m-d H:i:s|after:now',
        ];
    }
}
