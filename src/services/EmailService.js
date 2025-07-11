import nodemailer from "nodemailer";
import { CONFIG } from "../config/constants.js";

// Configuración específica y robusta para Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true para puerto 465, false para otros puertos
  auth: {
    user: CONFIG.EMAIL_USER,
    pass: CONFIG.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Permitir certificados auto-firmados
  },
  // Configuraciones adicionales para Gmail
  pool: true,
  maxConnections: 1,
  rateDelta: 20000,
  rateLimit: 5,
});

class EmailService {
  async enviarCorreo(to, subject, message) {
    try {
      console.log(`📧 Enviando correo a: ${to}`);
      console.log(`📧 Asunto: ${subject}`);
      
      const result = await transporter.sendMail({
        from: `"PsicoApp - Plataforma de Bienestar Mental" <${CONFIG.EMAIL_USER}>`,
        to,
        subject,
        text: message,
        html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${message}</pre>`,
      });
      
      console.log(`✅ Correo enviado exitosamente: ${result.messageId}`);
      return result;
    } catch (error) {
      console.error("❌ Error enviando correo:", error.message);
      console.log("💡 Tip: Configura las credenciales de Gmail en el archivo .env para enviar correos reales");
      // No lanzar error para que no falle la creación de sesiones
      return { error: error.message, sent: false };
    }
  }

  // Método para verificar la conexión
  async verificarConexion() {
    try {
      await transporter.verify();
      console.log("✅ EmailService: Conexión verificada exitosamente");
      return true;
    } catch (error) {
      console.error("❌ EmailService: Error de conexión:", error.message);
      console.warn("⚠️ La aplicación continuará sin servicios de email.");
      return false;
    }
  }
}

export default new EmailService();
