<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia; 
use Illuminate\Support\Facades\DB;

class CustomerManageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $search = strip_tags($search); // remove html/js tags

        $customPage = intval($request->get('page'));
 
        $query = DB::table('users')->orderBy('id', 'desc');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('country', 'LIKE', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();
        $pages = $users->onEachSide(2)->toArray()['links'];
 
        if ($customPage === 1 && !empty($search)) {
            return Inertia::render('Admin/Customer/Manage', [
                "users" => $users,
                "pages" => $pages,
                "filters" => [
                    'page' => 1,
                    'search' => $search,
                ],
            ]);
        } else if ($customPage >= 2 && !empty($search)) {
            return Inertia::render('Admin/Customer/Manage', [
                "users" => $users,
                "pages" => $pages,
                "filters" => [
                    'page' => $customPage,
                    'search' => $search,
                ],
            ]);
        } else {
            return Inertia::render('Admin/Customer/Manage', ["users" => $users, "pages" => $pages]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function serverError()
    {
        // return Inertia::render('Error/Error404');
        return Inertia::render('Errors/404');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function statusUpdate(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return to_route('admin.customer.error');
        }

        $user->update([
            "status" => $user->status === "Active" ? "Disabled" : "Active",
        ]);

        return redirect()->back()->with([
            'success' => true,
            'title'   => 'Success',
            'message' => 'Customer status changed successfully!',
        ]);
    }

    public function destroy(string $id, int $pageNumber, string $search)
    {
        $deleted = DB::table('users')
            ->where('id', $id)
            ->delete();

        if ($deleted === 0) {
            return to_route('admin.customer.error');
        } else {

            $baseQuery = DB::table('users');

            if (!empty($search) && $search !== "__BLANK__") {
                $baseQuery->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%")
                        ->orWhere('country', 'LIKE', "%{$search}%");
                });
            }

            $totalUsers = $baseQuery->count();
            $activeUsers = $totalUsers / 10;
 
            if (is_float($activeUsers)) {
                return redirect()->back()->with([
                    'success' => true,
                    'title' => 'Success',
                    'message' => 'Customer delete successfully!'
                ]);
            } else {
                $activePage = intval($activeUsers);
                $customPage = ($activePage >= $pageNumber) ? $pageNumber : $pageNumber - 1;

                if ($search === "__BLANK__") {
                    return redirect()->route('admin.customer.index', ['page' => $customPage])->with([
                        'success' => true,
                        'title' => 'Success',
                        'message' => 'Customer delete successfully!'
                    ]);
                }

                return redirect()->route('admin.customer.index', ['page' => $customPage, 'search' => $search])->with([
                    'success' => true,
                    'title' => 'Success',
                    'message' => 'Customer delete successfully!'
                ]);
            }
        }
    }
}
