export default [
  {
    path: '/beers/categories',
    name: 'beers-categories',
    component: () =>
      import(
        /* webpackChunkName: "beers-categories" */ '@/components/BeersCategories.vue'
      )
  },
  {
    path: '/beers/display',
    name: 'beers-view',
    component: () =>
      import(/* webpackChunkName: "beers-view" */ '@/components/Beer.vue')
  },
  {
    path: '/beers/browser',
    name: 'beers-browser',
    component: () =>
      import(
        /* webpackChunkName: "beers-browser" */ '@/components/BeersBrowser.vue'
      ),
    props: route => ({ selectedCategory: route.query.c })
  }
]
