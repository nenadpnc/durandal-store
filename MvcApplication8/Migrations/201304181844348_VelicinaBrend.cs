namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VelicinaBrend : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Brends",
                c => new
                    {
                        BrendId = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                        SlikaSrc = c.String(),
                    })
                .PrimaryKey(t => t.BrendId);
            
            CreateTable(
                "dbo.Velicinas",
                c => new
                    {
                        VelicinaId = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                        ProizvodID = c.Int(nullable: false),
                        Kolicina = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.VelicinaId)
                .ForeignKey("dbo.Proizvods", t => t.ProizvodID, cascadeDelete: true)
                .Index(t => t.ProizvodID);
            
            AddColumn("dbo.Proizvods", "BrendId", c => c.Int(nullable: false));
            AddColumn("dbo.Kategorijas", "Url", c => c.String());
            AddColumn("dbo.Kategorijas", "ModuleId", c => c.String());
            AddColumn("dbo.Kategorijas", "Visible", c => c.Boolean(nullable: false));
            AddForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends", "BrendId", cascadeDelete: true);
            CreateIndex("dbo.Proizvods", "BrendId");
            DropColumn("dbo.Proizvods", "Kolicina");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Proizvods", "Kolicina", c => c.Int(nullable: false));
            DropIndex("dbo.Velicinas", new[] { "ProizvodID" });
            DropIndex("dbo.Proizvods", new[] { "BrendId" });
            DropForeignKey("dbo.Velicinas", "ProizvodID", "dbo.Proizvods");
            DropForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends");
            DropColumn("dbo.Kategorijas", "Visible");
            DropColumn("dbo.Kategorijas", "ModuleId");
            DropColumn("dbo.Kategorijas", "Url");
            DropColumn("dbo.Proizvods", "BrendId");
            DropTable("dbo.Velicinas");
            DropTable("dbo.Brends");
        }
    }
}
