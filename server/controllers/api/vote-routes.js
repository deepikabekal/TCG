const express = require('express');
const router = express.Router();
const { Art } = require('../../models');

router.put('/api/vote', async (req, res) => {
    try {
      const art = await Art.findByIdAndUpdate(req.body.artId, 
    {
      $push:{vote:req.body.user_id}
    }, 
    {
      new:true
    })
    res.json(art)
  } catch (err) {
    console.log(err)
  }
});

router.put('/unvote', (req, res) => {
    Art.findByIdAndUpdate(req.body.artId, {
      $pull:{vote:req.user._id}
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
