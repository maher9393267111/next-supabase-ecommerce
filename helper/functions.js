import { supabase } from "./db";
import Resizer from "react-image-file-resizer";
import { toast } from 'react-toastify';
export const updateUser = async (authuser) => {
  if (authuser?.id) {
    console.log("executing updateUser");
    const { user, error } = await supabase
      .from("users")
      .update({
        verified: true,
      })
      .eq("id", authuser.id);
    console.log("updateUser", user, error);
  }
};

// find authuser data
export const findUser = async (authuser) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authuser.id)
    .single();

  //console.log("findUser ---->", user, error);

  return user;
};


// fetch all categories from supabase

export const fetchCategories = async () => {

const {data:categories, error} = await supabase.from("category").select("*");

//console.log("fetchCategories ---->", categories, error);
return categories;
}



// fretch all products from supabase

export const fetchProducts = async () => {

  const {data:products, error} = await supabase.from("products").select("*,category:category_id(*) "
);
  
  //console.log("fetchCategories ---->", categories, error);
  return products;
  }
  

  const resizeImg = (img) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      img,
      1000,
      1000,
      "",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      500,
      500
    );
  });



  export  const uploadImgs = async (fileImgs) => {
    const imgPaths = [];
    console.log("fileImgs", fileImgs);
    for (let img of fileImgs) {
      const resizedImg = await resizeImg(img);
      const newName = new Date().valueOf() + "-" + img.name.replace(/\s+/g, "_");
      const imgPath = await supabase.storage
        .from("my-storage")
        .upload(`images/${newName}`, resizedImg , {
          cacheControl: "3600",
          upsert: true,
        });
      if (imgPath.data) {
        const cleanPath = imgPath.data.Key.split("/").slice(1).join("/");
        imgPaths.push(cleanPath);
      }
      if (imgPath.error) {
        throw new Error(imgPath.error.message);
      }
    }
    return imgPaths;
  };
  

// fetch product by id

export const fetchProductById = async (id) => {

  const {data:product, error} = await supabase.from("products").select("*,category:category_id(*) ").eq("id", id).single();

console.log("fetchProductById ---->", product, error);
return product;

}


// update product by id

export const updateProduct = async (product) => {


// delete old images from storage and update new images




  const {data:updatedProduct, error} = await supabase.from("products").update({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    category_id: product.category_id,
   // images: product.images,
  }).eq("id", product.id);
  console.log("updateProduct ---->", updatedProduct, error);

if (updatedProduct) {
  toast.success("Product updated successfully");
}

if (error) {
  toast.error(error.message);
}

  return updatedProduct;
}


// delete product by id


export const deleteProduct = async (id) => {

  // delete old images from storage and update new images then delete product

  const {data:productimages, error} = await supabase.from("products").select( "images").eq("id", id).single();
  console.log("id---->", id, error);

  for (let img of productimages?.images){
    console.log('imgaaaaa---->', img);
   // console.log('ALl--->', productimages);
    const {data,error} =  await supabase
    .storage
    .from('my-storage')
    .remove([`products/${img.name}`]);

  //  console.log("deleteProduct ---->", error   , 'data', data);

  }
//console.log("AFTERRR productimages---->", productimages?.images);



  const {data:deleted ,error :errordelete } = await supabase.from("products").delete().eq("id", id);


  //console.log("deleteProduct ---->", deleted, errordelete);
//return  productimages


}