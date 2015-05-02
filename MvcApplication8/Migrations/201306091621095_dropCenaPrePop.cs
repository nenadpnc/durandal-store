namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dropCenaPrePop : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Proizvods", "CenaPrePopusta");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Proizvods", "CenaPrePopusta", c => c.Double(nullable: false));
        }
    }
}
