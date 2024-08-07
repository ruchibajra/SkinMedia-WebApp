

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
    console.log(error);
    res.status(500).json({ msg: error.message });
  };


    // Create a new category (Admin Only)
    const createPost = async (req, res) => {
        const { title, description, productName, source, skintype, productUsedTime } = req.body;
      
        if (!title || !description || !productName || !source || !skintype || !productUsedTime ) {
          return res.status(400).json({ msg: "All fields are required" });
        }
      
        //  check if category already exists
        try {
          const postExists = await createPost.findOne({ title });
          if (postExists) {
            return res.status(400).json({ msg: "Post already exists" });
          }
          const post = new createPost({
            title, description, productName, source, skintype, productUsedTime
          });
          await post.save();
      
          return res.status(201).json({ 
            msg: "Posr added successfully", 
            posr: post,
            success: true,
           });
        } catch (error) {
          sendErrorResponse(res, error);
          // return res.status(500).json({ msg: error.message });
        }
      };

  module.exports = {createPost};
