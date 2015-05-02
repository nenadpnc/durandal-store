namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class drop : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends");
            DropForeignKey("dbo.Proizvods", "PodkategorijaId", "dbo.Podkategorijas");
            DropIndex("dbo.Proizvods", new[] { "BrendId" });
            DropIndex("dbo.Proizvods", new[] { "PodkategorijaId" });
            DropColumn("dbo.Proizvods", "PodkategorijaId");
            DropColumn("dbo.Proizvods", "BrendId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Proizvods", "BrendId", c => c.Int(nullable: false));
            AddColumn("dbo.Proizvods", "PodkategorijaId", c => c.Int(nullable: false));
            CreateIndex("dbo.Proizvods", "PodkategorijaId");
            CreateIndex("dbo.Proizvods", "BrendId");
            AddForeignKey("dbo.Proizvods", "PodkategorijaId", "dbo.Podkategorijas", "PodkategorijaId", cascadeDelete: true);
            AddForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends", "BrendId", cascadeDelete: true);
        }
    }
}
