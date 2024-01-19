import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
  
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get("/", (request, response) => {
    try {
        Book.find({}).then((books) => {
            response.status(200).json({
                count: books.length,
                data: books
            });
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }
})

router.put("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const update = request.body
        let book = await Book.findOneAndUpdate({_id: id}, update, {new: true})
        response.status(201).json(book)

    } catch (error) {
        response.status(404).json({
            "message": error.message
        })
    }
})

router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields(title, author, publishYear"
            })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook)
        book.save()

        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

router.delete("/:id",async(request, response)=>{
    try{
        const {id} = request.params
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.status(200).send({message: 'Book deleted successfully'})
        response.send("delete successfully")
    }catch(error){
        console.log(error.message)
        response.status(500).send(error.message)
    }
} )

export default router;