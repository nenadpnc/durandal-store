using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Podkategorija
    {
        [Key]
        public int PodkategorijaId { get; set; }
        public int KategorijaId { get; set; }
        public string Naziv { get; set; }
        public string FilterNaziv { get; set; }
        public virtual Kategorija Kategorija { get; set; }
    }
}