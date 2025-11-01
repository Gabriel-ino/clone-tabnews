import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const verifyConnection = await database.query(
    "SELECT current_setting('server_version')  AS version;",
  );
  const postgresMaxConnections = await database.query("SHOW max_connections;");
  const databaseName = process.env.POSTGRES_DB;
  const postgresUsedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const postgresUsedConnectionsValue = postgresUsedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: verifyConnection.rows[0].version,
        max_connections: parseInt(
          postgresMaxConnections.rows[0].max_connections,
        ),
        used_connections: postgresUsedConnectionsValue,
      },
    },
  });
}
export default status;
