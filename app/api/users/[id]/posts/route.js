import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    //In the argument of the populate() method we pass the field we want to populate with the user data.
    //in this case we use "creator" to get access to the user data(eg email, username)
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    //send the response with the prompts
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
