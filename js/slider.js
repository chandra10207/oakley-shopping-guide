// JavaScript to slide image
var sliderContainer = document.getElementById("slider");
var sliderObj = new Slider();
sliderObj.init(sliderContainer);

function Slider() {
    this.nextImgInterval = 0;
    this.prevImgInterval = 0;
    this.autoInterval = 0;
    this.slider;
    this.ul;
    this.noOfImages;
    this.imgMovFlag = 0;
    this.left = 0;
    this.animator = new AnimateClass();
    var that = this;
    var goNext = 1;
    var finish = 1;
    this.goRight = 0;
    this.goLeft = 0;
    var leftButton;
    var rightButton;
    this.init = function(sliderContainer) {
        that.slider = sliderContainer;
        that.ul = that.slider.getElementsByTagName("ul")[0];
        that.noOfImages = that.slider.getElementsByTagName("li").length - 1;
        leftButton = document.createElement("button");
        leftButton.className = "slider-move-left-button";
        rightButton = document.createElement("button");
        rightButton.className = "slider-move-right-button";
        that.slider.appendChild(leftButton);
        that.slider.appendChild(rightButton);
        leftButton.onclick = that.leftPressed;
        rightButton.onclick = that.rightPressed;
        that.autoInterval = setInterval(that.autoAnimate, 3000);
    };
    this.leftPressed = function() {
        clearInterval(that.autoInterval);
        that.autoInterval = setInterval(that.autoAnimate, 3500);
        that.prevImg();
    };
    this.rightPressed = function() {
        clearInterval(that.autoInterval);
        that.autoInterval = setInterval(that.autoAnimate, 3500);
        that.nextImg();
    };

    this.nextImg = function() {
        if (that.imgMovFlag < that.noOfImages) {
            if (finish == 1) {
                finish = 0;
                that.imgMovFlag++;
                that.animator.animate(that.ul, {left: (-1009 * that.imgMovFlag)}, 200, callBack);
            }

        }
        that.sliderNav();
    }

    this.prevImg = function() {
        if (that.imgMovFlag > 0) {
            if (finish == 1) {

                finish = 0;
                that.imgMovFlag--;
                that.animator.animate(that.ul, {left: (-1009 * that.imgMovFlag)}, 400, callBack);
            }
        }
        that.sliderNav();
    }

    this.sliderNav = function() {
        if (that.imgMovFlag == that.noOfImages) {
            rightButton.style.background = "url(images/r-inactive.png) 0 0 no-repeat";
        } else {
            rightButton.style.background = "url(images/r-active.png) 0 0 no-repeat";
        }

        if (that.imgMovFlag > 0) {
            leftButton.style.background = "url(images/l-active.png) 0 0 no-repeat";
        } else {
            leftButton.style.background = "url(images/l-inactive.png) 0 0 no-repeat";
        }
    }
    this.autoAnimate = function() {
        if (goNext == 1) {
            if (that.imgMovFlag == that.noOfImages)
                goNext = 0;
            that.nextImg();

        }
        if (goNext == 0) {
            that.prevImg();
            if (that.imgMovFlag == 0)
                goNext = 1;
        }
    }
    var callBack = function(isFin) {
        finish = isFin;
    }
}

function AnimateClass() {

    this.element;
    this.props;
    this.duration;
    this.callBack;
    var frequency = 10;
    this.intervalId = 0;
    this.finishFlag = 0;
    var counter = 0;
    var top = 0;
    var left = 0;
    var width = 0;
    var height = 0;
    var backgroundClr = 0;
    var that = this;
    this.animate = function(el, props, duration, cb) {
        counter = 0;
        that.element = el;
        that.props = props;
        that.duration = duration;
        that.callBack = cb;
        top = that.element.offsetTop;
        left = that.element.offsetLeft;
        backgroundClr = that.element.style.background;
        //console.log("that.interval",that.intervalId);
        clearInterval(that.intervalId);
        that.intervalId = setInterval(that.move, frequency);
    }

    this.move = function() {
        counter++;
        if (that.props.top != undefined) {
            var val;

            if (top > that.props.top) {
                val = top - (top - that.props.top) / (that.duration / frequency) * counter;
            } else {
                val = top + (that.props.top - top) / (that.duration / frequency) * counter;
            }
            that.element.style.top = val + "px";
        }
        if (that.props.left != undefined) {
            var val;
            if (left > that.props.left) {
                val = left - (left - that.props.left) / (that.duration / frequency) * counter;
            } else {
                val = left + (that.props.left - left) / (that.duration / frequency) * counter;
            }
            that.element.style.left = val + "px";
        }
        if (that.props.width) {
            var val = that.props.width / (that.duration / frequency) * counter;
            that.element.style.width = val + "px";
        }
        if (that.props.height) {
            var val = that.props.height / (that.duration / frequency) * counter;
            that.element.style.height = val + "px";
        }

        if (that.props.color) {
            var colorCode = parseInt(that.props.color, 16);
            var val = colorCode / (that.duration / frequency) * counter;
            that.element.style.background = "#" + val.toString(16);
        }
        if (counter >= (that.duration / frequency)) {

            clearInterval(that.intervalId);
            that.callBack(1);
        }
    }

    this.stop = function() {
        clearInterval(that.intervalId);
    }

    this.finish = function() {
        that.element.style.left = that.props.left + "px";
        that.callBack(that.finishFlag++);
        if (that.finishFlag > 1)
            that.finishFlag = 0;
        clearInterval(that.intervalId);
    }
}






