<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;




class ProductallController extends Controller

{

    //
    public function index(){
        
        // Code for fetching Dstv product
        $Dstv1 =Product::where('Product', 'DSTV Decoder')
        ->sum('Gin');
        $Dstv2 =Product::where('Product', 'DSTV Decoder')
        ->sum('Gout');
        $Dstv =array( "name"=>"DSTV Decoder","in"=>$Dstv1,"out"=>$Dstv2, "sum"=>$Dstv1-$Dstv2);

        // Code for fetching Power Generator
     
        $PowerGenerator1 = Product::where('Product','Power Generator')
        ->sum('Gin');
        $PowerGenerator2 =Product::where('Product', 'Power Generator')
        ->sum('Gout');

        $PowerGenerator = array("name"=>"Power Generator","in"=>$PowerGenerator1,"out"=>$PowerGenerator2,
         "sum"=>$PowerGenerator1-$PowerGenerator2);

        //  code for Fetching  Thermocool Refrigerator

        $Refrigerator1 =Product::where('Product','Thermocool Refrigerator')->sum('Gin');
        $Refrigerator2 =Product::where('Product','Thermocool Refrigerator')->sum('Gout');
        $Refrigerator = array("name"=>"Thermocool Refrigerator", "in"=>$Refrigerator1,
        "out"=>$Refrigerator2, 'sum'=>$Refrigerator1-$Refrigerator2);

        // code for fetching Thermocool Air Conditional
        $Air1 =Product::where('Product','Thermocool Air Conditional')->sum('Gin');
        $Air2 =Product::where('Product','Thermocool Air Conditional')->sum('Gout');
        $Air = array("name"=>"Thermocool Air Conditional", "in"=>$Air1,
        "out"=>$Air2, 'sum'=>$Air1-$Air2);
        
        // code for fetching  Solar Panel
        $solar1 =Product::where('Product','Solar Panel')->sum('Gin');
        $solar2 =Product::where('Product','Solar Panel')->sum('Gout');
        $solar = array("name"=>"Solar Panel", "in"=>$solar1,
        "out"=>$solar2, 'sum'=>$solar1-$solar2);

        //  code for fetching Smart Tv set

        $tv1 =Product::where('Product','Smart Tv set')->sum('Gin');
        $tv2 =Product::where('Product','Smart Tv set')->sum('Gout');
        $tv = array("name"=>"Smart Tv set", "in"=>$tv1,
        "out"=>$tv2, 'sum'=>$tv1-$tv2);

        // code for fetching  Sony Sound System

        $sound1 =Product::where('Product','Sony Sound System')->sum('Gin');
        $sound2 =Product::where('Product','Sony Sound System')->sum('Gout');
        $sound = array("name"=>"Sony Sound System", "in"=>$sound1,
        "out"=>$sound2, 'sum'=>$sound1-$sound2);

        // code for fetching Thermocool Standing fan

        
        $standing1 =Product::where('Product','Thermocool Standing fan')->sum('Gin');
        $standing2 =Product::where('Product','Thermocool Standing fan')->sum('Gout');
        $standing = array("name"=>"Thermocool Standing fan", "in"=>$standing1,
        "out"=>$standing2, 'sum'=>$standing1-$standing2);

        //  code for fetching Fan
        $fan1 =Product::where('Product','Fan')->sum('Gin');
        $fan2 =Product::where('Product','Fan')->sum('Gout');
        $fan = array("name"=>"Fan", "in"=>$fan1,
        "out"=>$fan2, 'sum'=>$fan1-$fan2);

        // code for fetching  Sony Playstation

        $playstation1 =Product::where('Product','Sony Playstation')->sum('Gin');
        $playstation2 =Product::where('Product','Sony Playstation')->sum('Gout');
        $playstation = array("name"=>"Sony Playstation", "in"=>$playstation1,
        "out"=>$playstation2, 'sum'=>$playstation1-$playstation2);
        $data= [$Dstv, $PowerGenerator,$Refrigerator, $Air, $solar, $tv, $sound, $standing,$fan, $playstation];
        return json_encode($data);
    }
}