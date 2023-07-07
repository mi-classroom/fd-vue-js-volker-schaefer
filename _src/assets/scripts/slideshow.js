const app = Vue.createApp({
  data() {
    return {
      slides: [],
      activeSlide: 0
    }
  },
  template: `
    <div class="slideshow">
      <div class="slideshow__slides">
        <figure v-for="(slide, index) in slides" class="slideshow__slide" :class="{'is-active': activeSlide === index}">
          <img :src="slide.image" :alt="slide.title" />
          <figcaption>{{slide.caption}}</figcaption>
        </figure>
      </div>
      <div class="slideshow__controls">
        <button class="slideshow__prev" @click="prevSlide()"><i class="icon">arrow_back_ios</i></button>
        <button class="slideshow__next" @click="nextSlide()"><i class="icon">arrow_forward_ios</i></button>
        <ul class="slideshow__dot-navigation">
          <li v-for="(slide, index) in slides" class="slideshow__dot-navigation-item" :class="{'is-active': activeSlide === index}">
            <button :title="slide.title" @click="showSlide(index)"></button>
          </li>
        </ul>
      </div>
    </div>`,
  methods: {
    async fetchSlides() {
      fetch('/web-xr/assets/data/slideshows.json')
        .then(response => response.json())
        .then((data) => {
          this.slides = data["/articles/learnings-mario-ma"];
        });
    },
    nextSlide() {
      this.activeSlide = (this.activeSlide + 1) % this.numberOfSlides;
    },
    prevSlide() {
      this.activeSlide = (this.activeSlide - 1 + this.numberOfSlides) % this.numberOfSlides;
      console.log(this.activeSlide);
    },
    showSlide(index) {
      this.activeSlide = index;
    }
  },
  computed: {
    numberOfSlides() {
      return this.slides.length;
    }
  },
  mounted() {
    this.fetchSlides();
  }
}).mount('#app')