namespace MvcApplication8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class kategorije : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Kategorijas", "name", c => c.String());
            AlterColumn("dbo.Kategorijas", "url", c => c.String());
            AlterColumn("dbo.Kategorijas", "moduleId", c => c.String());
            AlterColumn("dbo.Kategorijas", "visible", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Kategorijas", "Visible", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Kategorijas", "ModuleId", c => c.String());
            AlterColumn("dbo.Kategorijas", "Url", c => c.String());
            AlterColumn("dbo.Kategorijas", "Name", c => c.String());
        }
    }
}
