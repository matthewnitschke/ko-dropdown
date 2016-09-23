(function(){
  ko.components.register("ko-dropdown", {
    viewModel: function(params){
      var self = this;

      self.caption = params.caption;
      self.value = params.value;
      self.options = params.options;

      self.dropdownOpen = ko.observable();

      self.selectedOption = ko.observable();
      self.selectedText = ko.computed(function() {
        return ko.unwrap(self.selectedOption) ? ko.unwrap(self.selectedOption).text : "";
      });

      if (ko.unwrap(self.caption)){
        self.selectedOption({
          text: self.caption
        });
      }

      // selects an option provided as a parameter (called from both html and component model)
      self.selectOption = function(option){
        self.value(option.value);
        self.selectedOption(option);
      }

      self.toggleOpen = function(data, event){
        event.stopPropagation();
        self.dropdownOpen(!self.dropdownOpen());
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

      // updates the selected option if value is changed from the viewModel
      self.value.subscribe(function(newValue){
        var selectedValue = ko.unwrap(self.selectedOption) ? ko.unwrap(self.selectedOption).value : null;

        if (newValue !== selectedValue){
          var option = findOptionByValue(newValue);
          if (option != null){
            self.selectOption(option);
          }
        }
      });

      window.addEventListener('click', function (e) {
          self.dropdownOpen(false);
      });

      function findOptionByValue(val){
        var foundOption = null;
        if (ko.unwrap(self.dropdownOptions)){
          self.dropdownOptions().forEach(function(option){
            if (option.value === val){
              foundOption = option;
            }
          });
        }
        return foundOption;
      }
    },
    template: "<div class='dropdown' data-bind='click: toggleOpen'>\
        <span class='selected' data-bind='text: selectedText'></span>\
        <ul data-bind='visible: dropdownOpen, foreach: dropdownOptions'>\
          <li data-bind='text: text, click: $parent.selectOption'></li>\
        </ul>\
      </div>"
  });

}());
