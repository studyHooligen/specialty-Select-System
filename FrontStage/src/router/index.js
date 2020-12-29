import Vue from 'vue'
import Router from 'vue-router'

import SystemPage from '@/components/views/SystemPage'
import HomePage from '@/components/views/HomePage'
import LessonChoice from '@/components/components/HomePage/RouteView/LessonChoice'
import Notice from '@/components/components/HomePage/RouteView/Notice'
import Success from '@/components/components/HomePage/RouteView/Success'

import Login from '@/components/views/Login'
import LoginAdmin from '@/components/views/LoginAdmin'

import AdminSystemPage from '@/components/views/AdminSystemPage'
import AdminSystem from '@/components/components/AdminPage/AdminForm'
import RegisterForm from '@/components/components/AdminPage/RouteView/RegisterForm'
import SystemSetting from '@/components/components/AdminPage/RouteView/SystemSetting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'SystemPage',
      component: SystemPage,
      children:[
        {
          path: '/',
          name: 'HomePage',
          component: HomePage,
          children:[
            {
              path: '/',
              name: 'Notice',
              component: Notice
            },
            {
              path: '/Choice/LessonChoice',
              name: 'LessonChoice',
              component: LessonChoice
            },
            {
              path: '/Choice/Success',
              name: 'Success',
              component: Success
            }
          ]
        },
      ]
    },
    {
      path: '/LoginAdmin',
      name: 'LoginAdmin',
      component: LoginAdmin,
    },
    {
      path: '/AdminSystemPage',
      name: 'AdminSystemPage',
      component: AdminSystemPage,
      children:[
        {
          path: '/AdminSystemPage',
          name: 'AdminSystem',
          component: AdminSystem,
          children:[
            {
              path: '/AdminSystemPage/',
              name: 'RegisterForm',
              component: RegisterForm
            },
            {
              path: '/AdminSystemPage/SystemSetting',
              name: 'SystemSetting',
              component: SystemSetting
            }
          ]
        },
      ]
    },
  ]
})
