    let num = 0;
    let mem = 0;
    let input = "";
    let display = document.getElementById("displayed");
    let memorized = document.getElementById("memorized");
    let action = "";
    let timeToReset = false;
    let floats = false;

    function inputNum(x) {
        if (input.length < 12) {
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
            num = mem;
            mem = 0;
            action = "";
            display.innerHTML = sliced(num + "");
            memorized.innerHTML = sliced(mem + " ");
            timeToReset = true;
            floats = false;
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
