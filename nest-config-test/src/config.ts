export default async () => {
  const dbPort = await 3306;

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || dbPort,
    },
  };
};
