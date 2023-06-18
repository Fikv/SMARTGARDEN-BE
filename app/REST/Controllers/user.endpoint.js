import { User } from "../Entities/UserSchema";

const userEndpoint = (router) => {
  router.post('/api/user', async (request, response, next) => {
    try {
      const newUser = new User({
        username: request.body.username,
        password: request.body.password,
        email: request.body.email,
        lastLogonDate: new Date(),
        dateOfCreation: new Date(),
        userType: "normal", 
      });

      const savedUser = await newUser.save();

      response.status(200).json(savedUser);
    } catch (error) {
      console.log('Error:', error);
      response.status(500).send('Internal Server Error');
    }
  });


  router.put('/api/user/make-admin/:id', async (request, response, next) => {
    try {
      const userId = request.params.id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { userType: "admin" },
        { new: true }
      );

      if (!updatedUser) {
        return response.status(404).send('User not found');
      }

      response.status(200).json(updatedUser);
    } catch (error) {
      console.log('Error:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  router.put('/api/user/make-normal/:id', async (request, response, next) => {
    try {
      const userId = request.params.id;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { userType: "normal" },
        { new: true }
      );
  
      if (!updatedUser) {
        return response.status(404).send('User not found');
      }
  
      response.status(200).json(updatedUser);
    } catch (error) {
      console.log('Error:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  router.delete('/api/user/remove/:id', async (request, response, next) => {
    try {
      const userId = request.params.id;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return response.status(404).send('User not found');
      }

      response.status(200).send('User deleted successfully');
    } catch (error) {
      console.log('Error:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  router.put('/api/user/:id', async (request, response, next) => {
    try {
      const userId = request.params.id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          username: request.body.username,
          password: request.body.password,
          email: request.body.email
        },
        { new: true }
      );

      if (!updatedUser) {
        return response.status(404).send('User not found');
      }

      response.status(200).json(updatedUser);
    } catch (error) {
      console.log('Error:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  router.post('/api/user/login', async (request, response, next) => {
    try {
      const { username, password } = request.body;

      const foundUser = await User.findOne({ username });

      if (!foundUser || foundUser.password !== password) {
        return response.status(401).send('Invalid username or password');
      }

      foundUser.lastLogonDate = new Date();
      await foundUser.save();

      response.status(200).json(foundUser);
    } catch (error) {
      console.log('Error:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  router.get('/api/user', async (request, response, next) => {
    try {
      const users = await User.find();
      response.status(200).json(users);
    } catch (error) {
      console.log('Error:', error);
      response.status(500).send('Internal Server Error');
    }
  });
};


export default userEndpoint;
