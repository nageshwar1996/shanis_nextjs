import { notification } from "@/assets/constants/notification";
import { setAuthUser, setUserMetadata } from "@/store/reducer/authReducer";
import { createClient } from "@supabase/supabase-js";

import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  "https://fwuhjctlcdmrmeixbims.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dWhqY3RsY2Rtcm1laXhiaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzMwNjEsImV4cCI6MjAyMTYwOTA2MX0.NvbJChgwidz3CsxP-ACZJF0ldHLusxGms33RWS5Jf8c"
);
import { toast } from "react-toastify";

export const createNewUser = async (data, profileRef, userId) => {
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        age: data.age,
        address: data.address,
        is_admin: false,
      },
    },
  });
  toast(notification.ACCOUNT_CREATED_SUCCESS);
  return result ?? null;
};


export const updateUserData= async (profileRef, user_id, user_data, dispatch) => {

  let temp = {...user_data}

  if(profileRef.current.files.length > 0){
    let file = profileRef.current.files[0]
    const { data, error } = await supabase.storage.from('user_profile').upload(`profiles/${user_id}/${uuidv4()}.${file.type.split("/")[1]}`, file, {
      cacheControl: '3600',
      upsert: true,
    })
    if (error) {
      // Handle error
    } else {
      temp.avatar_url = `https://fwuhjctlcdmrmeixbims.supabase.co/storage/v1/object/public/${data.fullPath}`
      temp.picture = `https://fwuhjctlcdmrmeixbims.supabase.co/storage/v1/object/public/${data.fullPath}`
    }
  }

 
  const { data, error } = await supabase.auth.updateUser({
    data: {...temp}
  })
  if(data){
    dispatch(setUserMetadata(data.user.user_metadata))
  }
  toast(notification.PROFILE_UPDATE_SUCCESS);

}

export const loginUser = async (data, dispatch, router) => {
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if(result.error != null){
    toast(result.error.message);
    return
  }else{
    toast(notification.LOGIN_SUCCESS);
    dispatch(setAuthUser({...result.data}))
    router.push('/dashboard')
    return result.data;
  }
  
  
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  return error
};

