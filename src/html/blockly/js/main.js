/**
 * Created by adam on 3/6/16.
 */
'use strict';

var app = {};

app.robots = [];
app.workspace = null;
app.blocklyInterpreter = null;
app.stepDelay = 10;

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
    var codeElement = document.getElementById('code');
    code += '\nLinkbots.relinquishAll();\n';
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
    app.workspace = Blockly.inject('blockly',
        {media: 'media/',
            toolbox: document.getElementById('toolbox')});

    app.workspace.addChangeListener(app.updateCode);

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // e.target -  newly activated tab
        // e.relatedTarget - previous active tab
        if (e.target && e.target.hash && e.target.hash === '#blocks') {
            $('.blocklyToolboxDiv').show();
        } else {
            $('.blocklyToolboxDiv').hide();
        }
    });
    // This fixes some issues with the toolbox displaying correctly.
    setTimeout(function(){
        Blockly.fireUiEvent(window, 'resize');
    }, 500);

    $('#play-button').click(function() {
        //Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        //Blockly.JavaScript.addReservedWords('highlightBlock');
        for (var i = 0; i < app.robots.length; i++) {
            Linkbots.relinquish(app.robots[i]);
        }
        var code = Blockly.JavaScript.workspaceToCode(app.workspace);
        //app.blocklyInterpreter = new Interpreter(code, app.initApi);
        //app.stepDelay = 10;
        //window.setTimeout(app.nextStep, app.stepDelay);

        //app.log(code);
        code += '\nLinkbots.relinquishAll();\n';
        eval(code);
    });
    $('#trash-button').click(function() {
        var count = app.workspace.getAllBlocks().length;
        if (count < 2 ||
            window.confirm(Blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
            app.workspace.clear();
        }
    });
};

$(function() {
    app.init();
});