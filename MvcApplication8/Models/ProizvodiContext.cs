using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class ProizvodiContext: DbContext
    {
        public ProizvodiContext()
			: base("SPAConnection")
		{
            //Database.SetInitializer<ProizvodiContext>(new ContextInitializer());
		}

        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<Kategorija> Kategorije { get; set; }
        public DbSet<Komentar> Komentari { get; set; }
        public DbSet<Slika> Slike { get; set; }
        public DbSet<Boja> Boje { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Brend> Brendovi { get; set; }
        public DbSet<Velicina> Velicine { get; set; }
        public DbSet<Rute> Rute { get; set; }
        public DbSet<Podkategorija> Podkategorije { get; set; }
        public DbSet<FavProizvodi> FavProizvodi { get; set; }
        public DbSet<KursnaLista> KursnaLista { get; set; }
        public DbSet<Narudzbina> Narudzbina { get; set; }
        public DbSet<NarudzbinaDetalji> NarudzbinaDetalji { get; set; }
    }
}