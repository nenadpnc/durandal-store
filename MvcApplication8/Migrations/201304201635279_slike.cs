namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class slike : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Slika360",
                c => new
                    {
                        SlikaId = c.Int(nullable: false, identity: true),
                        ProizvodID = c.Int(nullable: false),
                        Src = c.String(),
                    })
                .PrimaryKey(t => t.SlikaId)
                .ForeignKey("dbo.Proizvods", t => t.ProizvodID, cascadeDelete: true)
                .Index(t => t.ProizvodID);
            
            DropColumn("dbo.Slikas", "DaLiJe360");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Slikas", "DaLiJe360", c => c.Boolean(nullable: false));
            DropIndex("dbo.Slika360", new[] { "ProizvodID" });
            DropForeignKey("dbo.Slika360", "ProizvodID", "dbo.Proizvods");
            DropTable("dbo.Slika360");
        }
    }
}
