namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class datumIso : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Komentars", "DatumISO", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Komentars", "DatumISO");
        }
    }
}
