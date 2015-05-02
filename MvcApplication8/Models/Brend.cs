using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Brend
    {
        [Key]
        public int BrendId { get; set; }
        public string Naziv { get; set; }
        public string SlikaSrc { get; set; }
        public virtual List<Proizvod> Proizvodi { get; set; }
    }
}