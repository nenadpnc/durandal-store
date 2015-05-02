namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migr : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proizvods", "BrProd", c => c.Int(nullable: false));
            AddColumn("dbo.Korisniks", "DatumIso", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Korisniks", "DatumIso");
            DropColumn("dbo.Proizvods", "BrProd");
        }
    }
}
