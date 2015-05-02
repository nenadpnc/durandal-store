using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Komentar
    {
        [Key]
        public int KomentarID { get; set; }
        public int ProizvodID { get; set; }
        public string Tekst { get; set; }
        public DateTime Datum { get; set; }
        public string DatumISO { get; set; }
        [Required, MaxLength(200)]
        public string KorisnikID { get; set; }
        public virtual Korisnik Korisnik { get; set; }
        public virtual Proizvod Proizvod { get; set; }
    }
}