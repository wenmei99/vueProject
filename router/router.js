import Vue from 'vue'
import VueRouter from "vue-router";

const homePage = ()=>import('@/home/home.vue');

Vue.use(VueRouter);

export default new VueRouter({
  mode:'hash',
  routes:[
    {
      path:'/',
      name:'home',
      redirect:'/home',
      component:homePage
    },
    {
      path:'/hone',
      name:'home',
      component:homePage
    }
  ]
})