import App from '@/app'
import Index from '@/pages/index/index'
import About from '@/pages/about/index'
import ChatRoom from '@/pages/chatRoom/index'
import User from '@/pages/user/index'
import Login from '@/pages/login/index'
import Data from '@/pages/data/index'

export const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        path: '',
        Component: Index
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'chatRoom',
        Component: ChatRoom
      },
      {
        path: 'user',
        Component: User
      },
      {
        path: 'data',
        Component: Data
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  }
]