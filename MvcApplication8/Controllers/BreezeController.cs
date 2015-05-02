using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Breeze.WebApi;
using MvcApplication8.Models;
using Newtonsoft.Json.Linq;

namespace MvcApplication8.Controllers
{
    [BreezeController]
    public class BreezeController : ApiController
    {
        readonly EFContextProvider<ProizvodiContext> _contextProvider = new EFContextProvider<ProizvodiContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IQueryable<Proizvod> Proizvodi()
        {
            return _contextProvider.Context.Proizvodi;
        }

        [HttpGet]
        public IQueryable<Kategorija> Kategorije()
        {
            return _contextProvider.Context.Kategorije;
        }
        [HttpGet]
        public IQueryable<Podkategorija> Podkategorije()
        {
            return _contextProvider.Context.Podkategorije;
        }
        [HttpGet]
        public IQueryable<Slika> Slike()
        {
            return _contextProvider.Context.Slike;
        }
        [HttpGet]
        public IQueryable<Boja> Boje()
        {
            return _contextProvider.Context.Boje;
        }
        [HttpGet]
        public IQueryable<Velicina> Velicine() 
        {
            return _contextProvider.Context.Velicine;        
        }
        [HttpGet]
        public IQueryable<Brend> Brendovi()
        {
            return _contextProvider.Context.Brendovi;
        }
        [HttpGet]
        public IQueryable<Rute> Rute() 
        {
            return _contextProvider.Context.Rute;
        }
        [HttpGet]
        public IQueryable<FavProizvodi> FavProizvodi()
        {
            return _contextProvider.Context.FavProizvodi;
        }
        [HttpGet]
        public IQueryable<Korisnik> Korisnici()
        {
            return _contextProvider.Context.Korisnici;
        }
        [HttpGet]
        public IQueryable<Komentar> Komentari()
        {
            return _contextProvider.Context.Komentari;
        }
        [HttpGet]
        public IQueryable<KursnaLista> KursnaLista()
        {
            return _contextProvider.Context.KursnaLista;
        }
        [HttpGet]
        public IQueryable<Narudzbina> Narudzbine()
        {
            return _contextProvider.Context.Narudzbina;
        }
        public IQueryable<NarudzbinaDetalji> NarudzbinaDetalji()
        {
            return _contextProvider.Context.NarudzbinaDetalji;
        }
    }
}