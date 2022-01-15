using System.Net;
using System.Net.Mail;

namespace JsonPlace.Common.Helpers
{
    public static class SMTPMailHelper
    {
        public static bool SendMail(SMTPConfig smtpOpt, MailAddress deliveryAddress, string subject,string body)
        {
            var fromAddress = new MailAddress(smtpOpt.FromAddress, smtpOpt.FromName);

            var smtp = new SmtpClient
            {
                Host = smtpOpt.Host,
                Port = smtpOpt.Port,
                EnableSsl = smtpOpt.EnableSSL,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = smtpOpt.UseDefaultCredentials,
                Credentials = new NetworkCredential(fromAddress.Address, smtpOpt.FromPassword)
            };
            using (var message = new MailMessage(fromAddress, deliveryAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                try
                {
                    smtp.Send(message);
                }
                catch
                {
                    return false;
                }
            }

            return true;
        }
    }
}
