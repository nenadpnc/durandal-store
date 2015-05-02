using System;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace MvcApplication8
{
    public class ProizvodHub : Hub
    {
        public void AzurirajVelicine(string proizvodi)
        {
            Clients.All.azurirajZalihe(proizvodi);
        }
    }
}