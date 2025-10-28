<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Events\MessageSendEvent;
use App\Events\UserIdSetEvent;
use App\Models\Backend\Admin\Conversation;
use App\Http\Controllers\Controller;
use App\Jobs\Chat\ReadAllMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = DB::table('conversations')
            ->select(
                'conversations.*',
                DB::raw('(
            SELECT COUNT(*)
            FROM conversations AS c2
            WHERE c2.customer_id = conversations.customer_id
              AND c2.message_seen = 0
        ) AS message_count')
            )
            ->whereIn('id', function ($query) {
                $query->select(DB::raw('MAX(id)'))
                    ->from('conversations')
                    ->groupBy('customer_id');
            })
            ->orderBy('message_time', 'desc')
            ->get();

        $allMessage = session('allMessage') ?? [];

        return Inertia::render('Admin/Chat/index', ["customers" => $customers,  "allmessage" => $allMessage]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function messages(Request $request)
    {
        $userId = Auth::guard('admin')->id();

        $unseenCount = DB::selectOne("
            SELECT COUNT(id) as total
            FROM conversations
            WHERE customer_id = ? AND message_seen = 0
        ", [$request->customer_id])->total;

        event(new UserIdSetEvent($userId));

        if ($unseenCount > 0) {
            // ReadAllMessage::dispatch($request->customer_id, $userId);

            DB::statement("
            UPDATE conversations
            SET message_seen = 1, user_id = ?
            WHERE customer_id = ? AND message_seen = 0
            ", [$userId, $request->customer_id]);
        }

        // $allMessage = DB::table('conversations')->where('customer_id', $request->customer_id)->get();
        $allMessage = DB::table('conversations')->where('customer_id', $request->customer_id)->get();

        return redirect()->route('admin.chat.index')->with('allMessage', $allMessage);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function sendMessage(Request $request)
    {
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

        event(new MessageSendEvent($request->all()));

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function messageStore(Request $request)
    {
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

        return redirect()->back();
    }
}



