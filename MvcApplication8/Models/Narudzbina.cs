using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Narudzbina
    {
        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public string NarudzbinaId { get; set; }
        public string KorisnikId { get; set; }
        public string ImePrezime { get; set; }
        public string Adresa { get; set; }
        public double Ukupno { get; set; }
        public string Grad { get; set; }
        public string Drzava { get; set; }
        public string PostanskiKod { get; set; }
        public DateTime Datum { get; set; }
        public string DatumIso { get; set; }
        public string Email { get; set; }
        public string KupacId { get; set; }
        public bool Isporuceno { get; set; }
        public virtual Korisnik Korisnik { get; set; }
        public virtual List<NarudzbinaDetalji> NarudzbinaDetalji { get; set; }
    }
}