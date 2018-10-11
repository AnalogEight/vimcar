/**
 * @desc This component contains all functionality for the Alerts, displayed on screen
 * @public Alert.new()
 * @author Kaj Dillen
 * @required none
 */

var Alert = (function(my) {
  const activeAlerts = {}; //current visible/active alerts
  let uid = 0; //starting id of the alerts

  my.init = function() {};

  /**
   * @param  new - this will create a new alert
   */

  /**
   * @desc public function to create a new alert
   * @param {position,sticky,type,message} which are all the setting for the alert
   * @return none
   */
  my.new = function(position, sticky, type, message) {
    ++uid; //increase the id by 1
    alert = document.createElement('div'); //set up the alert html
    alert.className = 'alert--' + type + ' drop-shadow'; //add correct classes
    alert.setAttribute('data-uid', uid); //set id on element to use later
    alert.innerHTML = `<i class="icon-alert-${type}"></i>
                    <div class="alert-content">
                      <p class="text-break">${message}</p>
                    </div>
                    <a href="#" class="js-close-alert close-alert"></a>`;

    const documentBody = document.getElementsByTagName("body")[0]; //get the Html body element. There is only 1 so [0]
    if (!document.querySelector('.js-alert-container-' + position)) { //if the "js-alert-container-" doesn't exist yet, create it
      const AlertContainerContent = document.createElement("div");
      AlertContainerContent.className = 'container js-alert-container-' + position + ' alert-container-' + position;
      documentBody.insertBefore(AlertContainerContent, documentBody.firstChild); //add container to the body
    }

    activeAlerts[uid] = true; //make the current alert active
    const alertContainer = document.querySelector('.js-alert-container-' + position); //fetch the right alert container
    alertContainer.insertBefore(alert, alertContainer.firstChild); //insert the generated HTML into the right container

    setTimeout(function() {
      _animationFadeIn(alert); //wait 100ms to add animation to element
    }, 100);

    alert.querySelector('.js-close-alert').addEventListener('click', function() { //eventlistener for 'js-close-alert' button
      const parentContainer = this.parentElement;
      setTimeout(function() {
        _animationFadeOut(parentContainer); //fade out the parent element, in this case the alert
      }, 100);
    }, false);

    if (!sticky)
      setTimeout(_animationFadeOut, 10000, alert); //fade out alert if not sticky
  };

  /**
   * @desc function to animate the alert (in)
   * @param alert: alert to fade in
   * @return none
   */
  function _animationFadeIn(alert) {
    alert.className += " alert-show"; //use css animation trough "alert-show" class
  }

  /**
   * @desc function to animate the alert (out) and then remove
   * @param alert: alert to fade out
   * @return none
   */
  function _animationFadeOut(alert) {
    const alertuid = alert.dataset.uid; //get alert id
    delete activeAlerts[alertuid]; //delete from active alerts

    alert.classList.remove("alert-show"); //remove the css and animate out
    setTimeout(function() {
      alert.remove(); //wait 500ms and then delete alert
    }, 500);
  }

  return my;
}(Alert || {}));
