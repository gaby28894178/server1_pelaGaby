import express from 'express'
import {join,dirname}from 'path'
import {fileURLToPath}from 'url'
import 'dotenv/config'

const __filename=fileURLToPath(import.meta.url)
const __dirname = dirname (__filename)
const app=express();
app.use(express.static(join(__dirname,'public')));

const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente welcome');
});

app.listen(PORT,()=>{
  console.log(`Servidor en http://localhost:${PORT}`)
})