const NotebookPlot = require('../build');

describe('The constructor', function() {

    it('should work without new', function() {
        const plot = NotebookPlot([{ x: [1,2,3], y: [2,3,4] }], {});

        expect(typeof plot).toBe('object');
        expect(plot instanceof NotebookPlot).toBe(true);
    });

    it('should accept zero arguments', function() {
        const plot = new NotebookPlot();

        expect(plot.data).toEqual([]);
        expect(plot.layout).toEqual({});
    });

    it('should initialize using arguments', function() {
        var data = [{ x: [1,2,3], y: [2,3,4] }],
            layout = { title: 'Testing' },
            plot = NotebookPlot(data, layout);

        expect(plot.data).toEqual(data);
        expect(plot.layout).toEqual(layout);
    });
});
