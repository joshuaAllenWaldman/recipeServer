require('dotenv').config()
const express = require('express')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressJWT = require('express-jwt')
const {requireAuth, checkUser} = require('./authorizationMiddleware/authController')

const app = express();

const PORT =  process.env.PORT || 4000
const routes = require('./routes')


app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use(expressJWT({secret: process.env.JWT_SECRET, algorithms: ['HS256']}).unless({path: ['/api/v1/users/signup', '/api/v1/users/login' ]}))

app.use(checkUser)

app.get('/', (req, res) => {
  res.send(`
    <h1>Recipe Server has Begun.</h1>
  `)
})


app.use('/api/v1/users', routes.users)
app.use('/api/v1/recipes', routes.recipes)

app.listen(PORT, () => console.log(`Server connected running on port: ${PORT}`))