import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.delete('/users', UserController.delete)
routes.put('/users', UserController.update)

export default routes
