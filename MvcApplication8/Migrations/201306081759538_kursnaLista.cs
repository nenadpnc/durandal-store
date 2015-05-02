namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class kursnaLista : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.KursnaListas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                        Simbol = c.String(),
                        Odnos = c.Double(nullable: false),
                        Sifra = c.String(),
                        SlikaSrc = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.KursnaListas");
        }
    }
}
