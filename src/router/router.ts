import App from '@/app'
import Index from '@/pages/index/index'
import About from '@/pages/about/index'
import ChatRoom from '@/pages/chatRoom/index'
import User from '@/pages/user/index'
import Login from '@/pages/login/index'
import Data from '@/pages/data/index'
import JsPage from '@/pages/js/index'
import Flow from '@/pages/flow/index'
import Lottery from '@/pages/lottery/index'
import Hooks from '@/pages/hooks/index'

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
        path: 'js',
        Component: JsPage
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'flow',
        Component: Flow
      },
      {
        path: 'lottery',
        Component: Lottery
      },
      {
        path: 'hooks',
        Component: Hooks
      }
    ]
  }
]