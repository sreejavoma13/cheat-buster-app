const { z } = require("zod");
const User = require("../models/user.model");

const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

exports.searchUser = async (req, res) => {
  try {
    const result = searchSchema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const searchText = result.data.query;

    const foundUser = await User.findOne({
      $or: [
        { email: searchText.toLowerCase() },
        { firstname: new RegExp(searchText, "i") },
        { lastname: new RegExp(searchText, "i") },
      ],
    });

    if (!foundUser) {
      return res.status(400).json({ message: "They are Loyal" });
    }

    res.status(200).json(foundUser);
  } catch (err) {
    res.status(500).json({ error: "Unexpected server error" });
  }
};
