const router = require('express').Router();
const {Comments, Posts} = require('../../models');

router.post('/', async (req,res) => {
    const comment = await Comments.create({
        
    })
})