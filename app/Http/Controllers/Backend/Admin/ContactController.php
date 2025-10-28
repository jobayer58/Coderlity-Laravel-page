<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\Frontend\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $search = strip_tags($search);
        $customPage = intval($request->get('page'));

        $query = DB::table('contacts')->orderBy('id', 'desc');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%");
            });
        }

        $contacts = $query->paginate(10)->withQueryString();
        $pages = $contacts->onEachSide(2)->toArray()['links'];

        if ($customPage === 1 && !empty($search)) {
            return Inertia::render('Admin/Contact/Contact', [
                "contacts" => $contacts,
                "pages" => $pages,
                "filters" => [
                    'page' => 1,
                    'search' => $search,
                ],
            ]);
        } else if ($customPage >= 2 && !empty($search)) {
            return Inertia::render('Admin/Contact/Contact', [
                "contacts" => $contacts,
                "pages" => $pages,
                "filters" => [
                    'page' => $customPage,
                    'search' => $search,
                ],
            ]);
        } else {
            return Inertia::render('Admin/Contact/Contact', ["contacts" => $contacts, "pages" => $pages]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Contact/ContactCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'uname' => 'required|string|max:255',
            'email' => [
                'required',
                'email:rfc,dns',
                'min:13',
                'max:50',
            ],
            "phone" =>  ['required', 'regex:/^[0-9]+$/', 'digits_between:4,13'],
            "service" =>  'required|string',
            "message" =>  'required|string',
        ]);

        Contact::create([
            'name' => strip_tags($request->uname),
            'email' => strip_tags($request->email),
            'address' => strip_tags($request->address),
            'phone' => strip_tags($request->phone),
            'service_type' => strip_tags($request->service),
            'message' => strip_tags($request->message),
        ]);

        return redirect()->back()->with([
            'success' => true,
            'message' => 'Contact request submitted successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contact = DB::table("contacts")->where('id', $id)->first();

        if (!$contact) {
            return redirect()->route('admin.contact.index');
        }

        return Inertia::render('Admin/Contact/ContactView', ["contact" => $contact]);
    }


    /**
     * Remove the specified resource from storage.
     */

    public function destroy(string $id, int $pageNumber, string $search)
    {
        $deleted = DB::table('contacts')
            ->where('id', $id)
            ->delete();

        if ($deleted === 0) {
            return to_route('admin.user.error');
        } else {
            $baseQuery = DB::table('contacts');

            if (!empty($search) && $search !== "__BLANK__") {
                $baseQuery->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%")
                        ->orWhere('phone', 'LIKE', "%{$search}%");
                });
            }

            $totalContact = $baseQuery->count();
            $activeContact = $totalContact / 10;

            if (is_float($activeContact)) {
                return redirect()->back()->with([
                    'success' => true,
                    'title' => 'Success',
                    'message' => 'Message delete successfully!'
                ]);
            } else {
                $activePage = intval($activeContact);
                $customPage = ($activePage >= $pageNumber) ? $pageNumber : $pageNumber - 1;

                if ($search === "__BLANK__") {
                    return redirect()->route('admin.contact.index', ['page' => $customPage])->with([
                        'success' => true,
                        'title' => 'Success',
                        'message' => 'Message delete successfully!'
                    ]);
                }

                return redirect()->route('admin.contact.index', ['page' => $customPage, 'search' => $search])->with([
                    'success' => true,
                    'title' => 'Success',
                    'message' => 'Message delete successfully!'
                ]);
            }
        }
    }
}
