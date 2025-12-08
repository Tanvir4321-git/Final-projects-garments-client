import axios from "axios"


export const imageUpload= async imagefile=>{
     const fromData= new FormData()
       fromData.append('image',imagefile)

        const data= await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host}`,fromData)

   return  data?.data?.data?.display_url


}

export const addorUpdateuser=async userinfo=>{

  const {data}=await axios.post(`http://localhost:3000/users`,userinfo)

  return data

}