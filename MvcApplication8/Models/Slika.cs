using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Slika
    {
        [Key]
        public int SlikaID { get; set; }
        public int ProizvodID { get; set; }
        public string Src { get; set; }
        public int BrojFrejmova { get; set; }
        public bool DaLiJe360 { get; set; }
        public virtual Proizvod Proizvod { get; set; }

    }
}