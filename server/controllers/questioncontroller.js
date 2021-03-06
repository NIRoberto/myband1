import questionmodel from '../models/question.js';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
const schema = {
  fullname: Joi.string().min(6).max(20).required(),
  email: Joi.string().min(6).required().email(),
  message: Joi.string().min(6).max(100).required()

}
export default class questionscontroller {
  // // get all blog post 
  static async findAll(req, res) {
    try {
      const questions = await questionmodel.find();
     return res.status(200).json({
        message: "success ",
        data: questions
      });
    }
    catch (error) {
    return  res.status(404).json({
        error: error.message
      });
    }
  }
 static async postOne(req, res) {
  // validate data 
    const { error } = Joi.validate(req.body, schema);
    if (error) {
    return  res.status(400).json({
        message: error.details[0].message
      })
    }
    const quest = new questionmodel({
      _id: new mongoose.Types.ObjectId(),
      userId:req.loggeduser.userId,
      fullname: req.body.fullname,
      email: req.body.email,
      message: req.body.message,

    })
    try {
      const newblog = await quest.save();
     return res.status(201).json({
        message: "success question created",
        data: quest
      });

    }
    catch (error) {
    return  res.status(400).json({
        error: error.message
      });
    }
  }
   // delete question
  static async getOne(req, res) {
    const id = req.params.id;
    const quest = await questionmodel.findById(id);
    if (!quest) {
      res.status(404).json({
        message: "not found"
      });
    }
    try {
     
     return  res.status(200).json({
       message: "success",
       Data:quest
      });
   
    }
    
    catch (error) {
    return  res.status(404).json({
        error: error.message,
      });
    }
}
 // delete question
  static async deleteOne(req, res) {
    const id = req.params.id;
    const quest = await questionmodel.findById(id);
    if (!quest) {
      res.status(404).json({
        Error: "Question not found"
      });
    }
       if (req.loggeduser.userId !== quest.userId) {
      return res.status(403).json({
        message:"You can't delete which not belongs to you"
      })
    }

    try {
       const deletequest = await questionmodel.remove({ _id: id });
     return  res.status(200).json({
        message: "Delete  a quest was successfully done!",
      });
   
    }
    
    catch (error) {
    return  res.status(404).json({
        error: error.message,
      });
    }
}


}
