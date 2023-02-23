const router = [
    {
        path : '/',
        component : () => import('../layout/layout'),
        children : [
            {
                path : '',
                component : () => import('../pages/home/home')
            }
        ]
    },
    {
        path : '/login',
        component : () => import('../layout/layout'),
        children : [
            {
                path : '',
                component : () => import('../pages/home/home')
            }
        ]
    },
]

export default router;