const express =require('express');
const organisateurRouter=express.Router();
const {EventM}=require("../models/event")
const organisateur=require('../middlewares/organisateur');




organisateurRouter.post('/organisateur/add-event',organisateur,async(req,res)=> {
    try {
      const {priceTicket,name,description,images,category,quantity,debutTime,finTime,debutMois,finMois,userId}=req.body;
      
        let event =new EventM({
            priceTicket,
            quantity,
            name,
            description,
            images,
            category,
            debutTime,
            finTime,
            debutMois,
            finMois,
            userId
        });
        event=await event.save();
        res.json(event);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// Get all your products
organisateurRouter.get("/organisateur/get-events", organisateur, async (req, res) => {
    try {
      const events = await EventM.find({});
      res.json(events);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

module.exports = organisateurRouter;