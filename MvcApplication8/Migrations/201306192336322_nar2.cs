namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class nar2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Narudzbinas", "Korisnik_Id", "dbo.Korisniks");
            DropIndex("dbo.Narudzbinas", new[] { "Korisnik_Id" });
            DropTable("dbo.Narudzbinas");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Narudzbinas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        KorisnikId = c.Int(nullable: false),
                        Naziv = c.String(),
                        Cena = c.Double(nullable: false),
                        Kolicina = c.Int(nullable: false),
                        Velicina = c.String(),
                        SlikaSrc = c.String(),
                        Datum = c.DateTime(nullable: false),
                        DatumIso = c.String(),
                        Korisnik_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.Narudzbinas", "Korisnik_Id");
            AddForeignKey("dbo.Narudzbinas", "Korisnik_Id", "dbo.Korisniks", "Id");
        }
    }
}
