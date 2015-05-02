namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Rute : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Kategorijas", "Naziv", c => c.String());
            DropColumn("dbo.Kategorijas", "name");
            DropColumn("dbo.Kategorijas", "url");
            DropColumn("dbo.Kategorijas", "moduleId");
            DropColumn("dbo.Kategorijas", "visible");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Kategorijas", "visible", c => c.Boolean(nullable: false));
            AddColumn("dbo.Kategorijas", "moduleId", c => c.String());
            AddColumn("dbo.Kategorijas", "url", c => c.String());
            AddColumn("dbo.Kategorijas", "name", c => c.String());
            DropColumn("dbo.Kategorijas", "Naziv");
        }
    }
}
