namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Kategorija : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Kategorijas", "Name", c => c.String());
            DropColumn("dbo.Kategorijas", "Naziv");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Kategorijas", "Naziv", c => c.String());
            DropColumn("dbo.Kategorijas", "Name");
        }
    }
}
