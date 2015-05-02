using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Kategorija
    {
        [Key]
        public int KategorijaID { get; set; }
        public string Naziv { get; set; }
        public virtual List<Proizvod> Proizvodi { get; set; }
        public virtual List<Podkategorija> Podkategorije { get; set; }
    }
}