Blockly.Blocks['linkbotjs_sleep'] = {
    init: function() {
        this.appendValueInput("Sleep")
            .setCheck("Number")
            .appendField("sleep(");
        this.appendDummyInput()
            .appendField("seconds)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_sleep'] = function(block) {
    var value_wait = Blockly.JavaScript.valueToCode(block, 'Sleep', Blockly.JavaScript.ORDER_ATOMIC);
    if (!value_wait) {
        return '';
    }
    var code = 'sleep(' + value_wait + '); // not a real JavaScript function (see: setTimeout)\n';
    return code;
};

Blockly.Python['linkbotjs_sleep'] = function(block) {
    var value_wait = Blockly.Python.valueToCode(block, 'Sleep', Blockly.JavaScript.ORDER_ATOMIC);
    if (!value_wait) {
        return '';
    }
    var code = 'sleep(' + value_wait + '); // not a real JavaScript function (see: setTimeout)\n';
    return code;
};

Blockly.Blocks['linkbotjs_settimeout'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("delay");
        this.appendValueInput("DELAY")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("seconds");
        this.appendStatementInput("VALUE")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.JavaScript['linkbotjs_settimeout'] = function(block) {
    var value_delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_value = Blockly.JavaScript.statementToCode(block, 'VALUE');
    if (value_delay) {
        value_delay *= 1000;
    } else {
        value_delay = 1000;
    }
    var code = 'setTimeout(function() {\n' + statements_value + ' }, ' + value_delay + ');\n';
    return code;
};

Blockly.Python['linkbotjs_settimeout'] = function(block) {
    var value_delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_value = Blockly.Python.statementToCode(block, 'VALUE');
    if (!value_delay) {
        value_delay = 1;
    }
    var code = 'time.sleep(' + value_delay + ')\n';
    // Get rid of the indents
    code += statements_value.replace(/^[\s]*/m, '');
    return code;
};

Blockly.Blocks['linkbotjs_color'] = {
    init: function() {
        this.appendValueInput("LINKBOT")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("linkbot");
        this.appendValueInput("COLOR")
            .setCheck("Colour")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("color");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_color'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_color = Blockly.JavaScript.valueToCode(block, 'COLOR', Blockly.JavaScript.ORDER_ATOMIC);
    var indent = Blockly.JavaScript.INDENT;
    var block = '(function() {\n    var color = ' + value_color + '\n'
        + indent + 'var red = parseInt(color.substring(1,3), 16);\n'
        + indent + 'var green = parseInt(color.substring(3,5), 16);\n'
        + indent + 'var blue = parseInt(color.substring(5,7), 16);\n'
        + indent + value_linkbot + '.color(red, green, blue);\n'
        + '})();\n';
    //code = value_linkbot + '.color(' + red + ', ' + green + ', ' + blue + ');\n';
    code = block;
    return code;
};

Blockly.Python['linkbotjs_color'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC);
    code = value_linkbot + '.led.set_color(' + value_color + ')\n';
    return code;
};


Blockly.Blocks['linkbotjs_acquire'] = {
    init: function() {
        this.appendValueInput("LINKBOTS")
            .setCheck("Number")
            .appendField("connect to linkbots");
        this.setInputsInline(true);
        this.setOutput(true, "Array");
        this.setColour(60);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_acquire'] = function(block) {
    var value_linkbots = Blockly.JavaScript.valueToCode(block, 'LINKBOTS', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'Linkbots.acquire(' + value_linkbots + ').robots';
    //var code = 'lbjs_acquire(' + value_linkbots + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python['linkbotjs_acquire'] = function(block) {
    var value_linkbots = Blockly.Python.valueToCode(block, 'LINKBOTS', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'Linkbots.acquire(' + value_linkbots + ').robots';
    //var code = 'lbjs_acquire(' + value_linkbots + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['linkbotjs_connect'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("connect to a linkbot");
        this.setOutput(true);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_connect'] = function(block) {
    var code = 'Linkbots.acquire(1).robots[0]';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python['linkbotjs_connect'] = function(block) {
    var code = 'linkbot.Linkbot()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['linkbotjs_disconnect'] = {
    init: function() {
        this.appendValueInput("LINKBOT")
            .appendField("disconnect from a linkbot");
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setTooltip('');
        this.setColour(60);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_disconnect'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'Linkbots.relinquish(' + value_linkbot + ');\n';
    return code;
};

Blockly.Python['linkbotjs_disconnect'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.close()\n';
    return code;
};

Blockly.Blocks['linkbotjs_buzzer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("buzzer");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.appendValueInput("FREQ")
            .setCheck("Number")
            .appendField("frequency (hz)");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_buzzer'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = Blockly.JavaScript.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.buzzerFrequency(' + value_name + ');\n';
    return code;
};

Blockly.Python['linkbotjs_buzzer'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = Blockly.Python.valueToCode(block, 'FREQ', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.buzzer.set_frequency(' + value_name + ')\n';
    return code;
};


Blockly.Blocks['linkbotjs_zero'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("zero position");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_zero'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.zero();\n';
    return code;
};

Blockly.Python['linkbotjs_zero'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var code = value_linkbot + '.motors.reset()\n';
    code += value_linkbot + '.motors.move([ 0, 0, 0 ], relative=False)\n';
    return code;
};

Blockly.Blocks['linkbotjs_stop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("stop");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_stop'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.stop();\n';
    return code;
};

Blockly.Python['linkbotjs_stop'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var code = value_linkbot + 'motors.stop()\n';
    return code;
};


Blockly.Blocks['linkbotjs_moveright'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move right");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_moveright'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.moveRight();\n';
    return code;
};

Blockly.Python['linkbotjs_moveright'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var code = value_linkbot + '.motors[0].beginMove()\n';
    code +=    value_linkbot + '.motors[2].beginMove()\n';
    return code;
};

Blockly.Blocks['linkbotjs_moveleft'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move left");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_moveleft'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.moveLeft();\n';
    return code;
};

Blockly.Python['linkbotjs_moveleft'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var code = value_linkbot + '.motors[0].beginMove(forward=False)\n';
    code +=    value_linkbot + '.motors[2].beginMove(forward=False)\n';
    return code;
};

Blockly.Blocks['linkbotjs_movebackward'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move backward");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_movebackward'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.moveBackward();\n';
    return code;
};

Blockly.Python['linkbotjs_movebackward'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var code = value_linkbot + '.motors[0].beginMove(forward=False)\n';
    code +=    value_linkbot + '.motors[2].beginMove()\n';
    return code;
};

Blockly.Blocks['linkbotjs_moveforward'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move forward");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_moveforward'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.moveForward();\n';
    return code;
};

Blockly.Python['linkbotjs_moveforward'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var code = value_linkbot + '.motors[0].beginMove()\n';
    code +=    value_linkbot + '.motors[2].beginMove(forward=False)\n';
    return code;
};

Blockly.Blocks['linkbotjs_move_to'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("item"), "LINKBOT")
            .appendField("moveTo (");
        this.appendValueInput("1")
            .setCheck("Number");
        this.appendValueInput("2")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendValueInput("3")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendDummyInput()
            .appendField("\xB0 )");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_to'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_3 = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var code = variable_linkbot + '.moveTo(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Python['linkbotjs_move_to'] = function(block) {
    var variable_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Python.NAME_TYPE);
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var code = variable_linkbot + '.motors.move([' + value_1 + ', ' + value_2 + ', ' + value_3 + '], relative=False)\n';
    return code;
};

Blockly.Blocks['linkbotjs_move'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("item"), "LINKBOT")
            .appendField("move (");
        this.appendValueInput("1")
            .setCheck("Number");
        this.appendValueInput("2")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendValueInput("3")
            .setCheck("Number")
            .appendField("\xB0,");
        this.appendDummyInput()
            .appendField("\xB0 )");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.JavaScript.valueToCode(block, '1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_2 = Blockly.JavaScript.valueToCode(block, '2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_3 = Blockly.JavaScript.valueToCode(block, '3', Blockly.JavaScript.ORDER_ATOMIC);
    var code = variable_linkbot + '.move(' + value_1 + ', ' + value_2 + ', ' + value_3 + ');\n';
    return code;
};

Blockly.Python['linkbotjs_move'] = function(block) {
    var variable_linkbot = Blockly.Python.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Python.NAME_TYPE);
    var value_1 = Blockly.Python.valueToCode(block, '1', Blockly.Python.ORDER_ATOMIC);
    var value_2 = Blockly.Python.valueToCode(block, '2', Blockly.Python.ORDER_ATOMIC);
    var value_3 = Blockly.Python.valueToCode(block, '3', Blockly.Python.ORDER_ATOMIC);
    var code = variable_linkbot + '.motors.move([' + value_1 + ', ' + value_2 + ', ' + value_3 + '])\n';
    return code;
};

Blockly.Blocks['linkbotjs_angular_speed'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("angularSpeed (")
            .appendField(new Blockly.FieldAngle(90), "1")
            .appendField(new Blockly.FieldAngle(90), "2")
            .appendField(new Blockly.FieldAngle(90), "3")
            .appendField(")");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.setColour(65);
        this.setTooltip('');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.JavaScript['linkbotjs_angular_speed'] = function(block) {
    var angle_x = block.getFieldValue('1');
    var angle_y = block.getFieldValue('2');
    var angle_z = block.getFieldValue('3');
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var code = value_linkbot + '.angularSpeed(' + angle_x + ', ' + angle_y + ', ' + angle_z + ');\n';
    return code;
};

Blockly.Python['linkbotjs_angular_speed'] = function(block) {
    var angle_x = block.getFieldValue('1');
    var angle_y = block.getFieldValue('2');
    var angle_z = block.getFieldValue('3');
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var code = value_linkbot + '.motors[0].set_omega(' + angle_x + ')\n';
    code    += value_linkbot + '.motors[1].set_omega(' + angle_y + ')\n';
    code    += value_linkbot + '.motors[2].set_omega(' + angle_z + ')\n';
    return code;
};

Blockly.Blocks['linkbotjs_move_joint'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("moveJoint")
            .appendField(new Blockly.FieldDropdown([["joint 1", "0"], ["joint 2", "1"], ["joint 3", "2"]]), "NAME");
        this.appendValueInput("LINKBOT")
            .appendField("linkbot");
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("value (deg)");
        this.setColour(65);
        this.setTooltip('');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_move_joint'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '.moveToOneMotor(' + dropdown_name + ', ' + value_name + ');\n';
    return code;
};


Blockly.Python['linkbotjs_move_joint'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    //var code = value_linkbot + '.moveToOneMotor(' + dropdown_name + ', ' + value_name + ');\n';
    return '';
};

Blockly.Blocks['linkbotjs_repeat_loop_delay'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("repeat");
        this.appendValueInput("TIMES")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField("times, delay");
        this.appendValueInput("DELAY")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("second(s)");
        this.appendStatementInput("INPUT")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_repeat_loop_delay'] = function(block) {
    var value_times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC);
    var value_delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_input = Blockly.JavaScript.statementToCode(block, 'INPUT');
    var indent = Blockly.JavaScript.INDENT;
    var code = '(function() {\n'
        + indent + 'var t = ' + value_times + ';\n'
        + indent + 'function f() {\n'
        + indent + statements_input + '\n'
        + indent + indent + 't--;\n'
        + indent + indent + 'if (t > 0) { setTimeout(f, ' + (value_delay * 1000) + '); }\n'
        + indent +'}\n'
        + indent + 'setTimeout(f, ' + (value_delay * 1000) + ');\n'
        + '})();\n';
    return code;
};

Blockly.Python['linkbotjs_repeat_loop_delay'] = function(block) {
    var value_times = Blockly.Python.valueToCode(block, 'TIMES', Blockly.Python.ORDER_ATOMIC);
    var value_delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC);
    var statements_input = Blockly.Python.statementToCode(block, 'INPUT');
    var code = "for count in range (" + value_times + "):\n";
    code += statements_input;
    code += Blockly.Python.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Blocks['linkbotjs_while_loop_delay'] = {
    init: function() {
        this.appendValueInput("LOOP")
            .setCheck("Boolean")
            .appendField("repeat")
            .appendField(new Blockly.FieldDropdown([["while", "WHILE"], ["until", "UNTIL"]]), "TYPE");
        this.appendValueInput("DELAY")
            .setCheck("Number")
            .appendField("delay (seconds)");
        this.appendStatementInput("DO")
            .setCheck(null)
            .appendField("do");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_while_loop_delay'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_loop = Blockly.JavaScript.valueToCode(block, 'LOOP', Blockly.JavaScript.ORDER_ATOMIC);
    var value_delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_loop === 'undefined' || value_loop === null || value_loop === '') {
        value_loop = 'false';
    }
    var evalStatement = (dropdown_type === 'WHILE') ? 'if (' + value_loop + ') { ' : 'if (!' + value_loop + ') { ';
    evalStatement += 'setTimeout(f, ' + (value_delay * 1000) + '); }\n';
    var code = '(function() {\n'
        + indent + 'function f() {\n'
        + indent + statements_do + '\n'
        + indent + indent + evalStatement
        + indent +'}\n'
        + indent + 'setTimeout(f, ' + (value_delay * 1000) + ');\n'
        + '})();\n';
    return code;
};

Blockly.Python['linkbotjs_while_loop_delay'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_loop = Blockly.Python.valueToCode(block, 'LOOP', Blockly.Python.ORDER_ATOMIC);
    var value_delay = Blockly.Python.valueToCode(block, 'DELAY', Blockly.Python.ORDER_ATOMIC);
    var statements_do = Blockly.Python.statementToCode(block, 'DO');
    // TODO: Assemble Python into code variable.
    if (typeof value_loop === 'undefined' || value_loop === null || value_loop === '') {
        value_loop = 'False';
    }
    var loopType = (dropdown_type === 'WHILE') ? 'while' : 'while not';
    var code = loopType + ' ' + value_loop +':\n';
    code += statements_do;
    code += Blockly.Python.INDENT + 'time.sleep(' + value_delay + ')\n';
    return code;
};

Blockly.Blocks['linkbotjs_button_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("button event");
        this.appendValueInput("LINKBOT")
            .setCheck(null)
            .appendField("linkbot");
        this.appendValueInput("BUTTON")
            .setCheck("Number")
            .appendField("button #");
        this.appendValueInput("STATE")
            .setCheck("Number")
            .appendField("state");
        this.appendValueInput("TIMESTAMP")
            .setCheck("Number")
            .appendField("timestamp");
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_button_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_button = Blockly.JavaScript.valueToCode(block, 'BUTTON', Blockly.JavaScript.ORDER_ATOMIC);
    var value_state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_ATOMIC);
    var value_timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var code = value_linkbot + '.on(\'buttonEvent\', function(n_cb, state_cb, timestamp_cb) {\n';
    if (typeof value_button !== "undefined" && value_button !== null && value_button !== '') {
        code += indent + value_button + ' = n_cb;\n';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        code += indent + value_state + ' = state_cb;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = timestamp_cb;\n';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += '});\n';
    return code;
};

Blockly.Python['linkbotjs_button_events'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var value_button = Blockly.Python.valueToCode(block, 'BUTTON', Blockly.Python.ORDER_ATOMIC);
    var value_state = Blockly.Python.valueToCode(block, 'STATE', Blockly.Python.ORDER_ATOMIC);
    var value_timestamp = Blockly.Python.valueToCode(block, 'TIMESTAMP', Blockly.Python.ORDER_ATOMIC);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = 'def button_event_callback(n_cb,state_cb,timestamp_cb):\n';
    var body = '';
    var callbackdef = indent + 'global ';
    var code = value_linkbot + '.enable_button_events(button_event_callback)\n';
    if (typeof value_button !== "undefined" && value_button !== null && value_button !== '') {
        body += indent + value_button + ' = n_cb\n';
        callbackdef += value_button + ',';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        body += indent + value_state + ' = state_cb\n';
        callbackdef += value_state + ',';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        body += indent + value_timestamp + ' = timestamp_cb\n';
        callbackdef += value_state + ',';
    }
    if (callbackdef === indent + 'global ') {
        return '';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + callbackdef.substring(0, callbackdef.length - 1) + '\n' + body + '\n' + code;
    return code;
};

Blockly.Blocks['linkbotjs_encoder_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("encoder event");
        this.appendValueInput("LINKBOT")
            .setCheck(null)
            .appendField("linkbot");
        this.appendValueInput("ENCODER")
            .setCheck("Number")
            .appendField("button #");
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("state");
        this.appendValueInput("TIMESTAMP")
            .setCheck("Number")
            .appendField("timestamp");
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_encoder_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_encoder = Blockly.JavaScript.valueToCode(block, 'ENCODER', Blockly.JavaScript.ORDER_ATOMIC);
    var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
    var value_timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;

    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var code = value_linkbot + '.on(\'encoderEvent\', function(n_cb, angle_cb, timestamp_cb) {\n';
    if (typeof value_encoder !== "undefined" && value_encoder !== null && value_encoder !== '') {
        code += indent + value_encoder + ' = n_cb;\n';
    }
    if (typeof value_angle !== "undefined" && value_angle !== null && value_angle !== '') {
        code += indent + value_angle + ' = angle_cb;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = timestamp_cb;\n';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += '});\n';
    return code;
};

Blockly.Python['linkbotjs_encoder_events'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var value_encoder = Blockly.Python.valueToCode(block, 'ENCODER', Blockly.Python.ORDER_ATOMIC);
    var value_angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
    var value_timestamp = Blockly.Python.valueToCode(block, 'TIMESTAMP', Blockly.Python.ORDER_ATOMIC);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = 'def encoder_event_callback(encoder_cb,angle_cb,timestamp_cb):\n';
    var body = '';
    var callbackdef = indent + 'global ';
    var code = value_linkbot + '.enable_encoder_events(1, encoder_event_callback)\n';
    if (typeof value_encoder !== "undefined" && value_encoder !== null && value_encoder !== '') {
        body += indent + value_encoder + ' = encoder_cb\n';
        callbackdef += value_encoder + ',';
    }
    if (typeof value_angle !== "undefined" && value_angle !== null && value_angle !== '') {
        body += indent + value_angle + ' = angle_cb\n';
        callbackdef += value_angle + ',';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        body += indent + value_timestamp + ' = timestamp_cb\n';
        callbackdef += value_timestamp + ',';
    }
    if (callbackdef === indent + 'global ') {
        return '';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + callbackdef.substring(0, callbackdef.length - 1) + '\n' + body + '\n' + code;
    return code;
};

Blockly.Blocks['linkbotjs_accelerometer_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("accel event");
        this.appendValueInput("LINKBOT")
            .setCheck(null)
            .appendField("linkbot");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z");
        this.appendValueInput("TIMESTAMP")
            .setCheck("Number")
            .appendField("timestamp");
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_accelerometer_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var value_z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_ATOMIC);
    var value_timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var code = value_linkbot + '.on(\'accelerometerEvent\', function(x_cb, y_cb, z_cb, timestamp_cb) {\n';
    if (typeof value_x !== "undefined" && value_x !== null && value_x !== '') {
        code += indent + value_x + ' = x_cb;\n';
    }
    if (typeof value_y !== "undefined" && value_y !== null && value_y !== '') {
        code += indent + value_y + ' = y_cb;\n';
    }
    if (typeof value_z !== "undefined" && value_z !== null && value_z !== '') {
        code += indent + value_z + ' = z_cb;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = timestamp_cb;\n';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += '});\n';
    return code;
};

Blockly.Python['linkbotjs_accelerometer_events'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var value_x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC);
    var value_y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC);
    var value_z = Blockly.Python.valueToCode(block, 'Z', Blockly.Python.ORDER_ATOMIC);
    var value_timestamp = Blockly.Python.valueToCode(block, 'TIMESTAMP', Blockly.Python.ORDER_ATOMIC);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = 'def accelerometer_event_callback(x_cb,y_cb,z_cb,timestamp_cb):\n';
    var body = '';
    var callbackdef = indent + 'global ';
    var code = value_linkbot + '.enable_accelerometer_events(accelerometer_event_callback)\n';
    if (typeof value_x !== "undefined" && value_x !== null && value_x !== '') {
        body += indent + value_x + ' = x_cb\n';
        callbackdef += value_x + ',';
    }
    if (typeof value_y !== "undefined" && value_y !== null && value_y !== '') {
        body += indent + value_y + ' = y_cb\n';
        callbackdef += value_y + ',';
    }
    if (typeof value_z !== "undefined" && value_z !== null && value_z !== '') {
        body += indent + value_z + ' = z_cb\n';
        callbackdef += value_z + ',';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        body += indent + value_timestamp + ' = timestamp_cb\n';
        callbackdef += value_timestamp + ',';
    }
    if (callbackdef === indent + 'global ') {
        return '';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + callbackdef.substring(0, callbackdef.length - 1) + '\n' + body + '\n' + code;
    return code;
};

Blockly.Blocks['linkbotjs_joint_events'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("joint event");
        this.appendValueInput("LINKBOT")
            .setCheck(null)
            .appendField("linkbot");
        this.appendValueInput("JOINT")
            .setCheck("Number")
            .appendField("joint #");
        this.appendValueInput("STATE")
            .setCheck("Number")
            .appendField("state");
        this.appendValueInput("TIMESTAMP")
            .setCheck("Number")
            .appendField("timestamp");
        this.appendStatementInput("STATEMENTS")
            .setCheck(null)
            .appendField("onEvent");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(false);
        this.setColour(30);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['linkbotjs_joint_events'] = function(block) {
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_joint = Blockly.JavaScript.valueToCode(block, 'JOINT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_ATOMIC);
    var value_timestamp = Blockly.JavaScript.valueToCode(block, 'TIMESTAMP', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_statements = Blockly.JavaScript.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.JavaScript.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var code = value_linkbot + '.on(\'jointEvent\', function(joint_cb, state_cb, timestamp_cb) {\n';
    if (typeof value_joint !== "undefined" && value_joint !== null && value_joint !== '') {
        code += indent + value_joint + ' = joint_cb;\n';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        code += indent + value_state + ' = state_cb;\n';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        code += indent + value_timestamp + ' = timestamp_cb;\n';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        code += statements_statements + '\n';
    }
    code += '});\n';
    return code;
};

Blockly.Python['linkbotjs_joint_events'] = function(block) {
    var value_linkbot = Blockly.Python.valueToCode(block, 'LINKBOT', Blockly.Python.ORDER_ATOMIC);
    var value_joint = Blockly.Python.valueToCode(block, 'JOINT', Blockly.Python.ORDER_ATOMIC);
    var value_state = Blockly.Python.valueToCode(block, 'STATE', Blockly.Python.ORDER_ATOMIC);
    var value_timestamp = Blockly.Python.valueToCode(block, 'TIMESTAMP', Blockly.Python.ORDER_ATOMIC);
    var statements_statements = Blockly.Python.statementToCode(block, 'STATEMENTS');
    var indent = Blockly.Python.INDENT;
    if (typeof value_linkbot === "undefined" || value_linkbot === null) {
        return '';
    }
    var definition = 'def joint_event_callback(encoder_cb,angle_cb,timestamp_cb):\n';
    var body = '';
    var callbackdef = indent + 'global ';
    var code = value_linkbot + '.enable_joint_events(joint_event_callback)\n';
    if (typeof value_joint !== "undefined" && value_joint !== null && value_joint !== '') {
        body += indent + value_joint + ' = encoder_cb\n';
        callbackdef += value_joint + ',';
    }
    if (typeof value_state !== "undefined" && value_state !== null && value_state !== '') {
        body += indent + value_state + ' = angle_cb\n';
        callbackdef += value_state + ',';
    }
    if (typeof value_timestamp !== "undefined" && value_timestamp !== null && value_timestamp !== '') {
        body += indent + value_timestamp + ' = timestamp_cb\n';
        callbackdef += value_state + ',';
    }
    if (callbackdef === indent + 'global ') {
        return '';
    }
    if (typeof statements_statements !== "undefined" && statements_statements !== null && statements_statements !== '') {
        body += statements_statements;
    }
    code = definition + callbackdef.substring(0, callbackdef.length - 1) + '\n' + body + '\n' + code;
    return code;
};

Blockly.Blocks['simulator_setlocation'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("item"), "LINKBOT")
            .appendField(".setPosition(");
        this.appendValueInput("X")
            .appendField("x");
        this.appendValueInput("Y")
            .appendField(", y");
        this.appendDummyInput()
            .appendField(", ")
            .appendField(new Blockly.FieldAngle(90), "ROTATION")
            .appendField(")");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(345);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['simulator_setlocation'] = function(block) {
    var variable_linkbot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LINKBOT'), Blockly.Variables.NAME_TYPE);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    var angle_rotation = block.getFieldValue('ROTATION');
    var code = variable_linkbot + '.setPosition(' + value_x + ', ' + value_y + ', ' + angle_rotation + ');\n';
    return code;
};

Blockly.Blocks['simulator_resetlines'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("reset simulator lines");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(345);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['simulator_resetlines'] = function(block) {
    var code = 'simulator.resetLines();\n';
    return code;
};