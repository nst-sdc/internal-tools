import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/submit-project-details',
      name: 'submit-project-details',
      component: () => import('../pages/SubmitProjectDetailsPage.vue'),
    },
    {
      path: '/submit-gsoc-details',
      name: 'submit-gsoc-details',
      component: () =>
        import('../pages/SubmitGoogleSummerOfCodeDetailsPage.vue'),
    },
    {
      path: '/submit-competition-details',
      name: 'submit-competition-details',
      component: () => import('../pages/SubmitCompetitionDetailsPage.vue'),
    },
    {
      path: '/submissions',
      name: 'submissions',
      component: () => import('../pages/SubmissionsPage.vue'),
    },
  ],
});

export default router;
