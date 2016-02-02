var NotebookPlot = require('../build');

describe('The restyle function', function() {

    var data = [
          { x: [1,2,3], y: [2,3,4] },
          { x: [1,2,3], y: [4,3,2] },
          { x: [1,2,3], y: [1,5,3] }
        ],
        layout = {},
        plot = new NotebookPlot(data, layout);

    it('should update all traces when only one argument', function() {
        plot.restyle({ test: 'added', x: 'changed' });

        expect(plot.data[0].x).toBe('changed');
        expect(plot.data[0].test).toBe('added');
        expect(plot.data[1].x).toBe('changed');
        expect(plot.data[1].test).toBe('added');
        expect(plot.data[2].x).toBe('changed');
        expect(plot.data[2].test).toBe('added');
    });

    it('should update a single trace with an int argument', function() {
        plot.restyle({ test: 'using an int' }, 0);

        expect(plot.data[0].test).toBe('using an int');
        expect(plot.data[1].test).not.toBe('using an int');
    });

    it('should update multiple traces with an array argument', function() {
        plot.restyle({ test: 'using an array'}, [0,2]);

        expect(plot.data[0].test).toBe('using an array');
        expect(plot.data[1].test).not.toBe('using an array');
        expect(plot.data[2].test).toBe('using an array');
    });
});
