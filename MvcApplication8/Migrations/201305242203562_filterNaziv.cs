namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class filterNaziv : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Podkategorijas", "FilterNaziv", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Podkategorijas", "FilterNaziv");
        }
    }
}
