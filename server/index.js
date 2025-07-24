const { app, startDatabase } = require('./app');
require('dotenv').config();

// Conectar BD y arrancar servidor
startDatabase()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error('Error al conectar MongoDB:', err.message);
    process.exit(1);
  }); 