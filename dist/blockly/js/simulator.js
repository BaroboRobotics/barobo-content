/**
 * Created by Adam on 3/19/2016.
 */
// Simulator setup.

var simulator = {};
simulator.robots = {};
simulator.robotImg = new Image();
simulator.robotImg.src = '../img/simulator_robot.png';

simulator.operations = {
    getRobot: function(id) {
        var robot = simulator.robots[id];
        if (robot) {
            return robot;
        }
        robot = simulator.operations.initRobot(id);
        simulator.robots[id] = robot;
        var data = [];
        for (var key in simulator.robots) {
            var b = simulator.robots[key];
            data.push({
                data: [],
                lines: { show: true }
            });
            data.push({
                data: [b.position],
                points: {
                    symbol: function(ctx, x, y, radius, shadow) {
                        simulator.drawRobot(ctx, x, y, radius, shadow, b);
                    },
                    show: true
                }
            });

        }
        simulator.plot.destroy();
        simulator.data = data;
        simulator.plot = $.plot("#simulator", simulator.data, simulator.settings);
        return robot;
    },
    initRobot: function(id) {
        var robot = {
            wheel: {
                radius: 1.75, // inches
                circumference: Math.PI * 1.75 * 2, // diameter * PI
                speed: [90, 90], // degrees per second.
                position: [0, 0], // The wheel position in degrees.
                direction: [0, 0], // -1 negative, 0 stop, 1 forward.
                moving: [false, false]
            },
            radius: 2.0, // inches
            circumference: Math.PI * 2.0 * 2,
            position: [0, 0], // position in inches.
            rotation: 0,
            id: id,
            state: 'stop',
            newLocation: [0, 0],
            settingPosition: false,
            positionTick: 0
        };
        robot.setPosition = function(x, y, rotation) {
            if (x === undefined || y === undefined) {
                return;
            }
            robot.position = [x, y];
            if (rotation !== undefined) {
                robot.rotation = rotation;
            }
            simulator.redraw = true;
        };
        robot.angularSpeed = function(s1, s2, s3) {
            robot.wheel.speed = [s1, s3];
        };
        robot.moveTo = function(wheelPos1, wheelPos2) {
            robot.newLocation = [wheelPos1, (wheelPos2 * -1)];
            robot.state = 'move';
        };
        robot.move = function(wheelPos1, wheelPos2) {
            robot.newLocation[0] = robot.newLocation[0] + wheelPos1;
            robot.newLocation[1] = robot.newLocation[1] + (wheelPos2 * -1);
            robot.state = 'move';
        };
        robot.moveToOneMotor = function(joint, position) {
            robot.newLocation[joint] = position;
            robot.state = 'move';
        };
        robot.moveForward = function() {
            robot.wheel.direction = [1, 1];
            robot.state = 'continuous';
        };
        robot.moveBackward = function() {
            robot.wheel.direction = [-1, -1];
            robot.state = 'continuous';
        };
        robot.moveLeft = function() {
            robot.wheel.direction = [-1, 1];
            robot.state = 'continuous';
        };
        robot.moveRight = function() {
            robot.wheel.direction = [1, -1];
            robot.state = 'continuous';
        };
        robot.stop = function() {
            robot.wheel.direction = [0, 0];
            robot.state = 'stop';
        };
        robot.zero = function() {
            robot.moveTo(0, 0);
        };
        return robot;
    },
    calcNewPosition: function(robot, t) {
        var center, i, x, y, theta, delta, distance, prevTheta;
        delta = [0, 0];
        distance = [0, 0];
        for (i = 0; i < 2; i++) {
            delta[i] = robot.wheel.speed[i] * t * robot.wheel.direction[i];
            robot.wheel.position[i] = robot.wheel.position[i] + delta[i];
            distance[i] = robot.wheel.circumference * (delta[i] / 360);
        }
        center = .5 * (distance[0] + distance[1]);
        prevTheta = (robot.rotation * Math.PI) / 180;
        x = robot.position[0] + (center * Math.sin(prevTheta));
        y = robot.position[1] + (center * Math.cos(prevTheta));
        theta = prevTheta + ((distance[0] - distance[1]) / (robot.radius * 2.0));
        robot.rotation = (theta * 180) / Math.PI;
        robot.position = [x, y];
    }

};

simulator.drawRobot = function(ctx, x, y, radius, shadow, robot) {
    var rad = 40;
    var position = {x:x - rad, y:y - rad, width:rad*2, height: rad*2};
    ctx.save();
    ctx.translate(position.x + rad, position.y + rad);
    if (robot) {
        ctx.rotate(robot.rotation * Math.PI / 180);
    }
    ctx.drawImage(simulator.robotImg, -rad, -rad, position.width, position.height);
    ctx.restore();
};

simulator.settings = {
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
simulator.data = [{
    data:[[0, 0]],
    points: {
        symbol: function(ctx, x, y, radius, shadow) {
            var robot = {};
            robot.rotation = 0;
            simulator.drawRobot(ctx, x, y, radius, shadow, robot);
        },
        show: true
    }
}];
simulator.plot = null;
simulator.lastRun = null;
simulator.redraw = false;

simulator.proxyLinkbots = function() {
    function proxyRobot(robot, simulatorRobot) {
        if (!simulatorRobot || !robot) {
            console.log('no robot or simulated robot');
            return;
        }

        (function(angularSpeed) {
            robot.angularSpeed = function(s1, s2, s3) {
                angularSpeed(s1, s2, s3);
                simulatorRobot.angularSpeed(s1, s2, s3);
            }
        })(robot.angularSpeed);
        (function(move) {
            robot.move = function(s1, s2, s3) {
                move(s1, s2, s3);
                simulatorRobot.move(s1, s2, s3);
            }
        })(robot.move);
        (function(moveTo) {
            robot.moveTo = function(s1, s2, s3) {
                moveTo(s1, s2, s3);
                simulatorRobot.moveTo(s1, s2, s3);
            }
        })(robot.moveTo);
        (function(moveToOneMotor) {
            robot.moveToOneMotor = function(joint, position) {
                moveToOneMotor(joint, position);
                simulatorRobot.moveToOneMotor(joint, position);
            }
        })(robot.moveToOneMotor);
        (function(moveForward) {
            robot.moveForward = function() {
                moveForward();
                simulatorRobot.moveForward();
            }
        })(robot.moveForward);
        (function(moveBackward) {
            robot.moveBackward = function() {
                moveBackward();
                simulatorRobot.moveBackward();
            }
        })(robot.moveBackward);
        (function(moveLeft) {
            robot.moveLeft = function() {
                moveLeft();
                simulatorRobot.moveLeft();
            }
        })(robot.moveLeft);
        (function(moveRight) {
            robot.moveRight = function() {
                moveRight();
                simulatorRobot.moveRight();
            }
        })(robot.moveRight);
        (function(stop) {
            robot.stop = function() {
                stop();
                simulatorRobot.stop();
            }
        })(robot.stop);
        (function(zero) {
            robot.zero = function() {
                zero();
                simulatorRobot.zero();
            }
        })(robot.zero);
        robot.setPosition = function(x, y, rotation) {
            simulatorRobot.setPosition(x, y , rotation);
        }
    }
    if (Linkbots) {
        (function(proxied) {
            window.Linkbots.acquire = function(v) {
                var aquired, simRobot, robots;
                aquired = proxied(v);
                robots = aquired.robots;
                for (var i = 0; i < robots.length; i++) {
                    simRobot = simulator.operations.getRobot(robots[i].id);
                    proxyRobot(robots[i], simRobot);
                }
                return aquired;
            };
        })(Linkbots.acquire);
    }
};

simulator.draw = function() {
    var i = 0, key;
    simulator.redraw = false;
    for (key in simulator.robots) {
        var robot = simulator.robots[key];
        simulator.data[i+1].data = [robot.position];
        if (robot.state !== 'stop') {
            if (robot.settingPosition) {
                simulator.data[i].data = [robot.position];
                robot.positionTick = 0;
            } else if (robot.positionTick === 0) {
                simulator.data[i].data.push(robot.position);
            }
            robot.positionTick += 1;
            robot.positionTick = robot.positionTick % 10;
        }
        i += 2;
    }
    simulator.plot.setData(simulator.data);
    simulator.plot.draw();

};

simulator.resetLines = function() {
    var i = 0;
    for (i = 0; i < simulator.data.length; i += 2) {
        simulator.data[i].data = [];
    }
    simulator.plot.setData(simulator.data);
    simulator.plot.draw();
};

simulator.init = function() {
    simulator.plot = $.plot("#simulator", simulator.data, simulator.settings);
    simulator.proxyLinkbots();
    simulator.lastRun = new Date();
    setInterval(function() {
        var d, t, i, j, draw, key;
        d = new Date();
        t = d.getTime() - simulator.lastRun.getTime();
        t = t / 1000;
        simulator.lastRun = d;
        i = 0;
        for (key in simulator.robots) {
            var robot = simulator.robots[key];
            if (robot.state === 'move') {
                for (j = 0; j < 2; j++) {
                    if (Math.round(robot.wheel.position[j]) < Math.round(robot.newLocation[j])) {
                        robot.wheel.direction[j] = 1;
                    } else if (Math.round(robot.wheel.position[j]) > Math.round(robot.newLocation[j])) {
                        robot.wheel.direction[j] = -1;
                    } else {
                        robot.wheel.direction[j] = 0;
                    }
                }
            }
            if (robot.state !== 'stop') {
                if (robot.wheel.direction[0] === 0 && robot.wheel.direction[1] === 0) {
                    robot.state = 'stop';
                }
                simulator.redraw = true;
                simulator.operations.calcNewPosition(robot, t);
                //console.log('drawing robot ' + robot.id + ' at position (' + robot.position[0] + ', ' + robot.position[1] + ') rotation ' + robot.rotation + ' t = ' + t);
            }
            i++;
        }
        if (simulator.redraw) {
            simulator.draw();
        }
    }, 10);
};