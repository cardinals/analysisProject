/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-19 22:10:34
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-19 22:53:19
 */
<template>
  <div>
    <g2-line :id="'line'" :data="data"></g2-line>
    <g2-point :id="'point'" :data="data"></g2-point>
    <g2-interval :id="'point'" :data="data"></g2-interval>
  </div>
</template>

<script>

export default {
  data () {
    return {
      data: []
    }
  },
  methods: {},
  mounted () {
    this.data = [
      { name: 'a', value: 0 },
      { name: 'b', value: 1 },
      { name: 'c', value: 2 }
    ]
  }
}
</script>
