namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rute2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Rutes",
                c => new
                    {
                        RutaID = c.Int(nullable: false, identity: true),
                        name = c.String(),
                        url = c.String(),
                        moduleId = c.String(),
                        visible = c.Boolean(nullable: false),
                        settings = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RutaID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Rutes");
        }
    }
}
