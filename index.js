const express = require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

// middlewares
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ei4prfy.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

  try{
    const tasksListCollection = client.db('doTheTask').collection('tasksList')

   

  app.post('/taskslist', async(req, res)=>{
    const tasks = req.body
    console.log(tasks);
    const result = await tasksListCollection.insertOne(tasks)
    res.send(result)
  })


  app.get('/taskslist', async (req, res) => {
    const query = {};
    const task = await tasksListCollection.find(query).toArray();
    res.send(task)
})


  }
  finally{

  }
}

run().catch(console.log)

app.get('/', async(req, res)=>{
    res.send('do the task server is runnig')
})

app.listen(port, ()=> console.log(`do the job portal running on ${port}`))