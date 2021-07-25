const { AuthenticationError } = require('apollo-server-express');
const { User, Art } = require('../models');

const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('arts')
                return userData;
            } throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find()
                .select('-__v -password')

        },

        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('arts')
          },

        // Query all arts
        arts: async () => {
            return Art.find()
            .select('-__v')
        },

        // Query one art based on title
        art: async (parent, { title }) => {
            return await Art.findOne({ title })
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        // Add Art
        addArt: async (parent, args, context) => {
            if (context.user) {
            const art = await Art.create({...args, artist: context.user.username});

            await User.findByIdAndUpdate(
                {_id: context.user._id },
                {$addToSet: { arts: art._id } },
                {new: true }
            );

            return art 
            }
    }
}

};
module.exports = resolvers;

// writing like and unlike as routes first because I'm following a guide and understand it better this way
// router.put('/like', requireLogin, (req, res) => {
//     Art.findByIdAndUpdate(req.body.artId, {
//         $push:{likes:req.user._id}
//     }, 
//     {
//         new:true
//     }).exec((err, result) => {
//         if (err) {
//             return res.status(422).json({error:err})
//         } else {
//             res.json(result)
//         }
//     })
// })

// router.put('/unlike', requireLogin, (req, res) => {
//     Art.findByIdAndUpdate(req.body.artId, {
//         $pull:{likes:req.user._id}
//     }, 
//     {
//         new:true
//     }).exec((err, result) => {
//         if (err) {
//             return res.status(422).json({error:err})
//         } else {
//             res.json(result)
//         }
//     })
// })
