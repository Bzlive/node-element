import App from '@/app'
import Index from '@/pages/index/index'
import About from '@/pages/about/index'
import ChatRoom from '@/pages/chatRoom/index'
import User from '@/pages/user/index'

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
      }
    ]
  }
]