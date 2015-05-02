namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class brendNaziv : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proizvods", "BrendNaziv", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Proizvods", "BrendNaziv");
        }
    }
}
