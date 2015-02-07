using System.Web;
using System.Web.Mvc;

namespace gulp_npm_bower_visual_studio
{
	public class FilterConfig
	{
		public static void RegisterGlobalFilters(GlobalFilterCollection filters)
		{
			filters.Add(new HandleErrorAttribute());
		}
	}
}
