// pages/api/reviews/index.js
import mongooseConnect from "../../lib/mongoose";
import Review from "../../utils/models/Review";

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { product_id, product_name, user_id, name, comment, rating } = req.body;

        // Find the module's review data
        let review = await Review.findOne({ product_id });

        if (!review) {
          // If no review data exists, create a new one
          review = new Review({
            product_id,
            product_name,
            reviews: [{ user_id, name, comment, rating }],
          });
        } else {
          // Check if the user has already reviewed the product
          const existingReview = review.reviews.find(
            (r) => r.user_id.toString() === user_id
          );

          if (existingReview) {
            return res.status(400).json({
              success: false,
              error: "User has already reviewed this product.",
            });
          }

          // Add the new review
          review.reviews.push({ user_id, name, comment, rating });

          // Recalculate the average rating
          const totalRating = review.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          review.averageRating = totalRating / review.reviews.length;
        }

        await review.save();
        res.status(201).json({ success: true, data: review });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "GET":
      try {
        const { condition } = req.query;

        // Find the module's review data
        const query = { product_id: condition };
        const module = await Review.findOne(query);
        //console.log("from module", module);
        res.status(200).json(module);
      } catch (error) {
        res.status(500).json({ error: "internal error" });
      }
      break;

    case "DELETE":
      try {
        const { user_id, product_id } = req.body;

        // Find the module's review data
        let review = await Review.findOne({ product_id });

        if (!review) {
          return res
            .status(404)
            .json({ success: false, error: "Review not found" });
        }

        // Filter out the review by user_id
        const updatedReviews = review.reviews.filter(
          (r) => r.user_id.toString() !== user_id
        );

        if (updatedReviews.length === review.reviews.length) {
          return res
            .status(404)
            .json({ success: false, error: "User review not found" });
        }

        // Update the reviews array and recalculate the average rating
        review.reviews = updatedReviews;
        const totalRating = review.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        review.averageRating =
          review.reviews.length > 0 ? totalRating / review.reviews.length : 0;

        await review.save();

        res.status(200).json({ success: true, data: review });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: "Method not allowed" });
      break;
  }
}
