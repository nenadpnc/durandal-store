namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rute3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rutes", "caption", c => c.Int(nullable: false));
            DropColumn("dbo.Rutes", "settings");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Rutes", "settings", c => c.Int(nullable: false));
            DropColumn("dbo.Rutes", "caption");
        }
    }
}
