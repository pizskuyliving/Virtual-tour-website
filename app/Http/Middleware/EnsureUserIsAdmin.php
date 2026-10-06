<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Only allow admins to manage rooms.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->is_admin) {
            abort(403, 'Hanya admin yang dapat mengakses halaman ini.');
        }

        return $next($request);
    }
}
