namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class narDetaljiProizvodId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.NarudzbinaDetaljis", "ProizvodId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.NarudzbinaDetaljis", "ProizvodId");
        }
    }
}
