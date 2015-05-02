namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class bojaVrednost : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proizvods", "BojaVrednost", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Proizvods", "BojaVrednost");
        }
    }
}
