import { NIcon } from "naive-ui";
import { RouterLink } from 'vue-router';



export function useMenus(routes, type,userMenus) {
  console.log('routes :>> ', routes);
  console.log('userMenus :>> ', userMenus);
  return loadMenus(routes, type,userMenus)
}

/**
 * 
 * @param routes 
 */
function loadMenus(routes, type,userMenus) {
  let res = []
  routes.forEach(route => {
    const { name, path, meta } = route;
    const routeName = name

    let menuChildren
    if (route.children && route.children.length > 0) {
      menuChildren = loadMenus(route.children, type,userMenus);
    }
    const menuItem = addMenuItem({
      routePath: path,
      title: meta?.title,
      routeName,
      children: menuChildren,
      icon: meta?.icon
    }, type)
    if(!meta.auth){
      if (!meta?.hide) {
        res.push(menuItem)
      }
    }else if(userMenus.includes(name)){
      if (!meta?.hide) {
        res.push(menuItem)
      }
    }
  })
  return res
}


function addMenuItem(config, type) {
  const { children, title, routePath, icon } = config
  let res = {}
  res.label = () =>
    h(
      RouterLink,
      {
        to: {
          path: routePath,
        },
        style: 'width:100%'
      },
      { default: () => title }
    )

  if (children && children.length > 1) {
    res.children = children
    res.label = title
  }

  if (type === 'Text') {
    res.label = title
  }

  res.key = routePath
  res.icon = renderIcon(icon || 'i-carbon-list')

  return res
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h('div', { class: icon, style: 'width: 20px;height:20px' }) })
}
