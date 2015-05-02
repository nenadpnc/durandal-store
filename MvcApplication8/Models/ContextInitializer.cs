using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class ContextInitializer : CreateDatabaseIfNotExists<ProizvodiContext>
    {
        protected override void Seed(ProizvodiContext context)
        {
            base.Seed(context);

            context.Kategorije.Add(new Kategorija
            {
                Naziv = "Patike"
            });

            context.Proizvodi.Add(new Proizvod
            {
                KategorijaID = 1,
                Naziv = "Converse",
                KratakOpis = "asdklajsd asds sad",
                DugOpis = "asdk asdada sdada dadaadad",
                DaLiJe360 = false,
                SlikaSrc = "../../Content/images/260x180.gif",
                Popust = 0,
                Cena = 5700
            });
            context.Proizvodi.Add(new Proizvod
            {
                KategorijaID = 1,
                Naziv = "Nike",
                KratakOpis = "asdklajsd asds sad",
                DugOpis = "asdk asdada sdada dadaadad",
                DaLiJe360 = false,
                SlikaSrc = "../../Content/images/260x180.gif",
                Popust = 0,
                Cena = 6750
            });
            context.Proizvodi.Add(new Proizvod
            {
                KategorijaID = 1,
                Naziv = "Fila",
                KratakOpis = "asdklajsd asds sad",
                DugOpis = "asdk asdada sdada dadaadad",
                DaLiJe360 = false,
                SlikaSrc = "../../Content/images/260x180.gif",
                Popust = 0,
                Cena = 4550
            });

            context.SaveChanges();
        }
    }
}