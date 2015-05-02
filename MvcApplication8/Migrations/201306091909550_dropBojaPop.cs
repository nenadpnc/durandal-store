namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dropBojaPop : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Proizvods", "DaLiJeNaPopustu");
            DropColumn("dbo.Proizvods", "BojaVrednost");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Proizvods", "BojaVrednost", c => c.String());
            AddColumn("dbo.Proizvods", "DaLiJeNaPopustu", c => c.Boolean(nullable: false));
        }
    }
}
