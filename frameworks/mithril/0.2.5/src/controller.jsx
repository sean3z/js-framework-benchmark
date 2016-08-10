/**
 * Created by stef on 17.11.15.
 */
'use strict';
/** @jsx m */

var m = require('mithril')
var {Store} = require('./store');

var startTime;
var lastMeasure;
var startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
}
var stopMeasure = function() {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            var stop = performance.now();
            var duration = 0;
            console.log(lastMeasure+" took "+(stop-startTime));
        }, 0);
    }
}

var Row = {
    controller: function(props) {
        return {
            click: function() {
                const id = props.id;
                props.onclick(id);
            },
            remove: function() {
                const id = props.id;
                props.onremove(id);
            },
        }
    },
    view: function(ctrl, props) {
        return (<tr key={props.id} className={props.styleClass}>
            <td class="col-md-1">{props.id}</td>
            <td class="col-md-4">
                <a onclick={ctrl.click}>{props.label}</a>
            </td>
            <td class="col-md-1"><a onclick={ctrl.remove}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
            <td class="col-md-6"></td>
        </tr>);
    }
}

var Controller = {
    controller: function() {
        return {
            data: function() { return Store.data;},
            selected: function() { return Store.selected;},
            run: function() {
                startMeasure("run")
                Store.run();
            },
            add: function() {
                startMeasure("add")
                Store.add();
            },
            update: function() {
                startMeasure("update")
                Store.update();
            },
            select: function(id) {
                startMeasure("select");
                Store.select(id);
            },
            remove: function(id) {
                startMeasure("delete")
                Store.remove(id);
            },
            runLots: function() {
                startMeasure("runLots")
                Store.runLots();
            },
            clear: function() {
                startMeasure("clear")
                Store.clear();
            },
            swapRows: function() {
                startMeasure("swapRows")
                Store.swapRows();
            },
            done: function() {
                stopMeasure();
            }
        }
    },

    view: function(ctrl) {
        let rows = ctrl.data().map((d,i) => {
            let sel = d.id === ctrl.selected() ? 'danger':'';
            return m.component(Row, {onclick:ctrl.select, onremove:ctrl.remove, key:d.id, label:d.label, id:d.id, styleClass:sel});
// this doesn't work here return (<Row onclick={ctrl.select} onremove={ctrl.remove} key={d.id} label={d.label} id={d.id} styleClass={sel}></Row>);
        });
        var ret = <div className="container" config={ctrl.done}>
            <div class="jumbotron">
                <div class="row">
                    <div class="col-md-6">
                        <h1>Mithril v0.2.5</h1>
                    </div>
                    <div class="col-md-6">
                        <div className="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="run" onclick={ctrl.run}>Create 1,000 rows</button>
                        </div>
                        <div className="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="runlots" onclick={ctrl.runLots}>Create 10,000 rows</button>
                        </div>
                        <div className="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="add" onclick={ctrl.add}>Append 1,000 rows</button>
                        </div>
                        <div className="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="update" onclick={ctrl.update}>Update every 10th row</button>
                        </div>
                        <div className="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="clear" onclick={ctrl.clear}>Clear</button>
                        </div>
                        <div className="col-sm-6 smallpad">
                            <button type="button" class="btn btn-primary btn-block" id="swaprows" onclick={ctrl.swapRows}>Swap Rows</button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-hover table-striped test-data">
                <tbody class="">
                {rows}
                </tbody>
            </table>
            <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>;
        return ret;
    }
};

export { Controller };