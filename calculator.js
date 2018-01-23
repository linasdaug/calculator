    let num = 0;
    let mem = 0;
    let input = "";
    let display = document.getElementById("displayed");
    let memorized = document.getElementById("memorized");
    let action = "";
    let timeToReset = false;
    let floats = false;
    let key = 0;

    document.addEventListener("keydown", function(event) {
        key = event.which;
        switch (key) {
            case 8:
                resetCurrent();
                break;
            case 49:
                inputNum(1);
                break;
            case 50:
                inputNum(2);
                break;
            case 51:
                inputNum(3);
                break;
            case 52:
                inputNum(4);
                break;
            case 53:
                inputNum(5);
                break;
            case 54:
                inputNum(6);
                break;
            case 55:
                inputNum(7);
                break;
            case 56:
                inputNum(8);
                break;
            case 57:
                inputNum(9);
                break;
            case 48:
                inputNum(0);
                break;
            case 27:
                reset();
                break;
            case 13:
                equal();
                break;
            case 61:
                equal();
                break;
            case 191:
                divide();
                break;
            case 110:
                floated();
                break;
            case 107:
                plus();
                break;
            case 111:
                divide();
                break;
            case 106:
                multiply();
                break;
            case 109:
                minus();
                break;
            case 188:
                floated();
                break;
            case 190:
                floated();
                break;
            case 97:
                inputNum(1);
                break;
            case 98:
                inputNum(2);
                break;
            case 99:
                inputNum(3);
                break;
            case 100:
                inputNum(4);
                break;
            case 101:
                inputNum(5);
                break;
            case 102:
                inputNum(6);
                break;
            case 103:
                inputNum(7);
                break;
            case 104:
                inputNum(8);
                break;
            case 105:
                inputNum(9);
                break;
            case 96:
                inputNum(0);
                break;
            case 111:
                divide();
                break;
            case 106:
                multiply();
                break;
            case 109:
                minus();
                break;
            case 107:
                plus();
                break;
            case 110:
                floated();
                break;
            };
    });


    function inputNum(x) {
        if (num < 1000000000000 && input.length < 22) {
            input += x;
            num = parseFloat(input);
            }
        if (timeToReset) {
            num = parseFloat(x);
            timeToReset = false;
        };
        display.innerHTML = num;
    };

    function floated() {
        if (!floats) {
            input += '.';
        }
        floats = true;
    };

    function reset() {
        display.innerHTML = "0";
        memorized.innerHTML = "&nbsp;"
        input = "";
        num = 0;
        mem = 0;
        action = "";
        floats = false;
    };

    function resetCurrent() {
        display.innerHTML = "0";
        input = "";
        num = 0;
        floats = false;
    };

    function plus() {
        endPrevious();
        mem += num;
        num = 0;
        input = "";
        action = "+";
        display.innerHTML = num + "";
        memorized.innerHTML = mem + " " + action;
        floats = false;
    };

    function minus() {
        endPrevious();
        if (mem != 0) {
            mem -= num;
        } else {
            mem = num;
        };
        num = 0;
        input = "";
        action = "-";
        display.innerHTML = num + "";
        memorized.innerHTML = mem + " " + action;
        floats = false;
    };

    function multiply() {
        endPrevious();
        if (num != 0) {
            mem = num;
            num = 0;
            input = "";
        };
        action = "x";
        display.innerHTML = num + "";
        memorized.innerHTML = mem + " " + action;
        floats = false;
    };


    function divide() {
        endPrevious();
        if (mem != 0) {
            if (num != 0) {
            mem /= num;
            };
        } else {
            mem = num;
        };
        num = 0;
        input = "";
        action = ":";
        display.innerHTML = sliced(num + "");
        memorized.innerHTML = sliced(mem + " ") + action;
        floats = false;
    };

    function equal() {

        if (action != "") {
            endPrevious();
            if (mem == Infinity) {
                display.innerHTML = "Cannot divide by zero";
                memorized.innerHTML = ":0";
                action = "";
                num = 0;
                mem = 0;
            } else {
            num = mem;
            mem = 0;
            action = "";
            display.innerHTML = sliced(num + "");
            memorized.innerHTML = sliced(mem + " ");
            timeToReset = true;
            floats = false;
            };
        }

    }

    function percentage() {
        let perc = num;
        switch (action) {
            case "+":
                num = mem + (mem * (num / 100));
            break;
            case "-":
                num = mem - (mem * (num / 100));
            break;
            case "x":
                num = mem * num / 100;
            break;
            case ":":
                num = mem / (num / 100);
            break;
        };

        display.innerHTML = sliced(num + "");
        memorized.innerHTML = sliced(mem + " " + action + " " + perc + "%");
        action = "";
        floats = false;
        input="";
        mem = 0;
    };

    function endPrevious() {
        switch (action) {
            case "+":
                mem += num;
                num = 0;
                input = '';
                display.innerHTML = num + "";
                memorized.innerHTML = mem + " " + action;
            break;
            case "-":
                mem -= num;
                num = 0;
                input = "";
                display.innerHTML = num + "";
                memorized.innerHTML = mem + " " + action;
            break;
            case "x":
                mem *= num;
                num = 0;
                input = "";
                display.innerHTML = num + "";
                memorized.innerHTML = mem + " " + action;
            break;
            case ":":
                mem /= num;
                num = 0;
                input = "";
                display.innerHTML = sliced(num + "");
                memorized.innerHTML = sliced(mem + " " + action);
            break;
        }
    };

    function sliced(a) {
        if (a.indexOf(".") && a.indexOf("0000")) {
            if (a.indexOf(".") < a.indexOf("0000")) {
                a = a.slice(0, a.indexOf("0000"))
            };
        };
        return a;
    };
