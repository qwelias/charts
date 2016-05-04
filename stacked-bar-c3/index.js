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
	data: {
		selection: true,
		json: data,
		labels: {
			centered: true
		},
		groups: [ // для stacked
			[ "Здания", "Сооружения", "Машини и оборудование", "Транспортные средства", "Прочие осн. средства" ]
		],
		keys: {
			x: 'name',
			value: [ "Здания", "Сооружения", "Машини и оборудование", "Транспортные средства", "Прочие осн. средства" ],
		},
		type: 'line'
	},
	axis: {
		x: {
			type: 'category'
		},
		y: {
			tick: {
				values: new Array( 100 ).fill( 0 ).map( function ( v, i ) {
						return i * 5
					} ) // шаги задаются массивом
			}
		}
	},
	grid: {
		y: {
			show: true // показывать грид
		}
	},
	legend: {
		position: 'bottom' // bottom || right || inset
	},
	onrendered: function () {
		var config = this.config;
		d3.selectAll( '.c3-texts text' ).style( {
			fill: 'black',
			stroke: 'white',
			'stroke-width': 1,
			'stroke-linecap': 'round',
			'stroke-opacity': 0.65,
			'font-size': '1.5em',
			'font-weight': 'bold',
			"stroke-linejoin": "bevel"
		} );
		switch ( config.data_type ) {
			case 'bar':
				d3.selectAll( 'g.c3-bars path' ).each( function () {
					var box = this.getBBox();
					var text = getTextOf( this ).style( 'opacity', config.data_groups.length ? ( box.height > 24 ? 1 : 0 ) : 1 );
					if ( config.data_labels && config.data_labels.centered && ( box.height > 24 || config.data_groups.length ) ) {
						text.attr( 'y', box.y + box.height / 2 + 6 );
					}
				} );
				break;
			case 'line':
			case 'spline':
			case 'area-spline':
			case 'area-line':
				d3.selectAll( 'circle.c3-circle' ).each( function () {
					var text = getTextOf( this ).each(function(){
						var self = this;
						d3.selectAll( 'text.c3-text' ).each( function () {
							if ( this != self && ifIntersect( this, self ) && self.compareDocumentPosition( this ) == 4 ) {
								self.style.opacity = 0;
							}
						} );
					});
				} );
				break;
			default: break;
		}
	}
} );

function getTextOf( el ) {
	var sPref = "c3-shapes-";
	var snPref = "c3-shape-";

	var name = Array.from( el.parentElement.classList ).find( function ( c ) {
		return c.indexOf( sPref ) === 0
	} ).substring( sPref.length );
	var n = Array.from( el.classList ).find( function ( c ) {
		return c.indexOf( snPref ) === 0
	} ).substring( snPref.length );

	var tPref = "c3-texts-";
	var tnPref = "c3-text-";
	return d3.select( 'g.' + tPref + name + ' text.' + tnPref + n );
};

function ifIntersect( s1, s2 ) {
	s1 = s1.getBoundingClientRect();
	s2 = s2.getBoundingClientRect();
	return !( s2.left > s1.right ||
		s2.right < s1.left ||
		s2.top > s1.bottom ||
		s2.bottom < s1.top );
};
