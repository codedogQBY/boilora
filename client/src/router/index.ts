import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/pages/home.vue'
import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'
import NotFound from '@/pages/not-found.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('@/pages/forgot-password.vue'),
    meta: {
      title: '忘记密码',
    },
  },
  {
    path: '/reset-password',
    name: 'resetPassword',
    component: () => import('@/pages/forgot-password.vue'),
    meta: {
      title: '重置密码',
    },
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/pages/verify.vue'),
    meta: {
      title: '邮箱验证',
    },
  },
  {
    path: '/doc',
    name: 'doc',
    component: () => import('@/pages/doc.vue'),
    meta: {
      title: '知识库',
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound,
    meta: {
      title: '页面不存在',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    from
    document.title = `${to.meta.title} - 高效工作平台`
  }

  // 这里可以添加身份验证逻辑
  // 比如检查用户是否已登录，未登录用户访问需要授权的页面时重定向到登录页面
  // const isAuthenticated = localStorage.getItem('token')
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next({ name: 'login' })
  // } else {
  //   next()
  // }

  next()
})

export default router
