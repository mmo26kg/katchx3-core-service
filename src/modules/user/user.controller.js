import buildOptions from '../../common/helper/buildOptions.js';
// import { ok, fail, notFound, serverError } from '../../common/helper/api.response';
import { ok, created, fail, notFound, serverError } from '../../common/helper/api.response.js';

function UserController(router, userService) {
    if (!router) throw new Error('Router is required');
    if (!userService) throw new Error('UserService is required');

    // List users with pagination
    router.get('/', async (req, res) => {
        try {
            const options = buildOptions(req.query);
            const result = await userService.listAndCount(options);
            return ok(result).send(res);
        } catch (error) {
            return fail('Failed to list users', error).send(res);
        }
    });
    // Get user by ID
    router.get('/:id', async (req, res) => {
        try {
            const user = await userService.getById(req.params.id);
            if (!user) return notFound('User not found').send(res);
            return ok(user).send(res);
        } catch (error) {
            return fail('Failed to get user', error).send(res);
        }
    });
    // Create new user
    router.post('/', async (req, res) => {
        try {
            const newUser = await userService.create(req.body);
            return created(newUser).send(res);
        } catch (error) {
            return fail('Failed to create user', error).send(res);
        }
    });
    // Update user by ID
    router.put('/:id', async (req, res) => {
        try {
            const updatedUser = await userService.update(req.params.id, req.body);
            if (!updatedUser) return notFound('User not found').send(res);
            return ok(updatedUser).send(res);
        } catch (error) {
            return fail('Failed to update user', error).send(res);
        }
    });
    // Delete user by ID
    router.delete('/:id', async (req, res) => {
        try {
            const deleted = await userService.delete(req.params.id);
            if (!deleted) return notFound('User not found').send(res);
            return ok(true).send(res);
        } catch (error) {
            return fail('Failed to delete user', error).send(res);
        }
    });

    return router;
}
export default UserController;
