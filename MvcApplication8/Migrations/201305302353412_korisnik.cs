namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class korisnik : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Korisniks", "Id", c => c.String());
            DropColumn("dbo.Korisniks", "Email");
            DropColumn("dbo.Korisniks", "Sifra");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Korisniks", "Sifra", c => c.String());
            AddColumn("dbo.Korisniks", "Email", c => c.String());
            DropColumn("dbo.Korisniks", "Id");
        }
    }
}
