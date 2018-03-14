Highcharts.chart('chart', {
  chart: {
    type: 'area',
    animation: Highcharts.svg,
    marginRight: 10,
    events: {
      load: function() {
        const ws = new ReconnectingWebSocket("ws://" + location.hostname + ":5000/cpu"),
              series = this.series[0];
 
        ws.onmessage = function(evt) {
          let x = (new Date()).getTime(),
              y = parseFloat(evt.data);
 
          series.addPoint([x, y], true, true);
        }
      } 
    }
  },
  title: {
    text: 'CPU Usage'
  },
  xAxis: {
    type: 'datetime',
    tickPixelInterval: 150
  },
  yAxis: {
    title: {
      text: 'Percent' 
    } 
  },
  tooltip: {
    formatter: function() {
      return Highcharts.numberFormat(this.y, 2) + '%'; 
    } 
  },
  series: [{
    name: 'CPU Usage',
    data: (function () {
      let data = [],
          time = (new Date()).getTime(),
          i;
 
      for (i=-99; i <=0; i+=1) {
        data.push({
          x: time + 1 * 1000,
          y: 0
        });
      };
      return data;
    }())
  }]
});
