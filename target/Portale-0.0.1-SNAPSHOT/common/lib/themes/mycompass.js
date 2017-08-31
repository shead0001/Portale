var labelView = false;
if	(window.innerWidth > 450){
	labelView = true;
}

Highcharts.theme = {
    colors: ['#E3001B', '#CCCCCC', '#F2AD00', '#E8540D', '#2F4A71', '#276230', '#3F8884', '#774C3B', '#828282'],
	credits: {
		enabled: false
	},
    chart: {
        backgroundColor: "transparent",
		plotBackgroundColor: null,
		plotBorderWidth: 0,
		plotShadow: false
    },
    title: {
		align: 'center',
		verticalAlign: 'middle',		
        style: {
            color: '#333333',
            font: '13px "Source Sans Pro",sans-serif'
        },
		y: 0
    },
	tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
    subtitle: {
        style: {
            color: '#666666',
            font: '12px "Source Sans Pro",sans-serif'
        }
    },
    legend: {
        itemStyle: {
            font: '9px "Source Sans Pro",sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: '#E3001B'
        }   
    },
	plotOptions: {
		pie: {
			dataLabels: {
				enabled: labelView,
				distance: 10,
				style: {
					fontWeight: 'bold',
					color: '#262d37',
					textShadow: '0px 1px 1px #ffffff'
				}
			},
			startAngle: -100,
			endAngle: 100,
			center: ['50%', '65%']
		}
	}
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);