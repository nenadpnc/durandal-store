using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Velicina
    {
        [Key]
        public int VelicinaId { get; set; }
        public string Naziv { get; set; }
        public int ProizvodID { get; set; }
        public int Kolicina { get; set; }
        public virtual Proizvod Proizvod { get; set; }
    }

}