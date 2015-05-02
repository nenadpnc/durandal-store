namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class brendZamena : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proizvods", "BrendId", c => c.Int(nullable: true));
            AddForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends", "BrendId", cascadeDelete: false);
            CreateIndex("dbo.Proizvods", "BrendId");
            DropColumn("dbo.Proizvods", "BrendNaziv");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Proizvods", "BrendNaziv", c => c.String());
            DropIndex("dbo.Proizvods", new[] { "BrendId" });
            DropForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends");
            DropColumn("dbo.Proizvods", "BrendId");
        }
    }
}
