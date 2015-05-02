namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class podKatNaziv : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proizvods", "PodkatNaziv", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Proizvods", "PodkatNaziv");
        }
    }
}
