const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const incidents = await connection('incidents').select('*')
            .join('users', 'users.id', '=', 'incidents.user_id')
            .select([
                'incidents.*',
                'users.name']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { type, value, date } = request.body;
        const user_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            type,
            value,
            date,
            user_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('user_id')
            .first();

        if (incident.user_id != user_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}