<?php

namespace App\Http\Controllers;

use App\Events\BrowserCloseEvent;
use App\Events\CustomerSendMessageEvent;
use App\Events\MessageListEvent;
use App\Models\Backend\Admin\Conversation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Home/Home');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function browserClose(Request $request)
    {
        // sendBeacon ডেটা raw body হিসেবে পাঠায়, form data নয়
        // $data = json_decode($request->getContent(), true);

        // dd($data);

        event(new BrowserCloseEvent($request->all()));
        // event(new BrowserCloseEvent($data));
        return response()->noContent();
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (empty($request->user_id)) {

            Conversation::create([
                'customer_id' => strip_tags($request->customer_id),
                'role_type' => strip_tags($request->role_type),
                'message' => strip_tags($request->message),
                'message_seen' => strip_tags($request->message_seen),
                'message_type' => strip_tags($request->message_type),
                'message_time' => strip_tags($request->message_time),
            ]);
        } else {

            $userId = (int) $request->user_id;

            Conversation::create([
                'customer_id' => strip_tags($request->customer_id),
                'user_id' => strip_tags($userId),
                'role_type' => strip_tags($request->role_type),
                'message' => strip_tags($request->message),
                'message_seen' => strip_tags($request->message_seen),
                'message_type' => strip_tags($request->message_type),
                'message_time' => strip_tags($request->message_time),
            ]);
        }

        event(new MessageListEvent([
            'customer_id' => strip_tags($request->customer_id),
            'user_id' => strip_tags($request->user_id),
            'role_type' => strip_tags($request->role_type),
            'message' => strip_tags($request->message),
            'message_seen' => strip_tags($request->message_seen),
            'message_type' => strip_tags($request->message_type),
            'message_time' => strip_tags($request->message_time),
        ]));


        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function chatSend(Request $request)
    {
        event(new CustomerSendMessageEvent($request->all()));

        return redirect()->back();
    }


    public function homePage()
    {
        return Inertia::render('Home/Site');
    }
}
