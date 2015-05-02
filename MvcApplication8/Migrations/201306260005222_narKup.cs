namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class narKup : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Narudzbinas", "KupacId", c => c.String());
            DropColumn("dbo.Narudzbinas", "TransakcijaId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Narudzbinas", "TransakcijaId", c => c.String());
            DropColumn("dbo.Narudzbinas", "KupacId");
        }
    }
}
