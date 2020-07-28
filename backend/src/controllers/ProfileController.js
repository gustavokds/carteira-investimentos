const connection = require('../database/connection');

module.exports = {

    async sum(request, response) {
        const user_id = request.headers.authorization;

        const [fixed] = await connection('incidents').sum('value')
            .where({
                user_id: user_id,
                type: 'Renda_fixa'
            });

        const [variable] = await connection('incidents').sum('value')
            .where({
                user_id: user_id,
                type: 'Renda_variavel'
            });

        return response.json({
            fixed: `${fixed['sum(`value`)']}`,
            variable: `${variable['sum(`value`)']}`
        });
    },

    async fixed(request, response) {
        const user_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where({
                user_id: user_id,
                type: 'Renda_fixa'
            })
            .select('*');

        return response.json(incidents);
    },

    async variable(request, response) {
        const user_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where({
                user_id: user_id,
                type: 'Renda_variavel'
            })
            .select('*');

        return response.json(incidents);
    }
}