namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class cenaPrePopusta : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proizvods", "CenaPrePopusta", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Proizvods", "CenaPrePopusta");
        }
    }
}
