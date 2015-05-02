namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class narudzbinaDetalji : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Narudzbinas", "KorisnikId", "dbo.Korisniks");
            DropIndex("dbo.Narudzbinas", new[] { "KorisnikId" });
            CreateTable(
                "dbo.NarudzbinaDetaljis",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NarudzbinaId = c.String(maxLength: 128),
                        Naziv = c.String(),
                        Cena = c.Double(nullable: false),
                        Kolicina = c.Int(nullable: false),
                        Velicina = c.String(),
                        SlikaSrc = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Narudzbinas", t => t.NarudzbinaId)
                .Index(t => t.NarudzbinaId);
            
            AddColumn("dbo.Narudzbinas", "NarudzbinaId", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.Narudzbinas", "ImePrezime", c => c.String());
            AddColumn("dbo.Narudzbinas", "Adresa", c => c.String());
            AddColumn("dbo.Narudzbinas", "Ukupno", c => c.Double(nullable: false));
            AddColumn("dbo.Narudzbinas", "Grad", c => c.String());
            AddColumn("dbo.Narudzbinas", "Drzava", c => c.String());
            AddColumn("dbo.Narudzbinas", "PostanskiKod", c => c.String());
            AddColumn("dbo.Narudzbinas", "Email", c => c.String());
            AddColumn("dbo.Narudzbinas", "TransakcijaId", c => c.String());
            AddColumn("dbo.Narudzbinas", "Isporuceno", c => c.Boolean(nullable: false));
            DropPrimaryKey("dbo.Narudzbinas", new[] { "Id" });
            AddPrimaryKey("dbo.Narudzbinas", "NarudzbinaId");
            DropColumn("dbo.Narudzbinas", "Id");
            DropColumn("dbo.Narudzbinas", "KorisnikId");
            DropColumn("dbo.Narudzbinas", "Naziv");
            DropColumn("dbo.Narudzbinas", "Cena");
            DropColumn("dbo.Narudzbinas", "Kolicina");
            DropColumn("dbo.Narudzbinas", "Velicina");
            DropColumn("dbo.Narudzbinas", "SlikaSrc");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Narudzbinas", "SlikaSrc", c => c.String());
            AddColumn("dbo.Narudzbinas", "Velicina", c => c.String());
            AddColumn("dbo.Narudzbinas", "Kolicina", c => c.Int(nullable: false));
            AddColumn("dbo.Narudzbinas", "Cena", c => c.Double(nullable: false));
            AddColumn("dbo.Narudzbinas", "Naziv", c => c.String());
            AddColumn("dbo.Narudzbinas", "KorisnikId", c => c.String(maxLength: 128));
            AddColumn("dbo.Narudzbinas", "Id", c => c.Int(nullable: false, identity: true));
            DropIndex("dbo.NarudzbinaDetaljis", new[] { "NarudzbinaId" });
            DropForeignKey("dbo.NarudzbinaDetaljis", "NarudzbinaId", "dbo.Narudzbinas");
            DropPrimaryKey("dbo.Narudzbinas", new[] { "NarudzbinaId" });
            AddPrimaryKey("dbo.Narudzbinas", "Id");
            DropColumn("dbo.Narudzbinas", "Isporuceno");
            DropColumn("dbo.Narudzbinas", "TransakcijaId");
            DropColumn("dbo.Narudzbinas", "Email");
            DropColumn("dbo.Narudzbinas", "PostanskiKod");
            DropColumn("dbo.Narudzbinas", "Drzava");
            DropColumn("dbo.Narudzbinas", "Grad");
            DropColumn("dbo.Narudzbinas", "Ukupno");
            DropColumn("dbo.Narudzbinas", "Adresa");
            DropColumn("dbo.Narudzbinas", "ImePrezime");
            DropColumn("dbo.Narudzbinas", "NarudzbinaId");
            DropTable("dbo.NarudzbinaDetaljis");
            CreateIndex("dbo.Narudzbinas", "KorisnikId");
            AddForeignKey("dbo.Narudzbinas", "KorisnikId", "dbo.Korisniks", "Id");
        }
    }
}
