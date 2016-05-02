Blockly.Blocks['linkbotjs_new_linkbot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("New Unconnected Linkbot");
    this.setOutput(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['linkbotjs_new_linkbot'] = function(block) {
  var code = 'new Linkbot()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Python['linkbotjs_new_linkbot'] = function(block) {
  var code = 'None';
  return [code, Blockly.Python.ORDER_NONE];
};

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
    var code = 'return new Promise( function(resolve, reject) {\n'
             + '    setTimeout('+value_wait+', resolve());\n'
             + '    });\n'
             + '}).then( function() {\n';
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

Blockly.Blocks['linkbotjs_delay'] = {
  init: function() {
    this.appendValueInput("DELAY_SECONDS")
        .setCheck("Number")
        .appendField("Delay (seconds)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['linkbotjs_delay'] = function(block) {
  var value_delay_seconds = Blockly.JavaScript.valueToCode(block, 'DELAY_SECONDS', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '.then( function() {\n'
           + '  return new Promise( function(resolve, reject) {\n'
           + '    setTimeout(resolve, '+value_delay_seconds*1000+');\n'
           + '  });\n'
           + '})\n';
  return code;
};

Blockly.Python['linkbotjs_delay'] = function(block) {
  var value_delay_seconds = Blockly.Python.valueToCode(block, 'DELAY_SECONDS', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...\n';
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
    var block = 
          '.then( function() {\n'
        + '    var color = ' + value_color + '\n'
        + '    var red = parseInt(color.substring(1,3), 16);\n'
        + '    var green = parseInt(color.substring(3,5), 16);\n'
        + '    var blue = parseInt(color.substring(5,7), 16);\n'
        + '    return '+value_linkbot+'.color(red, green, blue);\n'
        + '})\n';
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

Blockly.Blocks['linkbotjs_connect_id'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Connect Linkbot to ID");
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("item"), "ROBOT");
    this.appendDummyInput()
        .appendField("Linkbot ID:")
        .appendField(new Blockly.FieldTextInput("ABCD"), "ROBOT_ID");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['linkbotjs_connect_id'] = function(block) {
    var variable_robot = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT'), Blockly.Variables.NAME_TYPE);
    var text_robot_id = block.getFieldValue('ROBOT_ID');
    var code = variable_robot + '.connect("ws://localhost:42000", "'+text_robot_id+'")\n';

    //return [code, Blockly.JavaScript.ORDER_ATOMIC];
    return code;
};

Blockly.Python['linkbotjs_connect_id'] = function(block) {
    var text_linkbot_id = block.getFieldValue('LINKBOT_ID');
    var code = 'linkbot.Linkbot("'+text_linkbot_id+'")';
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
    var code = 
        '.then( function() {\n' +
        '   return '+value_linkbot+'.setBuzzerFrequency('+value_name+');\n' +
        '})\n';
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
    var code = 
          '.then( function() {\n'
        + '    return '+value_linkbot+'.reset()\n'
        + '        .then( function() {\n'
        + '            return '+value_linkbot+'.moveTo(0, 0, 0, 0x07);\n'
        + '            })\n'
        + '        .then( function() {\n'
        + '            return '+value_linkbot+'.moveWait(0x07);\n'
        + '            });\n'
        + '})\n';
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

/*
Blockly.Python['linkbotjs_move_joint'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_linkbot = Blockly.JavaScript.valueToCode(block, 'LINKBOT', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_linkbot + '.moveToOneMotor(' + dropdown_name + ', ' + value_name + ');\n';
    return code;
};
*/

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
