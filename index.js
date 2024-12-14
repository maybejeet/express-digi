import express from 'express'

const app = express()
const port = 8000
app.use(express.json());

let teaData = []
let nextId = 1

//Add tea
app.post('/teas',(req,res)=>{
    const {name , price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(200).send(newTea)
})

//List all teas
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

//Get a tea with id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea) return res.status(404).send('Tea not found') 
    res.status(200).send(tea)
})

//Update a tea with id
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea) return res.status(404).send('Tea not found') 
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

//Delete tea
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1) return res.status(404).send("Tea not found")
    teaData.splice(index,1)
    res.status(200).send('Deleted')
})




app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
    
})

// app.get('/',(req,res)=>{
//     res.send(`Hi i am Jeet Kumar, the tea manager`)
// })
// app.get('/ice-tea',(req,res)=>{
//     res.send(`Which ice tea would u prefer?`)
// })
// app.get('/masala-tea',(req,res)=>{
//     res.send(`Which masala tea would u prefer?`)
// })
