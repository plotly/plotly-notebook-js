const Plot = require('../build');

describe('The render function', function() {

    it('should output the correct html', function() {
        const plot = Plot.createPlot([{ x: [1,2,3], y: [2,3,4] }], { title: 'test' });

        const expected = [
            '<div class=\'plotly-plot\'>',
                '<div id=\'notebook-plot-TIMESTAMP\'></div>',
                '<script>',
                    'function plot(){',
                        'Plotly.plot(\'notebook-plot-TIMESTAMP\',',
                        '[{"x":[1,2,3],"y":[2,3,4]}]',
                        ',',
                        '{"title":"test"}',
                        ');',
                    '}',
                    'if(window.Plotly){',
                        'plot();',
                    '}else if(!window.require){',
                        'var head = document.head || document.getElementsByTagName(\'head\')[0];',
                        'var s = document.createElement(\'script\');',
                        's.src = \'https://cdn.plot.ly/plotly-latest.min.js\';',
                        's.type = \'text/javascript\';',
                        's.async = false;',
                        's.onreadystatechange = s.onload = plot;',
                        'head.appendChild(s);',
                    '}else{',
                        'require([\'/node_modules/plotly-notebook-js/build/plotly.min.js\'], function(Plotly){',
                            'window.Plotly = Plotly;',
                            'plot();',
                        '});',
                    '}',
                '</script>',
            '</div>'
        ].join('');

        const output = plot.render().replace(/\d{13}/g, 'TIMESTAMP');

        expect(output).toBe(expected);
    });
});
