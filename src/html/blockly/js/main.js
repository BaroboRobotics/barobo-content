/**
 * Created by adam on 3/6/16.
 */
'use strict';

var app = {};

app.robots = [];
app.workspace = null;
app.blocklyInterpreter = null;
app.stepDelay = 10;
app.activeTab = '#blocks';

app.log = function(text) {
    var con = document.getElementById('console');
    if (con) {
        console.log(text);
        con.innerText = con.innerText + text + '\n';
    } else {
        console.log(text);
    }
};

app.sleep = function(time) {
    app.stepDelay = time * 1000;
};

app.initApi = function(interpreter, scope) {
    // Add an API function for the alert() block.
    var wrapper = function(text) {
        text = text ? text : '';
        return interpreter.createPrimitive(app.log(text));
    };
    interpreter.setProperty(scope, 'alert',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(scope, 'prompt',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(number) {
        var aquired = window.Linkbots.acquire(number);
        if (aquired) {
            app.robots = aquired.robots;
            return app.robots;
        }
        return [];
    };
    interpreter.setProperty(scope, 'lbjs_acquire',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(d) {
        return interpreter.createPrimitive(app.sleep(d));
    };
    interpreter.setProperty(scope, 'sleep',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(app.workspace.highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));

    wrapper = function(robot, value) {
        console.log(robot);
        console.log(value);
        var color = value;
        var r = parseInt(' + value_color + '.substring(1, 3), 16);
        var g = parseInt(' + value_color + '.substring(3, 5), 16);
        var b = parseInt(' + value_color + '.substring(5, 7), 16);
        robot.color(r,g,b);
    };
    interpreter.setProperty(scope, 'lbjs_setColor',
        interpreter.createNativeFunction(wrapper));
};

app.updateCode = function(event) {
    var code = Blockly.JavaScript.workspaceToCode(app.workspace);
    var codeElement = document.getElementById('code_javascript');
    code += '\nLinkbots.relinquishAll();\n';
    codeElement.innerHTML = code;
    if (hljs) {
        hljs.highlightBlock(codeElement);
    }
    code = Blockly.Xml.workspaceToDom(app.workspace);
    code = Blockly.Xml.domToPrettyText(code);
    codeElement = document.getElementById('code_xml');
    codeElement.innerText = code;
    if (hljs) {
        hljs.highlightBlock(codeElement);
    }
};

app.nextStep = function() {
    if (app.blocklyInterpreter.step()) {
        window.setTimeout(app.nextStep, app.stepDelay);
        app.stepDelay = 10;
    }
};

app.init = function() {
    (function(proxied) {
        window.alert = function() {
            // do something here
            return app.log.apply(this, arguments);
        };
    })(window.alert);

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // e.target -  newly activated tab
        // e.relatedTarget - previous active tab
        if (e.target && e.target.hash && e.target.hash === '#blocks') {
            app.workspace.setVisible(true);
            Blockly.fireUiEvent(window, 'resize');
        } else {
            app.workspace.setVisible(false);
        }
        app.activeTab = e.target.hash;
    });
    $('#xml-load-apply').click(function() {
        var element = document.getElementById('xml-load-content');
        var xml = element.value;
        if (xml && xml.trim().length > 0) {
            try {
                var xmlDom = Blockly.Xml.textToDom(xml);
                app.workspace.clear();
                Blockly.Xml.domToWorkspace(app.workspace, xmlDom);
                if (app.activeTab == '#blocks') {
                    Blockly.fireUiEvent(window, 'resize');
                }
            } catch (e) {
                app.log('error parsing xml: ' + e);
            }
            element.value = '';
        }
        $('#xml-load-modal').modal('hide')
    });
    $('#play-button').click(function() {
        //Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        //Blockly.JavaScript.addReservedWords('highlightBlock');
        for (var i = 0; i < app.robots.length; i++) {
            Linkbots.relinquish(app.robots[i]);
        }

        //app.blocklyInterpreter = new Interpreter(code, app.initApi);
        //app.stepDelay = 10;
        //window.setTimeout(app.nextStep, app.stepDelay);
        //app.log(code);

        // Check for infinite loops.
        Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
        var timeouts = 0;
        var checkTimeout = function() {
            if (timeouts++ > 1000000) {
                throw 'code timed out.';
            }
        };

        var code = Blockly.JavaScript.workspaceToCode(app.workspace);
        code += '\nLinkbots.relinquishAll();\n';

        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        try {
            app.log('executing code');
            eval(code);
        } catch (e) {
            app.log('Error occurred executing javascript: ' + e);
        }
    });
    $('#trash-button').click(function() {
        var count = app.workspace.getAllBlocks().length;
        if (count < 2 ||
            window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
            app.workspace.clear();
        }
    });
    app.workspace = Blockly.inject('blockly', {
        grid: { spacing: 25, lenght: 3, colour: '#aaa', snap: true},
        media: 'media/',
        toolbox: document.getElementById('toolbox')
    });

    app.workspace.addChangeListener(app.updateCode);

    var element = document.getElementById('blockly_default');
    if (element.innerHTML && element.innerHTML.trim().length > 0) {
        try {
            var xmlDom = Blockly.Xml.textToDom(element.innerHTML);
            app.workspace.clear();
            Blockly.Xml.domToWorkspace(app.workspace, xmlDom);
            Blockly.fireUiEvent(window, 'resize');
        } catch (e) {
            app.log('error parsing xml: ' + e);
        }

    }


};

// Simulator setup.

var simulator = {
    config: {
        wheel: {
            radius: 1.75, // inches
            circumference: Math.PI * 1.75 * 2, // diameter * PI
            speed: [90, 90], // degrees per second.
            position: [0, 0], // The wheel position in degrees.
            direction: [0, 0], // -1 negative, 0 stop, 1 forward.
            moving: [false, false]
        },
        robot: {
            radius: 2.0, // inches
            circumference: Math.PI * 2.0 * 2,
            position: [0, 0], // position in inches.
            rotation: 0
        }
    },
    operations: {
        state: 'stop',
        newLocation: [0, 0],
        calcNewPosition: function(t) {
            var wheel, robot, center, i, x, y, theta, delta, distance, prevTheta;
            delta = [0, 0];
            distance = [0, 0];
            wheel = simulator.config.wheel;
            robot = simulator.config.robot;
            for (i = 0; i < 2; i++) {
                delta[i] = wheel.speed[i] * t * wheel.direction[i];
                wheel.position[i] = wheel.position[i] + delta[i];
            }
            distance[0] = wheel.circumference * (delta[0] / 360);
            distance[1] = wheel.circumference * (delta[1] / 360);
            center = .5 * (distance[0] + distance[1]);
            prevTheta = (robot.rotation * Math.PI) / 180;
            x = robot.position[0] + (center * Math.cos(prevTheta));
            y = robot.position[1] + (center * Math.cos(prevTheta));
            theta = prevTheta + ((distance[0] - distance[1]) / robot.radius * 2.0);
            robot.rotation = (theta * 180) / Math.PI;
            robot.position = [x, y];
        },
        moveTo : function(wheel1, wheel2) {
            simulator.operations.newLocation = [wheel1, wheel2];
            simulator.operations.state = 'move';
        }
    }
};

simulator.drawRobot = function(ctx, x, y, radius, shadow) {
    var position = {x:x - radius, y:y - radius, width:radius*2, height: radius*2};
    ctx.save();
    ctx.translate(position.x + radius, position.y + radius);
    ctx.rotate(45*Math.PI/180);
    ctx.rect(-radius, -radius, position.width, position.height);
    ctx.restore();
};

simulator.settings = {
    series: {
        points: {
            show: true,
            radius: 10
        }
    },
    grid: {
        markings: [
            {
                linewidth: 1,
                color: "#EEEEEE"
            }
        ]
    },
    xaxis: {
        min: -12,
        max: 12,
        tickSize: 2,
        tickDecimals: 0
    },
    yaxis: {
        min: -12,
        max: 12,
        tickSize: 2,
        tickDecimals: 0
    }
};
simulator.data = [{data:[[0,0]], points: {symbol: simulator.drawRobot} }];
simulator.plot = null;
simulator.lastRun = null;

simulator.init = function() {
    simulator.plot = $.plot("#simulator", simulator.data, simulator.settings);
    simulator.lastRun = new Date();
    setInterval(function() {
        var d, t;
        d = new Date();
        t = d.getTime() - simulator.lastRun.getTime();
        simulator.lastRun = d;
        if (simulator.operations.state == 'move') {

        } else if (simulator.operations.state == 'continuous') {

        }

    }, 100);
};


/**
 * All init code executed here.
 */

$(function() {
    app.init();
    simulator.init();
});