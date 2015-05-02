namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class podkategorija : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Podkategorijas",
                c => new
                    {
                        PodkategorijaId = c.Int(nullable: false, identity: true),
                        KategorijaId = c.Int(nullable: false),
                        Naziv = c.String(),
                    })
                .PrimaryKey(t => t.PodkategorijaId)
                .ForeignKey("dbo.Kategorijas", t => t.KategorijaId, cascadeDelete: false)
                .Index(t => t.KategorijaId);
            
            AddColumn("dbo.Proizvods", "PodkategorijaId", c => c.Int(nullable: true));
            AddForeignKey("dbo.Proizvods", "PodkategorijaId", "dbo.Podkategorijas", "PodkategorijaId", cascadeDelete: false);
            CreateIndex("dbo.Proizvods", "PodkategorijaId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Podkategorijas", new[] { "KategorijaId" });
            DropIndex("dbo.Proizvods", new[] { "PodkategorijaId" });
            DropForeignKey("dbo.Podkategorijas", "KategorijaId", "dbo.Kategorijas");
            DropForeignKey("dbo.Proizvods", "PodkategorijaId", "dbo.Podkategorijas");
            DropColumn("dbo.Proizvods", "PodkategorijaId");
            DropTable("dbo.Podkategorijas");
        }
    }
}
