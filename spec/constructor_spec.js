const Plot = require('../build');

describe('The constructor', function() {

    it('should work without new', function() {
        const plot = Plot.createPlot([{ x: [1,2,3], y: [2,3,4] }], {});

        expect(typeof plot).toBe('object');
        expect(plot instanceof Plot.createPlot).toBe(true);
    });

    it('should accept zero arguments', function() {
        const plot = Plot.createPlot();

        expect(plot.data).toEqual([]);
        expect(plot.layout).toEqual({});
    });

    it('should initialize using arguments', function() {
        var data = [{ x: [1,2,3], y: [2,3,4] }],
            layout = { title: 'Testing' },
            plot = Plot.createPlot(data, layout);

        expect(plot.data).toEqual(data);
        expect(plot.layout).toEqual(layout);
    });
});
