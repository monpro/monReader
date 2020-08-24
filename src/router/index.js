import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/library'
  },
  {
    path: '/ebook',
    component: () => import('../views/ebook/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('../components/ebook/EbookReader.vue')
      }
    ]
  },
  {
    path: '/library',
    component: () => import('../views/library/index.vue'),
    redirect: '/library/shelf',
    children: [
      {
        path: 'home',
        component: () => import('../views/library/LibraryHome.vue')
      },
      {
        path: 'list',
        component: () => import('../views/library/LibraryList')
      },
      {
        path: 'detail',
        component: () => import('../views/library/LibraryDetail')
      },
      {
        path: 'shelf',
        component: () => import('../views/library/LibraryShelf')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
