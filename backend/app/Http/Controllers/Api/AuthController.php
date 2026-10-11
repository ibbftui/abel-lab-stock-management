<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(Request $request)
    {

        $request->validate([

            'username'=>'required',

            'password'=>'required',

        ]);

        $user = User::where(
            'username',
            $request->username
        )->first();

        if(!$user){

            return response()->json([

                'message'=>'Akun belum terdaftar.'

            ],404);

        }

        if(!Hash::check(
            $request->password,
            $user->password
        )){

            return response()->json([

                'message'=>'Password salah.'

            ],401);

        }

        return response()->json([

            'message'=>'Login berhasil.',

            'user'=>$user,

        ]);

    }

}