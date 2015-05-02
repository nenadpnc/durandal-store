namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class slikaUpdate : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Slika360", "ProizvodID", "dbo.Proizvods");
            DropIndex("dbo.Slika360", new[] { "ProizvodID" });
            AddColumn("dbo.Slikas", "BrojFrejmova", c => c.Int(nullable: false));
            AddColumn("dbo.Slikas", "DaLiJe360", c => c.Boolean(nullable: false));
            DropTable("dbo.Slika360");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Slika360",
                c => new
                    {
                        SlikaId = c.Int(nullable: false, identity: true),
                        ProizvodID = c.Int(nullable: false),
                        Src = c.String(),
                        BrojFrejmova = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.SlikaId);
            
            DropColumn("dbo.Slikas", "DaLiJe360");
            DropColumn("dbo.Slikas", "BrojFrejmova");
            CreateIndex("dbo.Slika360", "ProizvodID");
            AddForeignKey("dbo.Slika360", "ProizvodID", "dbo.Proizvods", "ProizvodID", cascadeDelete: true);
        }
    }
}
