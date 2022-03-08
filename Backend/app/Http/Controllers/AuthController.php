<?php

namespace App\Http\Controllers;
use App\Models\UserAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function get(){
        $user = UserAuth::create([
            'key'=> bcrypt('1234'),
            'username'=>'Admin1'
        ]);

        return $user;
    }

  public function login(Request $request){
    $field = $request->validate([
        'key'=> 'required',
        'username'=>'required'
    ]);

        $user = UserAuth::where('username',($field['username']))->first();
        
        if(!$user || !Hash::check($field['key'], $user->key)){
            return response([
                'message'=>'wrong cred'
            ], 401);
        }

        // $response =[
        //     'user'=>$user
        // ];

        return response($user, 201);       
        
  }
  
}