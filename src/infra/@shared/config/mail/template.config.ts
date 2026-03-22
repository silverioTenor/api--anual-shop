export const mailTemplateConfig = {
   templateDefault: {
      from: 'noreply@anualshop.com',
      to: '',
      logo: 'https://anualshop.com/logo.png',
      companyName: 'AnualShop',
      disclaimer: 'This is an automated message, please do not reply.',
      styles: {
         fontFamily: 'Arial, sans-serif',
         color: '#333',
         backgroundColor: '#f9f9f9',
         buttonColor: '#4F46E5',
         buttonTextColor: '#fff',
      }
   },
   recoveryPass: {
      subject: 'Password Recovery',
      body: {
         title: 'Password Recovery Instructions',
         userName: '',
         message: 'Click the link below to reset your password.',
         buttonText: 'Reset Password',
         buttonLink: 'https://anualshop.com/reset-password?token=some-token',
      },
   },
};
