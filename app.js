const express = require('express')
const app = express()
const port = 3000

app.get ('/', (req,res) => {
  res.send ('This is a restaurant list')
})

app.listen (port, () => {
  console.log (`Express is running on http://locolhost:${port}`)
})