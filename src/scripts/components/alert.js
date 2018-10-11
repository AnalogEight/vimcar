/**
 * This is Alert.
 */

var Alert = (function(my) {
  const activeAlerts = {};

  my.init = function() {};

  /**
   * @param {position,sticky,type,message} new - this will create a new alert
   */
  my.new = function(position, sticky, type, message) {
    const uid = message.replace(/[^a-zA-Z0-9]/g, '').substring(0, 50),
      alert = document.createElement('div');
    alert.className = 'alert--' + type + ' drop-shadow cf';
    alert.setAttribute('data-uid', uid);
    alert.innerHTML = `<i class="icon-alert-${type}"></i>
                    <div class="alert-content">
                      <p class="text-break">${message}</p>
                    </div>
                    <a href="#" class="js-close-alert close-alert"></a>`;

    const alertContainer = document.querySelector('.js-alert-container-' + position),
      documentBody = document.getElementsByTagName("body")[0];
    if (!alertContainer) {

      const AlertContainerContent = document.createElement("div");
      AlertContainerContent.className = 'container js-alert-container-' + position + ' alert-container-' + position;
      // AlertContainerContent.innerHTML = `<div class=""></div>`;
      documentBody.insertBefore(AlertContainerContent, documentBody.firstChild);
    }
    if (!activeAlerts[uid]) {
      activeAlerts[uid] = true;
      const alertContainerAlerts = document.querySelector('.js-alert-container-' + position);
      alertContainerAlerts.insertBefore(alert, alertContainerAlerts.firstChild);
      //
      _animationFadeIn(alert);
      //   alertSelector.find('.js-close-alert').on('click', function(e) {
      //     e.preventDefault();
      //     _animationFadeOut($(this).parent());
      //   });
      //
      //   if (!sticky)
      //     setTimeout(_animationFadeOut, 10000, alertSelector);
    }
  };

  function _animationFadeIn(element) {
    // el.css({
    //   'opacity': '0',
    //   'top': '-30px'
    // }).animate({
    //   opacity: 1,
    //   top: 0
    // }, 500);
  }

  function _animationFadeOut(el) {
    const uid = el.data('uid');
    delete activeAlerts[uid];

    el.stop().animate({
      opacity: 0,
      top: '-30px'
    }, 500, function() {
      el.stop().animate({
        height: 0,
        padding: 0,
        margin: 0
      }, 350, function() {
        el.remove();
      });
    });
  }

  return my;
}(Alert || {}));
