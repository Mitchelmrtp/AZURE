import app from './app.js';
import sequelize from './src/config/database.js';
import EmailService from './src/services/EmailService.js';

const PORT = 8080;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');
    
    await sequelize.sync();
    console.log('✅ Modelos sincronizados con la base de datos.');

    // Verificar configuración de EmailService
    await EmailService.verificarConexion();

    const port = process.env.PORT || 8080

    app.listen(port, () => {
        console.log('Servidor iniciado. Escuchando en puerto ' + port)
    })


  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();
