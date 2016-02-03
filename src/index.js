const CDN_SOURCE = 'https://cdn.plot.ly/plotly-latest.min.js';
const LOCAL_SOURCE = '/node_modules/plotly-notebook-js/build/plotly.min.js';

const NotebookPlot = function(data, layout, cdn) {
    if(!(this instanceof NotebookPlot)){
        return new NotebookPlot(data, layout);
    }

    this.data = data || [];
    this.layout = layout || {};

    if(cdn){
        this.scriptSource = CDN_SOURCE;
    }else{
        this.scriptSource = LOCAL_SOURCE;
    }

    return this;
};


NotebookPlot.prototype.restyle = function(update, indices) {

    // Normalize array of indices to be affected.
    if(indices === undefined){
        indices = this.data.map((_, i) => { return i; });
    }else{
        indices = Array.isArray(indices) ? indices : [indices];
    }

    // Apply changes.
    this.data = this.data.map((trace, i) => {
        if(indices.indexOf(i) !== -1){
            return Object.assign({}, trace, update);
        }else{
            return trace;
        }
    });

    return this;
};


NotebookPlot.prototype.addTraces = function(traces, indices) {

    if(!traces){
        throw new Error('addTraces requires at least a trace argument!');
    }

    traces = Array.isArray(traces) ? traces : [traces];

    if(indices === undefined){
        indices = Array(traces.length).fill(-1);
    }

    indices = Array.isArray(indices) ? indices : [indices];

    var zipped = [];
    if(traces.length !== indices.length){
        throw new Error('Traces and indices must be the same length!');
    }else{
        for(var i = 0; i < traces.length; i++){
            zipped.push({ trace: traces[i], index: indices[i] });
        }
    }

    zipped = zipped.sort((a, b) => {
        return a.index - b.index;
    });

    zipped.forEach((trace) => {
        this.data.splice(trace.index, 0, trace.trace);
    });

    return this;
};


NotebookPlot.prototype.deleteTraces = function(indices) {

    if(!indices){
        throw new Error('deleteTraces requires an indices argument!');
    }

    indices = Array.isArray(indices) ? indices : [indices];

    indices = indices.map((index) => {
        if(index < 0){
            return this.data.length + index;
        }else{
            return index;
        }
    }).sort().reverse();

    indices.forEach((index) => {
        this.data.splice(index, 1);
    });

    return this;
};


NotebookPlot.prototype.render = function() {

    const timestamp = new Date().getTime();

    const output = [
        '<div class=\'plotly-plot\'>',
            '<div id=\'notebook-plot-' + timestamp + '\'></div>',
            '<script>',
                'function plot(){',
                    'Plotly.plot(\'notebook-plot-' + timestamp + '\',',
                    JSON.stringify(this.data),
                    ',',
                    JSON.stringify(this.layout),
                    ');',
                '}',
                'if(window.Plotly){',
                    'plot();',
                '}else if(!window.require){',
                    'var head = document.head || document.getElementsByTagName(\'head\')[0];',
                    'var s = document.createElement(\'script\');',
                    's.src = \'' + CDN_SOURCE + '\';',
                    's.type = \'text/javascript\';',
                    's.async = false;',
                    's.onreadystatechange = s.onload = plot;',
                    'head.appendChild(s);',
                '}else{',
                    'require([\'' + LOCAL_SOURCE + '\'], function(Plotly){',
                        'window.Plotly = Plotly;',
                        'plot();',
                    '});',
                '}',
            '</script>',
        '</div>'
    ].join('');

    return output;
};


module.exports = {
    createPlot: NotebookPlot
};
