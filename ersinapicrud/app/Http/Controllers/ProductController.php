<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\ProductStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; 
 
class ProductController extends Controller
{
    public function index()
    {
       
       $products = Product::all();
      
       
       return response()->json([
          'products' => $products
       ],200);
    }
  
    public function store(ProductStoreRequest $request)
    {
        try {
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
      
            
            Product::create([
                'name' => $request->name,
                'image' => $imageName,
                'description' => $request->description
            ]);
      
        
            Storage::disk('public')->put($imageName, file_get_contents($request->image));
      
            
            return response()->json([
                'message' => "Ürün başarıyla kaydedildi."
            ],200);
        } catch (\Exception $e) {
            
            return response()->json([
                'message' => "başarısız !"
            ],500);
        }
    }
  
    public function show($id)
    {
       
       $product = Product::find($id);
       if(!$product){
         return response()->json([
            'message'=>'Product Not Found.'
         ],404);
       }
      
       
       return response()->json([
          'product' => $product
       ],200);
    }
  
    public function update(ProductStoreRequest $request, $id)
    {
        try {
            
            $product = Product::find($id);
            if(!$product){
              return response()->json([
                'message'=>'Product Not Found.'
              ],404);
            }
      
            
            $product->name = $request->name;
            $product->description = $request->description;
      
            if($request->image) {
 
                
                $storage = Storage::disk('public');
      
               
                if($storage->exists($product->image))
                    $storage->delete($product->image);
      
                
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $product->image = $imageName;
      
                
                $storage->put($imageName, file_get_contents($request->image));
            }
      
            
            $product->save();
      
            
            return response()->json([
                'message' => "ürün güncellendi !"
            ],200);
        } catch (\Exception $e) {
    
            return response()->json([
                'message' => "başarısız"
            ],500);
        }
    }
  
    public function destroy($id)
    {
        
        $product = Product::find($id);
        if(!$product){
          return response()->json([
             'message'=>'Product Not Found.'
          ],404);
        }
      
        
        $storage = Storage::disk('public');
      
        
        if($storage->exists($product->image))
            $storage->delete($product->image);
      
       
        $product->delete();
      
        
        return response()->json([
            'message' => "Product successfully deleted."
        ],200);
    }
}