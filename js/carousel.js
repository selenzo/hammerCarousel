class Carousel {
    constructor(id = null, arr = null, options = {
        maxSize: 1
    }) {
        this.id = id;
        this.arr = arr;
        this.animation = false;
        this.direction = false;
        this.maxSize = options.maxSize;

        this.hammer = new Hammer(document.getElementById(id));
        this.node = document.getElementById(this.id + '-items');
        this.elements = this.node.getElementsByTagName('li');
        this.hammer.on('swipe', this.swipe.bind(this));

        this.init();
    }
    init() {
        while (this.elements.length < this.maxSize + 2) {
            this.addItem('right');
        }
    }
    removeItem(position) {
        switch (position) {
            case 'right':
                this.node.removeChild(this.elements[this.elements.length - 1]);
                break
            case 'left':
                this.node.removeChild(this.elements[0]);
                break;
        }
    }
    addItem(position) {
        const el = document.createElement('li');
        let index;
        switch (position) {
            case 'right':
                index = this.getNextIndex();
                el.innerHTML = this.arr[index];
                el.setAttribute("id", index);
                this.node.appendChild(el);
                break;
            case 'left':
                index = this.getPrevIndex();
                el.innerHTML = this.arr[index];
                el.setAttribute("id", index);
                this.node.insertBefore(el, this.node.firstChild);
                break;
        }
    }
    getNextIndex() {
        let lastElementIndex = (this.elements.length != 0 ? parseInt(this.elements[this.elements.length - 1].getAttribute("id")) : -1);
        return (lastElementIndex >= this.arr.length - 1 ? 0 : lastElementIndex + 1);
    }
    getPrevIndex() {
        let firstElementIndex = (this.elements.length != 0 ? parseInt(this.elements[0].getAttribute("id")) : 0);
        return (firstElementIndex <= 0 ? this.arr.length - 1 : firstElementIndex - 1);
    }
    transitionend() {
        this.elements[1].removeEventListener('transitionend', this.transitionend.bind(this));
        switch (this.direction) {
            case 'right':
                this.elements[1].classList.remove('animate-right');
                this.removeItem('right');
                break;
            case 'left':
                this.elements[1].classList.remove('animate-left');
                this.removeItem('left');
                break;
        }
        this.animation = false;
        this.direction = false;
    }
    animate(direction) {
        this.direction = direction;
        this.animation = true;
        switch (this.direction) {
            case 'right':
                this.addItem('left');
                this.elements[1].classList.add('animate-right');
                this.elements[1].addEventListener('transitionend', this.transitionend.bind(this));
                break;
            case 'left':
                this.addItem('right');
                this.elements[1].classList.add('animate-left');
                this.elements[1].addEventListener('transitionend', this.transitionend.bind(this));
                break;
        }
    }
    swipe(e) {
        if (!this.animation) {
            switch (e.offsetDirection) {
                case 2:
                    this.animate('left');
                    break;
                case 4:
                    this.animate('right');
                    break;
            }
        }
    }
}