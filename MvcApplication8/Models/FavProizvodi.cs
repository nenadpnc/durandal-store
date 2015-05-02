using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class FavProizvodi
    {
        [Key]
        public int Id { get; set; }
        public int ProizvodId { get; set; }
        public string KorisnikId { get; set; }
        public virtual Proizvod Proizvod { get; set; }
        public virtual Korisnik Korisnik { get; set; }
        
    }
}