namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class narudzbina2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Narudzbinas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        KorisnikId = c.String(maxLength: 128),
                        Naziv = c.String(),
                        Cena = c.Double(nullable: false),
                        Kolicina = c.Int(nullable: false),
                        Velicina = c.String(),
                        SlikaSrc = c.String(),
                        Datum = c.DateTime(nullable: false),
                        DatumIso = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Korisniks", t => t.KorisnikId)
                .Index(t => t.KorisnikId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Narudzbinas", new[] { "KorisnikId" });
            DropForeignKey("dbo.Narudzbinas", "KorisnikId", "dbo.Korisniks");
            DropTable("dbo.Narudzbinas");
        }
    }
}
