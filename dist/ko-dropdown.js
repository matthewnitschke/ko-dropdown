ko.components.register("ko-dropdown", {
  viewModel: function(params){
    var self = this;

    self.caption = params.caption;
    self.value = params.value;
    self.options = params.options;

    self.dropdownOpen = ko.observable();

    self.selectedText = ko.observable();
    if (ko.unwrap(self.caption)){
      self.selectedText(self.caption);
    }

    self.selectOption = function(option){
      self.value(option.value);
      self.selectedText(option.text);
    }

    self.dropdownOptions = ko.computed(function(){
      var retOptions = [];
      self.options().forEach(function(option){
        if (typeof option === 'object' || option instanceof Object){
          retOptions.push(option);
        } else {
          retOptions.push({
            value: option,
            text: option
          });
        }
      });

      if (retOptions.length > 0 && !ko.unwrap(self.caption)) {
        self.selectOption(retOptions[0]);
      }

      return retOptions;
    });

    self.toggleOpen = function(data, event){
      event.stopPropagation();
      self.dropdownOpen(!self.dropdownOpen());
    }

    window.addEventListener('click', function (e) {
        self.dropdownOpen(false);
    });
  },
  template: "<div class='dropdown' data-bind='click: toggleOpen'>\
      <span class='selected' data-bind='text: selectedText'></span>\
      <ul data-bind='visible: dropdownOpen, foreach: dropdownOptions'>\
        <li data-bind='text: text, click: $parent.selectOption'></li>\
      </ul>\
    </div>"
});
