import RkHeader from './rk-header.vue'

const components = {
  RkHeader
}

const componentsName = Object.keys(components)

export default { install: (vue) => {
  componentsName.forEach((i) => {
    vue.component(i, components[i])
  })
}}
