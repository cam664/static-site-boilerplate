wiisageGlobalObj = {
  init: function() {
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM: function() {
    this.$body = $('body');
  },
  bindEvents: function() {
    this.$body.on('click', this.displayAlert.bind(this));
  },
  displayAlert: function(e) {
    this.$body.css('background', 'rgb('+ Math.floor(Math.random() * 256) +','+ Math.floor(Math.random() * 256) +','+ Math.floor(Math.random() * 256) +')');
  }
}

wiisageHomeObj = {
  init: function() {
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM: function() {

  },
  bindEvents: function() {
    
  }
}