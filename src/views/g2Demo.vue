/*
 * @Author: wupeiwen javapeiwen2010@gmail.com
 * @Date: 2018-08-19 22:10:34
 * @Last Modified by: wupeiwen javapeiwen2010@gmail.com
 * @Last Modified time: 2018-08-21 16:54:38
 */
<template>
  <div>
    <g2-line :id="'line'" :data="data"></g2-line>
    <g2-point :id="'point'" :data="data"></g2-point>
    <g2-interval :id="'interval'" :data="data"></g2-interval>
    <g2-pie :id="'pie'"></g2-pie>
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
