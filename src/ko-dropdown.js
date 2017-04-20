(function(){
  var dropdowns = [];

  var hideAllDropdowns = function(){
    for(var i = 0; i < dropdowns.length; i ++){
      dropdowns[i].dropdownOpen(false);
    }
  }

  window.addEventListener('click', hideAllDropdowns);

  ko.components.register("ko-dropdown", {
    viewModel: function(params){
      var self = this;

      dropdowns.push(self);

      self.caption = params.caption;
      self.value = params.value;
      self.options = params.options;

      self.dropdownOpen = ko.observable(false);

      self.selectedOption = ko.observable();
      self.selectedText = ko.computed(function () {
          return ko.unwrap(self.selectedOption) ? ko.unwrap(self.selectedOption).text : "";
      });

      self.selectOption = function (option) {
          self.value(option.value);
          self.selectedOption(option);
      }

      self.dropdownOptions = ko.computed(function () {
          var retOptions = [];
          self.options().forEach(function (option) {
              if (typeof option === 'object' || option instanceof Object) {
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

      self.dropdownOptions.subscribe(function () {
          self.value.notifySubscribers(self.value()); // so if dropdown options change, update selected value
      })

      if (ko.unwrap(self.value)) {
          self.selectedOption(findOptionByValue(ko.unwrap(self.value)));
      } else if (ko.unwrap(self.caption)) {
          self.selectedOption({
              text: self.caption
          });
      }



      self.toggleOpen = function (data, event) {
          event.stopPropagation();
          self.dropdownOpen(!self.dropdownOpen());
      }

      self.toggleOpen = function(data, event){
        var currentStatus = self.dropdownOpen();

        event.stopPropagation();
        hideAllDropdowns();

        if (!currentStatus){
          self.dropdownOpen(true);
        }
      }


            self.value.subscribe(function (newValue) {
                var selectedValue = ko.unwrap(self.selectedOption) ? ko.unwrap(self.selectedOption).value : null;

                if (newValue !== selectedValue) {
                    var option = findOptionByValue(newValue);
                    if (option != null) {
                        self.selectOption(option);
                    }
                }
            });

            window.addEventListener('click', function (e) {
                self.dropdownOpen(false);
            });

            function findOptionByValue(val) {
                var foundOption = null;
                if (ko.unwrap(self.dropdownOptions)) {
                    self.dropdownOptions().forEach(function (option) {
                        if (option.value === val) {
                            foundOption = option;
                        }
                    });
                }
                return foundOption;
            }
        },
        template: "<div class='ko-dropdown' data-bind='click: toggleOpen'>\
        <span class='selected' data-bind='text: selectedText'></span>\
        <ul class='ko-dropdown__list' data-bind='visible: dropdownOpen, foreach: dropdownOptions'>\
          <li class='ko-dropdown__list-item' data-bind='text: text, click: $parent.selectOption'></li>\
        </ul>\
      </div>"
    });

}());
