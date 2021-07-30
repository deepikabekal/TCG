const express = require('express');
const router = express.Router();
const { Art } = require('../../models');

router.put('/api/vote', async (req, res) => {
  

    try {
      console.log("routehit", req.body)
      const art = await Art.findOneAndUpdate(
        { _id: req.body.artId },
        { $addToSet:{vote:req.body.user} }, 
        { new:true }
      )
    console.log("art", art)
    res.json(art)
  } catch (err) {
    console.log(err)
  }
});

// const updatedUser = await User.findOneAndUpdate(
//   { _id: context.user._id },
//   { $addToSet: { savedBooks: args } },
//   { new: true, runValidators: true }
// );

router.put('/unvote', (req, res) => {
    Art.findByIdAndUpdate(req.body.artId, {
      $pull:{vote:req.body.user}
    }, 
    {
      new:true
    }).exec((err, result) => {
      if (err) {
          return res.status(422).json({error:err})
      } else {
          res.json(result)
      }
    })
})

module.exports = router;
