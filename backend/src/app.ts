import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'

class App {
	public express: express.Application

	public constructor() {
		this.express = express()

		this.middlewares()
		this.database()
		this.routes()
	}

	private middlewares(): void {
		this.express.use(express.json())
		this.express.use(cors())
	}

	private database(): void {
		mongoose.connect('mysql://localhost:3306/dbratings', {
			useNewUrlParser: true,
		})
	}

	private routes(): void {
		this.express.use(routes)
	}
}

export default new App().express
