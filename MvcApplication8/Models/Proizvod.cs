using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Proizvod
    {
        [Key]
        public int ProizvodID { get; set; }
        public int KategorijaID { get; set; }
        public int BrendId { get; set; }
        public string PodkatNaziv { get; set; }
        public string Naziv { get; set; }
        public string KratakOpis { get; set; }
        public string DugOpis { get; set; }
        public bool DaLiJe360 { get; set; }
        public string SlikaSrc { get; set; }
        public string Boja { get; set; }
        public double Cena { get; set; }
        public int Popust { get; set; }
        public DateTime Datum { get; set; }
        public int BrojFav { get; set; }
        public bool Preporuceno { get; set; }
        public int BrProd { get; set; }
        public virtual Brend Brend { get; set; }
        public virtual Kategorija Kategorija { get; set; }
        public virtual List<Komentar> Komentari { get; set; }
        public virtual List<Slika> Slike { get; set; }
        public virtual List<Velicina> Velicine { get; set; }
        public virtual List<FavProizvodi> FavProizvodi { get; set; }
    }

}