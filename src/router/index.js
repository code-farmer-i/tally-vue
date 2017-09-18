import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home/Home'
import Day from '@/pages/Home/children/Day'

const Month = r => require.ensure([], () => r(require('../pages/Home/children/Month')), 'Month')
const Chart = r => require.ensure([], () => r(require('../pages/Home/children/Chart')), 'Chart')
const User = r => require.ensure([], () => r(require('../pages/Home/children/User')), 'User')

const AddRecord = r => require.ensure([], () => r(require('../pages/AddRecord/AddRecord')), 'AddRecord')
const FeedBack = r => require.ensure([], () => r(require('../pages/FeedBack/FeedBack')), 'FeedBack')
const Sort = r => require.ensure([], () => r(require('../pages/Sort/Sort')), 'Sort')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Day'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[{
        path: '/Day',
        name: 'Day',
        component: Day,
        meta:{
          title: '日消费'
        }
      },{
        path: '/Month',
        name: 'Month',
        component: Month,
        meta:{
          title: '月消费'
        }
      },{
        path: '/Chart',
        name: 'Chart',
        component: Chart,
        meta:{
          title: '月消费统计'
        }
      },{
        path: '/User',
        name: 'User',
        component: User,
        meta:{
          title: '用户中心'
        }
      }]
    },
    {
      path: '/Day/AddRecord',
      name: 'AddRecord',
      component: AddRecord
    },
    {
      path: '/User/FeedBack',
      name: 'FeedBack',
      component: FeedBack
    },
    {
      path: '/Day/AddRecord/Sort/:sortId',
      name: 'Sort',
      component: Sort
    }
  ]
})
