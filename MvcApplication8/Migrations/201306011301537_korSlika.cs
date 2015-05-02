namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class korSlika : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Korisniks", "SlikaSrc", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Korisniks", "SlikaSrc");
        }
    }
}
