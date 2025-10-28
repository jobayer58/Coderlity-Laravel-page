<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('customer-message-list', function () {
    return true;
});

Broadcast::channel('useridset', function () {
    return true;
});

Broadcast::channel('browser-closed', function () {
    return true;
});

Broadcast::channel('allusers', function () {
    return true;
});


Broadcast::channel('message-send', function () {
    return true;
});

Broadcast::channel('customerSendMessageEvent', function () {
    return true;
});




