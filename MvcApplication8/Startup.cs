using Microsoft.Owin;
using Owin;
[assembly: OwinStartup(typeof(MvcApplication8.Startup))]
namespace MvcApplication8
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}