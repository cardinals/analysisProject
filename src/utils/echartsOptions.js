
export const setMapbox = (caseData, centerPoint) => {
  const osmUrl = 'http://139.224.131.57:8700'
  const option = {
    visualMap: [{
      type: 'continuous',
      show: false,
      max: 100,
      calculable: true,
      realtime: false,
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      outOfRange: {
        colorAlpha: 0
      },
      seriesIndex: [0]
    }],
    mapbox: {
      // style: 'mapbox://styles/mapbox/dark-v9',
      style: {
        'version': 8,
        'glyphs': `${osmUrl}/fonts/{fontstack}/{range}.pbf`,
        'sources': {
          'osm-tiles': {
            'type': 'raster',
            'tiles': [
              `${osmUrl}/styles/positron/{z}/{x}/{y}.png`
            ],
            'tileSize': 256
          }
        },
        'layers': [{
          'id': 'background',
          'type': 'raster',
          'source': 'osm-tiles',
          'minzoom': 0,
          'maxzoom': 22
        }]
      },
      // 地图中心经纬度。经纬度用数组
      // center: [121.5193, 31.163070],
      center: centerPoint,
      // 地图的缩放等级
      zoom: 9,
      // 视角俯视的倾斜角度
      pitch: 50,
      // 地图的旋转角度
      bearing: -10,
      boxHeight: 10,
      // 后处理特效的相关配置
      postEffect: {
        enable: true,
        // 环境光遮蔽
        SSAO: {
          enable: false,
          // 质量，支持'low', 'medium', 'high', 'ultra'
          quality: 'medium',
          // 采样半径。半径越大效果越自然，但是需要设置较高的'quality'。
          radius: 2,
          // 强度。值越大颜色越深。
          intensity: 1.5
        }
      },
      // 光照相关的设置
      light: {
        // 场景主光源的设置
        main: {
          // 主光源的强度
          intensity: 1,
          // 主光源是否投射阴影
          shadow: false,
          // 阴影的质量
          shadowQuality: 'medium'
        },
        // 全局的环境光设置。
        ambient: {
          // 环境光的强度。
          intensity: 0
        }
      }
    },
    series: [{
      name: '分布',
      type: 'bar3D',
      coordinateSystem: 'mapbox',
      // 三维柱状图中三维图形的着色效果：'color' 只显示颜色，不受光照等其它因素的影响。'lambert' 通过经典的 lambert 着色表现光照带来的明暗。'realistic' 真实感渲染，配合 light.ambientCubemap 和 postEffect 使用可以让展示的画面效果和质感有质的提升。
      shading: 'realistic',
      barSize: 0.3,
      minHeight: 2,
      data: caseData,
      silent: false,
      zlevel: -10,
      emphasis: {
        label: {
          show: false
        }
      }
    }]
  }
  return option
}
