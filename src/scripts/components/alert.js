/**
 * This is Alert.
 */

var Alert = (function(my) {
  const activeAlerts = {};
  let uid = 0;

  my.init = function() {};

  /**
   * @param {position,sticky,type,message} new - this will create a new alert
   */
  my.new = function(position, sticky, type, message) {
    ++uid;
    alert = document.createElement('div');
    alert.className = 'alert--' + type + ' drop-shadow';
    alert.setAttribute('data-uid', uid);
    alert.innerHTML = `<i class="icon-alert-${type}"></i>
                    <div class="alert-content">
                      <p class="text-break">${message}</p>
                    </div>
                    <a href="#" class="js-close-alert close-alert">close</a>`;

    const alertContainer = document.querySelector('.js-alert-container-' + position),
      documentBody = document.getElementsByTagName("body")[0];
    if (!alertContainer) {
      const AlertContainerContent = document.createElement("div");
      AlertContainerContent.className = 'container js-alert-container-' + position + ' alert-container-' + position;
      documentBody.insertBefore(AlertContainerContent, documentBody.firstChild);
    }
    if (!activeAlerts[uid]) {
      activeAlerts[uid] = true;
      const alertContainerAlerts = document.querySelector('.js-alert-container-' + position);
      alertContainerAlerts.insertBefore(alert, alertContainerAlerts.firstChild);

      setTimeout(function() {
        _animationFadeIn(alert);
      }, 100);
      alert.querySelector('.js-close-alert').addEventListener('click', function() {
        const parentContainer = this.parentElement;
        setTimeout(function() {
          _animationFadeOut(parentContainer);
        }, 100);
      }, false);
      if (!sticky)
        setTimeout(_animationFadeOut, 10000, alert);
    }
  };

  function _animationFadeIn(element) {
    element.className += " alert-show";
  }

  function _animationFadeOut(element) {
    const elementuid = element.dataset.uid;
    delete activeAlerts[elementuid];

    element.classList.remove("alert-show");
    setTimeout(function() {
      element.remove();
    }, 500);
  }

  return my;
}(Alert || {}));
