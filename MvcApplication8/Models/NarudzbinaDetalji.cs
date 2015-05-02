using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class NarudzbinaDetalji
    {
        [Key]
        public int Id { get; set; }
        public string NarudzbinaId { get; set; }
        public int ProizvodId { get; set; }
        public string Naziv { get; set; }
        public double Cena { get; set; }
        public int Kolicina { get; set; }
        public string Velicina { get; set; }
        public string SlikaSrc { get; set; }
        public virtual Narudzbina Narudzbina { get; set; }
    }
}