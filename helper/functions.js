import { supabase } from "./db";

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

  console.log("findUser ---->", user, error);

  return user;
};
