const Plot = require('../build');

describe('The deleteTraces function', function() {

    var plot;

    beforeEach(function(){
        plot = new Plot.createPlot([
            { x: [1,2,3], y: [3,4,5] },
            { x: [1,2,3], y: [8,5,6] },
            { x: [1,2,3], y: [1,3,4] }
        ]);
    });

    it('should require an argument', function() {
        expect(function() {
            plot.deleteTraces();
        }).toThrowError('deleteTraces requires an indices argument!');
    });

    it('should delete a single trace', function() {
        plot.deleteTraces(1);

        expect(plot.data.length).toEqual(2);
        expect(plot.data[0]).toEqual({ x: [1,2,3], y: [3,4,5] });
        expect(plot.data[1]).toEqual({ x: [1,2,3], y: [1,3,4] });
    });

    it('should delete multiple traces when passed an array', function() {
        plot.deleteTraces([0, 2]);

        expect(plot.data.length).toEqual(1);
        expect(plot.data[0]).toEqual({ x: [1,2,3], y: [8,5,6] });
    });

    it('should work with negative indices', function() {
        plot.deleteTraces([-2]);

        expect(plot.data.length).toEqual(2);
        expect(plot.data[0]).toEqual({ x: [1,2,3], y: [3,4,5] });
        expect(plot.data[1]).toEqual({ x: [1,2,3], y: [1,3,4] });
    });

    it('should work with mixed positive and negative indices', function() {
        plot.deleteTraces([1, -1]);

        expect(plot.data.length).toEqual(1);
        expect(plot.data[0]).toEqual({ x: [1,2,3], y: [3,4,5] });
    });
});
