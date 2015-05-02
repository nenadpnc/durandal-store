namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class narKorisnik : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Narudzbinas", "KorisnikId", c => c.String(maxLength: 128));
            AddForeignKey("dbo.Narudzbinas", "KorisnikId", "dbo.Korisniks", "Id");
            CreateIndex("dbo.Narudzbinas", "KorisnikId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Narudzbinas", new[] { "KorisnikId" });
            DropForeignKey("dbo.Narudzbinas", "KorisnikId", "dbo.Korisniks");
            DropColumn("dbo.Narudzbinas", "KorisnikId");
        }
    }
}
