namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class boja : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends");
            DropForeignKey("dbo.Bojas", "proizvodID", "dbo.Proizvods");
            DropIndex("dbo.Proizvods", new[] { "BrendId" });
            DropIndex("dbo.Bojas", new[] { "proizvodID" });
            RenameColumn(table: "dbo.Proizvods", name: "BrendId", newName: "Brend_BrendId");
            AddColumn("dbo.Proizvods", "Boja", c => c.String());
            AddColumn("dbo.Bojas", "Proizvod_ProizvodID", c => c.Int());
            AddForeignKey("dbo.Proizvods", "Brend_BrendId", "dbo.Brends", "BrendId");
            AddForeignKey("dbo.Bojas", "Proizvod_ProizvodID", "dbo.Proizvods", "ProizvodID");
            CreateIndex("dbo.Proizvods", "Brend_BrendId");
            CreateIndex("dbo.Bojas", "Proizvod_ProizvodID");
            DropColumn("dbo.Bojas", "proizvodID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Bojas", "proizvodID", c => c.Int(nullable: false));
            DropIndex("dbo.Bojas", new[] { "Proizvod_ProizvodID" });
            DropIndex("dbo.Proizvods", new[] { "Brend_BrendId" });
            DropForeignKey("dbo.Bojas", "Proizvod_ProizvodID", "dbo.Proizvods");
            DropForeignKey("dbo.Proizvods", "Brend_BrendId", "dbo.Brends");
            DropColumn("dbo.Bojas", "Proizvod_ProizvodID");
            DropColumn("dbo.Proizvods", "Boja");
            RenameColumn(table: "dbo.Proizvods", name: "Brend_BrendId", newName: "BrendId");
            CreateIndex("dbo.Bojas", "proizvodID");
            CreateIndex("dbo.Proizvods", "BrendId");
            AddForeignKey("dbo.Bojas", "proizvodID", "dbo.Proizvods", "ProizvodID", cascadeDelete: true);
            AddForeignKey("dbo.Proizvods", "BrendId", "dbo.Brends", "BrendId", cascadeDelete: true);
        }
    }
}
