import { useRouter } from "vue-router";
import { asyncRoutes,notFoundRoute } from "../index"

export function asyncLoadRoutes(menus,router){
  console.log('router :>> ', router.getRoutes());

  if (!menus) {
    return
  }

  const newRoutes = filtersRoute(asyncRoutes,menus)
  console.log('newRoutes :>> ', newRoutes);
  
  newRoutes.forEach(route => router.addRoute(route));
  // router.addRoute(notFoundRoute)
  console.log('router :>> ', router.getRoutes());
}

function filtersRoute(routes,menus){
  return routes.filter(item => {
    if (menus.includes(item.name)) {
      if (item.children) {
        item.children = filtersRoute(item.children,menus)
      }
      return true
    }  
  })

}
