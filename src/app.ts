var bodyParser = require('body-parser')
import express, { Express } from 'express'
import mongoose, {ConnectionOptions} from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes/todoRoutes'

const app: Express = express();
app.use(bodyParser.json())


const PORT: string | number = process.env.PORT || 3001

// routes
app.use(todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hstgp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options: ConnectionOptions = { autoCreate: true, autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
    .connect(uri, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    })