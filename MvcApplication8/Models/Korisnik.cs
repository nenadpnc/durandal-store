using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Korisnik
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public string Id { get; set; }
        public string ImePrezime { get; set; }
        public string SlikaSrc { get; set; }
        public string DatumIso { get; set; }
        public virtual List<Komentar> Komentari { get; set; }
        public virtual List<FavProizvodi> FavProizvodi { get; set; }
        public virtual List<Narudzbina> Narudzbine { get; set; }
    }
}