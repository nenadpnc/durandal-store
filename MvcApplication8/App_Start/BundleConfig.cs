using System;
using System.Web.Optimization;

namespace MvcApplication8
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/scripts/jquery-{version}.min.js")
                .Include("~/scripts/knockout-{version}.js")
                .Include("~/scripts/sammy-{version}.min.js")
                .Include("~/scripts/toastr-{version}.min.js")
                .Include("~/scripts/Q.min.js")
                .Include("~/scripts/breeze.min.js")
                .Include("~/scripts/bootstrap.min.js")
                .Include("~/scripts/moment.min.js")
                .Include("~/scripts/jquery.masonry.min.js")
                .Include("~/scripts/fotorama.js")
                .Include("~/scripts/jquery.threesixty.js")
                .Include("~/scripts/jquery.accordion.js")
                .Include("~/scripts/jquery.easing.1.3.js")
                .Include("~/scripts/google.js")
                .Include("~/scripts/facebook.js")
                .Include("~/scripts/jquery.mixitup.js")
                .Include("~/scripts/sco.collapse.js")
                .Include("~/scripts/jquery.sidr.min.js")
                .Include("~/scripts/kudos.js")
                .Include("~/scripts/bootstrap-maxlength.min.js")
                .Include("~/scripts/timeago.js")
                .Include("~/scripts/minicart.js")
                .Include("~/scripts/footable.js")
                .Include("~/scripts/footable.filter.js")
                .Include("~/scripts/footable.sortable.js")
                .Include("~/scripts/jquery.finger.js")
                .Include("~/scripts/jquery.signalR-{version}.min.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/css")
                .Include("~/Content/ie10mobile.css")
                .Include("~/Content/metro-bootstrap.css")
                .Include("~/Content/bootstrap-responsive.min.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/toastr.min.css")
                .Include("~/Content/font-awesome.min.css")
                .Include("~/Content/fotorama.css")
                .Include("~/Content/jquery.sidr.light.css")
                .Include("~/Content/kudos.css")
                .Include("~/Content/footable-0.1.css")
                .Include("~/Content/footable.sortable-0.1.css")
                .Include("~/Content/app.css")
              );

            bundles.Add(new ScriptBundle("~/scripts/admin")
                .Include("~/scripts/jquery-{version}.min.js")
                .Include("~/scripts/knockout-{version}.js")
                .Include("~/scripts/sammy-{version}.min.js")
                .Include("~/scripts/toastr-{version}.min.js")
                .Include("~/scripts/q.min.js")
                .Include("~/scripts/breeze.min.js")
                .Include("~/scripts/bootstrap.min.js")
                .Include("~/scripts/moment.min.js")
                .Include("~/scripts/chart.min.js")
                .Include("~/scripts/timeago.js")
                .Include("~/scripts/sco.collapse.js")
                .Include("~/scripts/footable.js")
                .Include("~/scripts/footable.filter.js")
                .Include("~/scripts/footable.sortable.js")
                .Include("~/scripts/dropzone.js")
                .Include("~/scripts/jquery.signalR-{version}.min.js")
                );
            bundles.Add(new StyleBundle("~/Content/admin")
                .Include("~/Content/metro-bootstrap.css")
                .Include("~/Content/bootstrap-responsive.min.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/toastr.min.css")
                .Include("~/Content/font-awesome.min.css")
                .Include("~/Content/footable-0.1.css")
                .Include("~/Content/footable.sortable-0.1.css")
                .Include("~/Content/basic.css")
                .Include("~/Content/admin.css")
                );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");

            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}