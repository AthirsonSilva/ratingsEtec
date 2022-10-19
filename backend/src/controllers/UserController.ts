import { Request, Response } from 'express'
import User from '../schemas/User'

class UserController {
	public async index(req: Request, res: Response): Promise<Response> {
		const users = await User.find()

		return res.status(201).json({
			message: 'Users listed successfully',
			users,
		})
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const user = await User.create(req.body)

		user.fullName = function (): string {
			return `${this.firstName} ${this.lastName}`
		}

		user.fullName()

		return res.status(201).json({
			message: 'User created successfully',
			user,
		})
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { _id: _id } = req.params

		const user = await User.findByIdAndDelete(_id)

		return res.status(201).json({
			message: 'User deleted successfully',
			user,
		})
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { _id: _id } = req.params

		const user = await User.findByIdAndUpdate(_id, req.body, { new: true })

		return res.status(201).json({
			message: 'User updated successfully',
			user,
		})
	}
}

export default new UserController()
