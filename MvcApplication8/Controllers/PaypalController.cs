using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MvcApplication8.Controllers
{
    public class PaypalController : ApiController
    {
        private string pEndPointURL = "https://api-3t.sandbox.paypal.com/nvp";
        private string apiUsername = "nenadpnc-facilitator_api1.gmail.com";
        private string APIPassword = "1369840751";
        private string APISignature = "AYccnoHSgpgGbdYCEbDESXIT4i7TA9MkX9sKJCDGqmSlZYJiSLKvQLrZ";
        private string version = "88.0";
        private string BNCode = "PP-ECWizard";
        
        [HttpPost]
        public HttpResponseMessage httpCall([FromBody]string param)
        {
            string url = pEndPointURL;
            string user = HttpUtility.UrlEncode(apiUsername);
            string pass = HttpUtility.UrlEncode(APIPassword);
            string signature = HttpUtility.UrlEncode(APISignature);
            string vers = HttpUtility.UrlEncode(version);
            string code = HttpUtility.UrlEncode(BNCode);
            param = param + "&USER=" + user + "&PWD=" + pass + "&SIGNATURE=" + signature + "&VERSION=" + vers + "&BUTTONSOURCE=" + code;
            
            HttpWebRequest objRequest = (HttpWebRequest)WebRequest.Create(url);
            objRequest.Timeout = 15000;
            objRequest.Method = "POST";
            objRequest.ContentLength = param.Length;
            try
            {
                using (StreamWriter myWriter = new StreamWriter(objRequest.GetRequestStream()))
                {
                    myWriter.Write(param);
                }
            }
            catch(Exception e)
            {

            }

            HttpWebResponse objResponse = (HttpWebResponse)objRequest.GetResponse();
            string result;
            using (StreamReader sr = new StreamReader(objResponse.GetResponseStream()))
            {
                result = sr.ReadToEnd();
            }
            HttpResponseMessage response = new HttpResponseMessage();
            response.Content = new StringContent(result);

            return response;
        }
    }
}
