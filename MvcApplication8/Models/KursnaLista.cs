using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class KursnaLista
    {
        [Key]
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string Simbol { get; set; }
        public double Odnos { get; set; }
        public string Sifra { get; set; }
        public string SlikaSrc { get; set; }
    }
}