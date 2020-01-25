const express = require('express')
const Routes = require('./routes')

const app = express()

let total = 0;
app.use( (req,res, next) => {
    total = total + 1;
    console.log(`Total de requisições feita ${total}`)
    return next()
})

app.use(express.json())
app.use(Routes)


app.listen(3000)