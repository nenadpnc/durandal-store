using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Boja
    {
        [Key]
        public int BojaID { get; set; }
        public string Naziv { get; set; }
        public string Vrednost { get; set; }
    }
}