using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MvcApplication8.Controllers
{
    public class UploadController : ApiController
    {
        public async Task<HttpResponseMessage> uploadThumb()
        {
            if (!Request.Content.IsMimeMultipartContent()) 
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string path = HttpContext.Current.Server.MapPath("~/SlikeTest/");
            var provider = new MultipartFormDataStreamProvider(path);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        var fullPath = path + val;
                        if (File.Exists(fullPath))
                        {
                            File.Delete(fullPath);
                        }
                    }
                }

                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        public async Task<HttpResponseMessage> uploadSlike()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string path = HttpContext.Current.Server.MapPath("~/SlikeTest/");
            var provider = new MultipartFormDataStreamProvider(path);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
