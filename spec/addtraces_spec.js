const Plot = require('../build');

describe('The addTraces function', function() {

    var plot = Plot.createPlot();

    afterEach(function() {
        plot.data = [];
    });

    it('should add a single trace', function() {
        plot.addTraces({ x: [1,2,3], y: [2,3,4] });

        expect(plot.data.length).toEqual(1);
    });

    it('should add an array of traces', function() {
        plot.addTraces([{ x: [1,2,3], y: [2,3,4] }, { x: [1,2,3], y: [2,3,4] }]);

        expect(plot.data.length).toEqual(2);
    });

    it('should error with an empty argument', function() {
        expect(function() {
            plot.addTraces();
        }).toThrowError('addTraces requires at least a trace argument!');
    });

    it('should add a trace to the correct index', function() {
        plot.data = [{ x: [1,2,3], y: [2,3,4] }, { x: [1,2,3], y: [5,6,7] }];

        plot.addTraces({ x: [1,2,3], y: 'correct index' }, 1);

        expect(plot.data[1].y).toEqual('correct index');
    });

    it('should work with a single index and single trace', function() {
        plot.data = [{ x: [1,2,3], y: [2,3,4] }, { x: [1,2,3], y: [5,6,7] }];


        var expected = { single: 'trace' };
        plot.addTraces(expected, 0);

        expect(plot.data[0]).toEqual(expected);
    });

    it('should work using negative indices', function() {
        plot.data = [{ x: [1,2,3], y: [2,3,4] }, { x: [1,2,3], y: [5,6,7] }];

        var expected = { x: [1,2,3], y: 'changed' };
        plot.addTraces(expected, -2);

        expect(plot.data[0]).toEqual(expected);
    });

    it('should error with different length traces and indices', function() {
        expect(function() {
            plot.addTraces([{},{}], [0]);
        }).toThrowError('Traces and indices must be the same length!');
    });

    it('should work with an array of indices', function() {
        plot.data = [{ x: [1,2,3], y: [2,3,4] }, { x: [1,2,3], y: [5,6,7] }];

        var data = [{ x: [1,2,3], y: 'index 1' }, { x: [1,2,3], y: 'index 0'}];
        plot.addTraces(data, [2, 0]);

        expect(plot.data[0]).toEqual(data[1]);
        expect(plot.data[2]).toEqual(data[0]);
        expect(plot.data.length).toEqual(4);
    });
});
