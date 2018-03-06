const arr = ['<img src="https://picsum.photos/200/300/?image=0" />',
    '<img src="https://picsum.photos/200/300/?image=10" />',
    '<img src="https://picsum.photos/200/300/?image=40" />'
];

const carousel = new Carousel('carousel', arr, {
    maxSize: 4
});