namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class preporuceno : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proizvods", "Preporuceno", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Proizvods", "Preporuceno");
        }
    }
}
