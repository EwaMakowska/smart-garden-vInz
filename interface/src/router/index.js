import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Settings from '@/views/settings/Settings.vue'
import AddPlant from '../views/plant/AddPlant.vue'
import EditPlant from "@/views/plant/EditPlant.vue"
import Plant from "@/views/plant/Plant.vue"
import AddGarden from "@/views/garden/AddGarden.vue"
import EditGarden from "@/views/garden/EditGarden.vue"
import Garden from "@/views/garden/Garden.vue"
import AddSpecies from "@/views/species/AddSpecies.vue"
import EditSpecies from "@/views/species/EditSpecies.vue"
import LoginView from "@/views/LoginView.vue"
import Journal from "@/views/journal/Journal.vue"
import SharedPlant from "@/views/sharedPlant/SharedPlant.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/plant/:uuid',
      name: 'plant',
      component: Plant,
      props: true
    },
    {
      path: '/add-plant',
      name: 'add-plant',
      component: AddPlant
    },
    {
      path: '/edit-plant/:_id',
      name: 'edit-plant',
      component: EditPlant,
      props: true
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/add-garden',
      name: 'add-garden',
      component: AddGarden
    },
    {
      path: '/garden/:uuid',
      name: 'garden',
      component: Garden,
      props: true
    },
    {
      path: '/edit-garden/:uuid',
      name: 'edit-garden',
      component: EditGarden,
      props: true
    },
    {
      path: '/add-species/',
      name: 'add-species',
      component: AddSpecies,
      props: true
    },
    {
      path: '/edit-species/:speciesuuid',
      name: 'edit-species',
      component: EditSpecies,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      props: true
    },
    {
      path: '/journal/:journalUUID',
      name: 'journal',
      component: Journal,
      props: true
    },
    {
      path: "/shared-plant/:plantUUID",
      name: "shared/plant",
      component: SharedPlant,
      props: true
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route.js level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route.js
    //   // which is lazy-loaded when the route.js is visited.
    //   component: () => import('../views/old/AboutView.vue')
    // }
  ]
})

export default router
