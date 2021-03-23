class Slider {
  // constructor 
  constructor(options = {}) {
    this.options = {
      element: options.element || document.getElementById('planes'),
      easing: options.easing || 0.1,
      dragSpeed: options.dragSpeed || 1,
      duration: options.duration || 750,
    };

    this.isMouseDown = false;
    this.isTranslating = false;
    this.currentPosition = 0;
    this.startPosition = 0;
    this.endPosition = 0;
    this.translation = 0;
    this.animationFrame = null;
    this.setupSlider();
  }
  // helpers 
  // lerp function used for easing 
  lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return (1 - amount) * value1 + amount * value2;
  }

  getMousePosition(e) {
    let mousePosition;
    if(e.targetTouches) {
      if(e.targetTouches[0]) {
        mousePosition = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
      } else if (e.changedTouches[0]) {
        mousePosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      } else {
        mousePosition = [e.clientX, e.clientY];

      }
    } else {
      mousePosition = [e.clientX, e.clientY];
    }
    return mousePosition;
  }

  // slider boundries 

  setBoundries() {
    if(window.innerWidth >= window.innerHeight) {
      this.boundries = {
        max: -1 * this.options.element.clientWidth + window.innerWidth,
        min: 0,
        sliderSize: this.options.element.clientWidth,
        referentSize: window.innerWidth,
      };
      this.duration = 0;
    } else {
      this.boundries = {
        max: -1 * this.options.element.clientHeight + window.innerHeight,
        min: 0,
        sliderSize: this.options.element.clientHeight,
        referentSize: window.innerHeight,
      };
      this.direction = 1;
    }
  }

  // hooks 
  onDragStarted(mousePosition) {

  }

  onDrag(mousePosition) {}
  
  onDragEnded(mousePosition) {}

  onTranslation() {

  }

  // this is called once the translation has ended
  onTranslationEnded() {
  }

  // this is called before our slider has been resized
  onBeforeResize() {
  }

  // this is called after our slider has been resized
  onSliderResized() {
  }

  translateSlider(translation) {
    translation = Math.floor(translation * 100) / 100;
    let direction = this.direction === 0 ? 'translateX' : 'translateY';
    // apply
    this.options.element.style.transform = `${direction}(${translation}px)`;

    if (this.translation !== translation) {
      this.onTranslation();
    } else if (this.isTranslating && !this.isMouseDown) {
      this.isTranslating = false;
      
      this.onTranslationEnded();
    }
    this.translation = translation;
  }

  animate() {
    let translation = this.lerp(this.translation, this.currentPosition, this.options.easing);

    this.translateSlider(translation);


    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  // events 
  onMouseDown(e) {
     // start dragging
    this.isMouseDown = true;
    // apply specific styles
    this.options.element.classList.add("dragged");
    // get our touch/mouse start position
    var mousePosition = this.getMousePosition(e);
    // use our slider direction to determine if we need X or Y value
    this.startPosition = mousePosition[this.direction];
    // drag start hook
    this.onDragStarted(mousePosition);
  }
  // on mouse or touch move
  onMouseMove(e) {
    // if we are not dragging, we don't do nothing
    if(!this.isMouseDown) return;

    // get our touch/mouse position
    let mousePosition = this.getMousePosition(e);

    // get our current position
    this.currentPosition = this.endPosition + ((mousePosition[this.direction] - this.startPosition) * this.options.dragSpeed);

    // if we're not hitting the boundaries
    if(this.currentPosition > this.boundaries.min && this.currentPosition < this.boundaries.max) {
        // if we moved that means we have started translating the slider
        this.isTranslating = true;
    }
    else {
        // clamp our current position with boundaries
        this.currentPosition = Math.min(this.currentPosition, this.boundaries.min);
        this.currentPosition = Math.max(this.currentPosition, this.boundaries.max);
    }

    // drag hook
    this.onDrag(mousePosition);
  }

  // on mouse up or touchend
  onMouseUp(e) {
    // we have finished dragging
    this.isMouseDown = false;

    // remove specific styles
    this.options.element.classList.remove("dragged");

    // update our end position
    this.endPosition = this.currentPosition;

    // send our mouse/touch position to our hook
    let mousePosition = this.getMousePosition(e);

    // drag ended hook
    this.onDragEnded(mousePosition);
  }
  onResize(e) {
    this.onBeforeResize();

    // get our old translation ratio
    let ratio = this.translation / this.boundaries.sliderSize;

    // reset boundaries and properties bound to window size
    this.setBoundaries();

    // reset all translations
    this.options.element.style.transform = "tanslate3d(0, 0, 0)";

    // calculate our new translation based on the old translation ratio
    var newTranslation = ratio * this.boundaries.sliderSize;
    // clamp translation to the new boundaries
    newTranslation = Math.min(newTranslation, this.boundaries.min);
    newTranslation = Math.max(newTranslation, this.boundaries.max);

    // apply our new translation
    this.translateSlider(newTranslation);

    // reset current and end positions
    this.currentPosition = newTranslation;
    this.endPosition = newTranslation;

    // call our resize hook
    this.onSliderResized();
  }

  /*** SET UP AND DESTROY ***/

    // set up our slider
    // init its boundaries, add event listeners and start raf loop
    setupSlider() {
      this.setBoundaries();

      // event listeners

      // mouse events
      window.addEventListener("mousemove", this.onMouseMove.bind(this), {
          passive: true,
      });
      window.addEventListener("mousedown", this.onMouseDown.bind(this));
      window.addEventListener("mouseup", this.onMouseUp.bind(this));

      // touch events
      window.addEventListener("touchmove", this.onMouseMove.bind(this), {
          passive: true,
      });
      window.addEventListener("touchstart", this.onMouseDown.bind(this), {
          passive: true,
      });
      window.addEventListener("touchend", this.onMouseUp.bind(this));

      // resize event
      window.addEventListener("resize", this.onResize.bind(this));

      // launch our request animation frame loop
      this.animate();
  }

  // will be called silently to cleanly remove the slider
  destroySlider() {
      // remove event listeners

      // mouse events
      window.removeEventListener("mousemove", this.onMouseMove, {
          passive: true,
      });
      window.removeEventListener("mousedown", this.onMouseDown);
      window.removeEventListener("mouseup", this.onMouseUp);

      // touch events
      window.removeEventListener("touchmove", this.onMouseMove, {
          passive: true,
      });
      window.removeEventListener("touchstart", this.onMouseDown, {
          passive: true,
      });
      window.removeEventListener("touchend", this.onMouseUp);

      // resize event
      window.removeEventListener("resize", this.onResize);

      // cancel request animation frame
      cancelAnimationFrame(this.animationFrame);
  }

  // call this method publicly to destroy our slider
  destroy() {
      // destroy everything related to the slider
      this.destroySlider();
  }

}

class WebGLSlider extends Slider {
  constructor(options) {
    super(options);

    // tweening
    this.animation = null;
    // value from 0 to 1 to pass as uniform to the WebGL
    // will be tweened on mousedown / touchstart and mouseup / touchend events
    this.effect = 0;

    // our WebGL variables
    this.curtains = null;
    this.planes = [];
    // we will keep track of the previous translation values on resize
    this.previousTranslation = {
        x: 0,
        y: 0,
    };
    this.shaderPass = null;

    // set up the WebGL part
    this.setupWebGL();
  }

  setupWebGL() {
    this.curtains = new Curtains({
      container: 'canvas',
    })

    this.curtains.onError(() => {
      document.body.classList.add('no-curtains');
    });

    this.setupPlanes();
    this.setupShaderPass();
  }

  setupPlanes() {
    let planeElements = document.getElementsByClassName('plane');

    let params = {
      vertexShaderID: 'slider-planes-vs',
      fragmentShaderID: 'slider-planes-fs',
      uniforms: {
        opacity: {
          name: 'uOpacity',
          type: '1f',
          value: 0,
        }
      }
    }
    for (let i = 0; i < planeElements.length; i++) {
      let plane = this.curtains.addPlane(planeElements[i], params);

      if (plane) {
        this.planes.push(plane);

        plane.onReady(() => {
          let currentPlane = this;

          currentPlane.htmlElement.closest('.plane-wrapper').classList.add('loaded');

          let opacity = {
            value: 0,
          }

          anime({
            targets: opacity,
            value: 1,
            easing: "linear",
            duration: 750,
            update: function() {
                // continualy increase opacity from 0 to 1
                currentPlane.uniforms.opacity.value = opacity.value;
            },
          });

        })
      }

    }
  }

  setupShaderPass() {
    
  }



}
