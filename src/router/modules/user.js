/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/user/index'),
      name: 'user',
      meta: { title: '用户管理' }
    },
    {
      path: 'user/edit/:id',
      component: () => import('@/views/system/user/edit'),
      hidden: true,
      name: 'user',
      meta: { title: '编辑用户' }
    }
  ]
}
export default userRouter
