<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function list(User $user) {
        return $user->isAdmin();
    }

    public function update(User $user) {
        return $user->isAdmin();
    }

    public function resetPassword(User $user, User $otherUser) {
        return $user->isAdmin();
    }
}
