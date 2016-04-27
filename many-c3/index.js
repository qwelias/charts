"use strict";

// documentation: http://c3js.org/reference.html

var chart = c3.generate( {
	bindto: '#chart',
	size: {
		width: 800,
		height: 900
	},
	interaction: {
		enabled: true // показывать всплывашки по ховеру
	},
	// color:{
	// 	pattern:[] // массив цветов
	// },
	data: {
		//color: function (color, d) { }, // генерирует цвет
		// colors: {
		// 	"Здания": '#ff0000'
		// },
		json: data,
		groups: [ // для stacked
			[ "Здания", "Сооружения", "Машини и оборудование", "Транспортные средства", "Прочие осн. средства" ]
		],
		keys: {
			//x: 'name', // если значения х имеются данных. иначе индекс данных берётся
			value: [ "Здания", "Сооружения", "Машини и оборудование", "Транспортные средства", "Прочие осн. средства" ],
		},
		type: 'area' // 'pie' || 'spline' || 'area' || 'area-spline'
		// либо для комбинированных объект types, где ключ - имя данных, значение - тип
	},
	axis: {
		x: {
			// type: 'category', // нужно если по категориям, если нужен таймлайн то 'timeseries'. иначе 'indexed'
			tick:{
				// values: new Array(100).fill(0).map(function(v,i){ return (i*0.2).toFixed(1)}) // шаги задаются массивом
			}
		},
        y:{
			label: 'huehuehue',
			tick:{
				values: new Array(100).fill(0).map(function(v,i){ return i*10}) // шаги задаются массивом
			}
        }
	},
    grid:{
        y:{
            show: true // показывать грид
        }
    },
	legend:{
		position: 'bottom' // bottom || right || inset
	}
} );
