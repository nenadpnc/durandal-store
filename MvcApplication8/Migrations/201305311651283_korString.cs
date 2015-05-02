namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class korString : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Komentars", "KorisnikID", "dbo.Korisniks");
            DropForeignKey("dbo.FavProizvodis", "KorisnikId", "dbo.Korisniks");
            DropIndex("dbo.Komentars", new[] { "KorisnikID" });
            DropIndex("dbo.FavProizvodis", new[] { "KorisnikId" });
            AlterColumn("dbo.Komentars", "KorisnikID", c => c.String(maxLength: 128));
            AlterColumn("dbo.Korisniks", "Id", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.FavProizvodis", "KorisnikId", c => c.String(maxLength: 128));
            DropPrimaryKey("dbo.Korisniks", new[] { "KorisnikID" });
            AddPrimaryKey("dbo.Korisniks", "Id");
            AddForeignKey("dbo.Komentars", "KorisnikID", "dbo.Korisniks", "Id");
            AddForeignKey("dbo.FavProizvodis", "KorisnikId", "dbo.Korisniks", "Id");
            CreateIndex("dbo.Komentars", "KorisnikID");
            CreateIndex("dbo.FavProizvodis", "KorisnikId");
            DropColumn("dbo.Korisniks", "KorisnikID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Korisniks", "KorisnikID", c => c.Int(nullable: false, identity: true));
            DropIndex("dbo.FavProizvodis", new[] { "KorisnikId" });
            DropIndex("dbo.Komentars", new[] { "KorisnikID" });
            DropForeignKey("dbo.FavProizvodis", "KorisnikId", "dbo.Korisniks");
            DropForeignKey("dbo.Komentars", "KorisnikID", "dbo.Korisniks");
            DropPrimaryKey("dbo.Korisniks", new[] { "Id" });
            AddPrimaryKey("dbo.Korisniks", "KorisnikID");
            AlterColumn("dbo.FavProizvodis", "KorisnikId", c => c.Int(nullable: false));
            AlterColumn("dbo.Korisniks", "Id", c => c.String());
            AlterColumn("dbo.Komentars", "KorisnikID", c => c.Int(nullable: false));
            CreateIndex("dbo.FavProizvodis", "KorisnikId");
            CreateIndex("dbo.Komentars", "KorisnikID");
            AddForeignKey("dbo.FavProizvodis", "KorisnikId", "dbo.Korisniks", "KorisnikID", cascadeDelete: true);
            AddForeignKey("dbo.Komentars", "KorisnikID", "dbo.Korisniks", "KorisnikID", cascadeDelete: true);
        }
    }
}
