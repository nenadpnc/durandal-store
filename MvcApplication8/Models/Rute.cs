using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MvcApplication8.Models
{
    public class Rute
    {
        [Key]
        public int RutaID { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public string moduleId { get; set; }
        public bool visible { get; set; }
        public int caption { get; set; }
    }
}