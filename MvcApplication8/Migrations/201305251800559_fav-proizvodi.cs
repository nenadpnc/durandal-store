namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class favproizvodi : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FavProizvodis",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProizvodId = c.Int(nullable: false),
                        KorisnikId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Proizvods", t => t.ProizvodId, cascadeDelete: true)
                .ForeignKey("dbo.Korisniks", t => t.KorisnikId, cascadeDelete: true)
                .Index(t => t.ProizvodId)
                .Index(t => t.KorisnikId);
            
            AddColumn("dbo.Proizvods", "BrojFav", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropIndex("dbo.FavProizvodis", new[] { "KorisnikId" });
            DropIndex("dbo.FavProizvodis", new[] { "ProizvodId" });
            DropForeignKey("dbo.FavProizvodis", "KorisnikId", "dbo.Korisniks");
            DropForeignKey("dbo.FavProizvodis", "ProizvodId", "dbo.Proizvods");
            DropColumn("dbo.Proizvods", "BrojFav");
            DropTable("dbo.FavProizvodis");
        }
    }
}
