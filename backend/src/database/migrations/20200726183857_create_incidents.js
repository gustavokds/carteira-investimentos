
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('type').notNullable();
        table.decimal('value').notNullable();
        table.date('date').notNullable();
        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function (knex) {
    return schema.dropTable('incidents');
};
