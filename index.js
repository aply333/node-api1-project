

const express = require('express');
const port = process.env.PORT || 4000;
const server = express();

const users = [
    { id: 1, name: "Andrei" },
    { id: 2, name: "Ilya" },
    { id: 3, name: "Victor" }
]

const IDmatch = (id) => {
    return users.find(user => user.id === parseInt(id))
}


server.use(express.json());

server.get('/', (req, res) => {
    res.send('Api Root now with NodeMon')
})

server.get('/api/users', (req, res) => {
    res.send(users)
})

server.get('/api/users/:id', (req, res) => {
    const userID = IDmatch(req.params.id)
    if (!userID) {
        res.status(404).send(`No user found with ID of ${req.params.id}`)
    } else {
        res.send(userID)
    }
})

server.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    }
    users.push(user)
    res.send(user)
})

server.put('/api/users/:id', (req, res) => {
    const userID = IDmatch(req.params.id)
    if (!userID) {
        res.status(404).send('User was not found')
    } else {
        userID.name = req.body.name
        res.send(userID)
    }
})

server.delete('/api/users/:id', (req, res) =>{
    const userID = IDmatch(req.params.id)
    if(!userID){
        res.status(404).send(`User was not found`)
    }else{
        const index = users.indexOf(userID);
        users.splice( index, 1)
        res.send(userID)
    }
})


server.listen(port, () => {
    console.log(`Listening to port:${port}.`)
})

