const { todo: todos } = require("../../models");
const { get } = require("../../config");
const objectId = require('mongodb').ObjectId

module.exports = {
    getAll: (req, res) => {        
        get()
            .collection("todos")
            .find({})
            .toArray()
            .then(result => {
                res.send({ message: "Get all datas", data: result });
            })
            .catch(error => {
                console.log(error);
            });
    },
    getByEmail: (req, res) => {
        get()
            .collection("todos")
            .find({ email: req.params.email })
            .toArray()
            .then(result => {
                res.send({ message: "Get all datas by email", data: result });
            })
            .catch(error => {
                console.log(error);
            });
    },
    getById: (req, res) => {
        const { id } = req.params;
        // const findOne = todos.todo.find(item => {
        //     return item.id === Number(req.params.id);
        // });

        // res.send(findOne);
        get()
            .collection("todos")
            .findOne({_id: objectId(id)})
            .then(result => {
                res.send({message: `Get Data Id ${id}`, data:result});
            })
            .catch(error => {
                console.log(error);
            });
    },
    deleteOne: (req, res) => {
        const { id } = req.params;

        get()
            .collection("todos")
            .deleteOne({_id: objectId(id)})
            .then(result => {
                res.send({ message: `Delete data with id ${id}`, data: result});
            })
            .catch(error => {
                console.log(error);
            })
        // let newTodo = todos.todo.filter(
        //     item => item.id !== parseInt(req.params.id)
        // );

        // res.send(newTodo);
    },
    addOne: (req, res) => {
        console.log(req.body);

        get()
            .collection("todos")
            .insertOne(req.body)
            .then(result => {
                res.status(201).json({ message: "Data successfully added", data: result });
            })
            .catch(error => {
                console.log(error);
            });
    },
    updateOne: (req, res) => {
        const { id } = req.params;
        get()
            .collection("todos")
            .update({_id: objectId(id)},{$set:req.body})
            .then(result => {
                res.send({ message: `Update Succes ${id}`, data: result});
            })
            .catch(error => {
                console.log(error);
            })
    }
};
