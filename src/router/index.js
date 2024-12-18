import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import FundList from '../views/FundList.vue'

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      { path: "", component: Home },
      { path: "/home", name: "home", component: Home },
      { path: "/infoShow", name: "infoShow", component: InfoShow },
      { path: "/fundList", name: "fundList", component: FundList },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404', // 定义一个明确的404页面路由
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('eleToken') ? true : false;
  if (to.path === '/login' || to.path === "/register") {
    next()
  } else {
    isLogin ?  next() : next('/login')
  }
})

export default router
