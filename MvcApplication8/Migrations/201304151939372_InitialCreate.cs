namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Proizvods",
                c => new
                    {
                        ProizvodID = c.Int(nullable: false, identity: true),
                        KategorijaID = c.Int(nullable: false),
                        Naziv = c.String(),
                        KratakOpis = c.String(),
                        DugOpis = c.String(),
                        DaLiJe360 = c.Boolean(nullable: false),
                        DaLiJeNaPopustu = c.Boolean(nullable: false),
                        SlikaSrc = c.String(),
                        Kolicina = c.Int(nullable: false),
                        Cena = c.Double(nullable: false),
                        Popust = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProizvodID)
                .ForeignKey("dbo.Kategorijas", t => t.KategorijaID, cascadeDelete: true)
                .Index(t => t.KategorijaID);
            
            CreateTable(
                "dbo.Kategorijas",
                c => new
                    {
                        KategorijaID = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                    })
                .PrimaryKey(t => t.KategorijaID);
            
            CreateTable(
                "dbo.Komentars",
                c => new
                    {
                        KomentarID = c.Int(nullable: false, identity: true),
                        ProizvodID = c.Int(nullable: false),
                        Tekst = c.String(),
                        Datum = c.DateTime(nullable: false),
                        KorisnikID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.KomentarID)
                .ForeignKey("dbo.Korisniks", t => t.KorisnikID, cascadeDelete: true)
                .ForeignKey("dbo.Proizvods", t => t.ProizvodID, cascadeDelete: true)
                .Index(t => t.KorisnikID)
                .Index(t => t.ProizvodID);
            
            CreateTable(
                "dbo.Korisniks",
                c => new
                    {
                        KorisnikID = c.Int(nullable: false, identity: true),
                        ImePrezime = c.String(),
                        Email = c.String(),
                        Sifra = c.String(),
                    })
                .PrimaryKey(t => t.KorisnikID);
            
            CreateTable(
                "dbo.Slikas",
                c => new
                    {
                        SlikaID = c.Int(nullable: false, identity: true),
                        ProizvodID = c.Int(nullable: false),
                        Src = c.String(),
                        DaLiJe360 = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.SlikaID)
                .ForeignKey("dbo.Proizvods", t => t.ProizvodID, cascadeDelete: true)
                .Index(t => t.ProizvodID);
            
            CreateTable(
                "dbo.Bojas",
                c => new
                    {
                        BojaID = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                        proizvodID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.BojaID)
                .ForeignKey("dbo.Proizvods", t => t.proizvodID, cascadeDelete: true)
                .Index(t => t.proizvodID);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Bojas", new[] { "proizvodID" });
            DropIndex("dbo.Slikas", new[] { "ProizvodID" });
            DropIndex("dbo.Komentars", new[] { "ProizvodID" });
            DropIndex("dbo.Komentars", new[] { "KorisnikID" });
            DropIndex("dbo.Proizvods", new[] { "KategorijaID" });
            DropForeignKey("dbo.Bojas", "proizvodID", "dbo.Proizvods");
            DropForeignKey("dbo.Slikas", "ProizvodID", "dbo.Proizvods");
            DropForeignKey("dbo.Komentars", "ProizvodID", "dbo.Proizvods");
            DropForeignKey("dbo.Komentars", "KorisnikID", "dbo.Korisniks");
            DropForeignKey("dbo.Proizvods", "KategorijaID", "dbo.Kategorijas");
            DropTable("dbo.Bojas");
            DropTable("dbo.Slikas");
            DropTable("dbo.Korisniks");
            DropTable("dbo.Komentars");
            DropTable("dbo.Kategorijas");
            DropTable("dbo.Proizvods");
        }
    }
}
