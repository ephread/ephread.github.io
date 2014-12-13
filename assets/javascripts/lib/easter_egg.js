var EasterEgg = function (firstImagePath, secondImagePath) {
  var easterEgg = {
    // Lock code activation when a step is already running through.
    konamiCodeLock: false,
    
    // Step index, increase everytime the user retype a Konami code (or enter).
    currentStep: 0,
  
    // Messages to display at each different steps – retrieved from HTML page.
    message: JSON.parse(document.body.dataset.easterEgg),
    
    // Blinking prompt duration before and after
    // displaying message. (Long and short values.)
    longDurationBefore: 3000,
    longDurationAfter: 2000,
    shortDurationBefore: 3000,
    shortDurationAfter: 2000,
    
    // Back overla on which the messeg will print.
    blackBackground: undefined,
    
    /**
     * Create all the necessary markup to display the
     * easter egg message.
     *
     * @return a top level node to be added to the body.
     */
    createMessage: function () {
      var textSpan = document.createElement("span");
      textSpan.id = "easter-egg-text";
    
      var promptSpan = document.createElement("span");
      promptSpan.id = "easter-egg-prompt";
      promptSpan.className = "easter-egg-prompt";
    
      var promptCharacter = document.createTextNode("_");
      promptSpan.appendChild(promptCharacter);
    
      var messageParagraph = document.createElement("p");
      messageParagraph.appendChild(textSpan);
      messageParagraph.appendChild(promptSpan);
      messageParagraph.className = "easter-egg-message";
    
      return messageParagraph
    },
  
    /**
     * Create the black overlay and append all the necessary
     * nodes to it.
     *
     * @return the black overlay node containing all the necessary subnodes.
     */
    createBlackBackground: function () {
      // This will blacken the screen (even though it might be black already).
      var blackBackground = document.createElement("div");
      blackBackground.id = "black-overlay";
      blackBackground.className += "black-overlay hidden";
    
      // Append all the neccessay tag to the black background.
      blackBackground.appendChild(easterEgg.createMessage());
      
      return blackBackground;
    },
    
    /**
     * Append letter by letter a given message
     * to a given target with a given time step.
     *
     * @param target javascript node in which append the message.
     * @param message message to append.
     * @param current position in the 'message' string (used in recursion).
     * @param interval time between two letter appending.
     */
    showText: function (target, message, index, interval) {
      if (index < message.length) {
        letter = document.createTextNode(message[index++]) 
        target.appendChild(letter);
      
        setTimeout(function () {
          easterEgg.showText(target, message, index, interval);
        }, interval);
      }
    },
    
    /**
     * Animate the secret message!
     * Full of nested timeout, not very practical. But it'll do
     * for this simple animation.
     */
    animateMessage: function () {
      var durationBefore, durationAfter;
    
      if (easterEgg.currentStep > 0 &&
          easterEgg.message[easterEgg.currentStep].length != 0 )
      {    
        durationBefore = easterEgg.longDurationBefore;
        durationAfter  = easterEgg.longDurationAfter;
      } else {
        durationBefore = easterEgg.shortDurationBefore;
        durationAfter  = easterEgg.shortDurationAfter;
      }
    
      setTimeout(function() {
        easterEgg.blackBackground.className =
          easterEgg.blackBackground.className.replace(/\bhidden\b/, '');
        
        setTimeout(function() {
          textSpan = document.getElementById("easter-egg-text");
          if (easterEgg.currentStep < easterEgg.message.length) {
            easterEgg.showText(textSpan, easterEgg.message[easterEgg.currentStep], 0, 100)
          }
            
          setTimeout(function() {
                
            var extraTimeout;
            
            if (easterEgg.currentStep == 4 || easterEgg.currentStep == 15) {
              extraTimeout = 3000
                
              var image = document.createElement("img");
                    
              if (easterEgg.currentStep == 4) {
                image.src = firstImagePath
              } else {
                image.src = secondImagePath
              }
                
              easterEgg.blackBackground.appendChild(image);
            }
                
            setTimeout(function() {
              easterEgg.currentStep++;
              easterEgg.blackBackground.className += " crt-off";
            
              sections = document.getElementById('all-sections')
              sections.className = sections.className.replace(/\boff-screen\b/, '');
            
              setTimeout(function() {
                easterEgg.blackBackground.className += " hidden";
                    
                setTimeout(function() {
                  document.body.removeChild(easterEgg.blackBackground);
                  easterEgg.konamiCodeLock = false;
                }, 100);
              }, 300);
            }, extraTimeout)
          }, easterEgg.message[easterEgg.currentStep].length * 140 + durationAfter);
        }, durationBefore)
      }, 1500);
    },
    
    /**
     * Will be the callback function passed to the Konami code detector.
     */ 
    displayMessage: function() {
    
      // Konami code logic
      if (easterEgg.konamiCodeLock) return;
      easterEgg.konamiCodeLock = true;
    
      // Move all the sections off screen (dim it actually)
      document.getElementById('all-sections').className += " off-screen";
    
      // Append the necessary tags
      easterEgg.blackBackground = easterEgg.createBlackBackground()
      document.body.appendChild(easterEgg.blackBackground);
      
      // Animate!
      easterEgg.animateMessage();
    }
  }
  
  return easterEgg;
}