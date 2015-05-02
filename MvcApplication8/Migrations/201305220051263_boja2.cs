namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class boja2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Bojas", "Vrednost", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Bojas", "Vrednost");
        }
    }
}
