namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class brojFrejmova : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Slika360", "BrojFrejmova", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Slika360", "BrojFrejmova");
        }
    }
}
