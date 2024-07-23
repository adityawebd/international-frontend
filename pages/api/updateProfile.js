import { connect } from "../../utils/config/dbConfig";
import Customer from "../../utils/models/customer";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
      try {
        const profile = req.body;
  
        // Ensure email is provided in the profile data
        if (!profile.email) {
          return res.status(400).json({ message: 'Email is required' });
        }
  
        await connect();
  
        // Find the user by email and update their profile
        const updatedUser = await Customer.findOneAndUpdate(
          { email: profile.email },
          profile,
          { new: true }
        );
  
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
      } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } 


    if (req.method === 'GET') {
        try {
          const { email } = req.query;
    
          // Ensure email is provided in the query parameters
          if (!email) {
            return res.status(400).json({ message: 'Email is required' });
          }
    
          await connect();
    
          // Find the user by email
          const query = { email: email };
            const data = await Customer.find(query)
            res.status(200).json(data)
        } catch (error) {
          console.error('Error fetching user data:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
  }